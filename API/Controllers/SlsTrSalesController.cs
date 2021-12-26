﻿using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.ISlsTRInvoice;
using Inv.BLL.Services.SlsInvoiceItems;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;
using System.Data.SqlClient;
using Inv.API.Models.CustomModel;

namespace Inv.API.Controllers
{
    public class SlsTrSalesController : BaseController
    {
        private readonly ISlsInvoiceItemsService SlsInvoiceItemsService;
        private readonly IISlsTRInvoiceService SlsTrSalesService;
        private readonly G_USERSController UserControl;

        public SlsTrSalesController(IISlsTRInvoiceService _ISlsTrSalesService, G_USERSController _Control, ISlsInvoiceItemsService _ISlsInvoiceItemsService)
        {
            this.SlsTrSalesService = _ISlsTrSalesService;
            this.SlsInvoiceItemsService = _ISlsInvoiceItemsService;
            this.UserControl = _Control;
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertInvoiceMasterDetail([FromBody] SlsInvoiceMasterDetails obj)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    // doha 4-7-2021 GUID and QR Code
                    string st = SystemToolsController.GenerateGuid();
                    obj.Sls_Ivoice.DocUUID = st;

                    var tm = DateTime.Now.ToString("HH:mm:ss");
                    obj.Sls_Ivoice.TrTime = TimeSpan.Parse(tm);

                    //var compObj = db.G_COMPANY.Where(s => s.COMP_CODE == obj.Sls_Ivoice.CompCode).FirstOrDefault();
                    //var branchObj = db.G_BRANCH.Where(s => s.BRA_CODE == obj.Sls_Ivoice.BranchCode).FirstOrDefault();
                    //var QrCode= SystemToolsController.GenerateQRCode(compObj.NameA, branchObj.GroupVatNo, obj.Sls_Ivoice.TrDate.ToString(), obj.Sls_Ivoice.NetAfterVat.ToString(), obj.Sls_Ivoice.VatAmount.ToString());
                    //obj.Sls_Ivoice.QRCode = QrCode;
                    //var x=QrCode.Length;
                    ////////////

                    var Sls_TR_Invoice = SlsTrSalesService.Insert(obj.Sls_Ivoice);

                    for (int i = 0; i < obj.Sls_InvoiceDetail.Count; i++)
                    {
                        obj.Sls_InvoiceDetail[i].InvoiceID = Sls_TR_Invoice.InvoiceID;
                    }
                    SlsInvoiceItemsService.InsertLst(obj.Sls_InvoiceDetail);
                    // call process trans 

                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(obj.Sls_Ivoice.CompCode), Convert.ToInt32(obj.Sls_Ivoice.BranchCode), Sls_TR_Invoice.InvoiceID, "Quotation", "Add", db);
                    if (res.ResponseState == true)
                    {
                        obj.Sls_Ivoice.TrNo = int.Parse(res.ResponseData.ToString());
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(obj.Sls_Ivoice));
                    }
                    else
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                    }
                    ////////
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }

        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult updateInvoiceMasterDetail([FromBody] SlsInvoiceMasterDetails updatedObj)
        {
            
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        string st = SystemToolsController.GenerateGuid();
                        updatedObj.Sls_Ivoice.DocUUID = st;

                        var tm = DateTime.Now.ToString("HH:mm:ss");
                        updatedObj.Sls_Ivoice.TrTime = TimeSpan.Parse(tm);

                        //update Master
                        var Sls_TR_Invoice = SlsTrSalesService.Update(updatedObj.Sls_Ivoice);

                        //update Details
                        var insertedInvoiceItems = updatedObj.Sls_InvoiceDetail.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedInvoiceItems = updatedObj.Sls_InvoiceDetail.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedInvoiceItems = updatedObj.Sls_InvoiceDetail.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  
                        foreach (var item in insertedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.Sls_Ivoice.InvoiceID;
                            var InsertedRec = SlsInvoiceItemsService.Insert(item);
                        }

                        //loop Update  
                        foreach (var item in updatedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.Sls_Ivoice.InvoiceID;
                            var updatedRec = SlsInvoiceItemsService.Update(item);
                        }

                        //loop Delete  
                        foreach (var item in deletedInvoiceItems)
                        {
                            int deletedId = item.InvoiceItemID;
                            SlsInvoiceItemsService.Delete(deletedId);
                        }
                        // call process trans 

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(updatedObj.Sls_Ivoice.CompCode), Convert.ToInt32(updatedObj.Sls_Ivoice.BranchCode), Sls_TR_Invoice.InvoiceID, "Quotation", "Update", db);
                        if (res.ResponseState == true)
                        {
                            updatedObj.Sls_Ivoice.TrNo = int.Parse(res.ResponseData.ToString());
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(updatedObj.Sls_Ivoice));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            
        }




        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllSlsInvoice(int CompCode, int BranchCode)
        { 
            string query = "select * from Sls_Ivoice where   CompCode = "+ CompCode + " and BranchCode = "+ BranchCode + "";
            
            var res = db.Database.SqlQuery<Sls_Ivoice>(query).ToList();
            return Ok(new BaseResponse(res));
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult  UpdateInvoice(int InvoiceID)
        {
            string query = "update [dbo].[Sls_Ivoice] set TrType = 1 where InvoiceID = "+ InvoiceID + "";

            var res = db.Database.ExecuteSqlCommand(query);
            return Ok(new BaseResponse(100));
        }



        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCustomer( int id)
        { 
            string query = "select * from Customer where  CustomerId = "+id+"";
            
            var res = db.Database.SqlQuery<Customer>(query).ToList();
            return Ok(new BaseResponse(res));
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllCustomer()
        { 
            string query = "select * from Customer ";
            
            var res = db.Database.SqlQuery<Customer>(query).ToList();
            return Ok(new BaseResponse(res));
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult InsertCustomer(string NAMEA, string NAMEE, string EMAIL, string Address_Street, Boolean Isactive, string REMARKS, string CREATED_BY, string CREATED_AT)
        { int active = 0;  
            if (Isactive == true)
            {
                active = 1;
            }

            string query = "INSERT INTO [dbo].[Customer] (NAMEA,NAMEE,EMAIL,REMARKS,Isactive,Address_Street) VALUES  ('"+NAMEA+"','"+NAMEE + "','"+EMAIL + "','"+REMARKS + "',"+ active + ",'"+Address_Street + "')";
            
           db.Database.ExecuteSqlCommand(query);
            return Ok(new BaseResponse(100));
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult UpdateCustomer(string NAMEA, string NAMEE, string EMAIL, string Address_Street, Boolean Isactive, string REMARKS, string CREATED_BY, string CREATED_AT,int CustomerId)
        { int active = 0;  
            if (Isactive == true)
            {
                active = 1;
            }

            string query = "update [dbo].[Customer] set  NAMEA ='" + NAMEA + "' ,NAMEE = '" + NAMEE + "',EMAIL = '" + EMAIL + "',REMARKS = '" + REMARKS + "',Isactive = " + active + ",Address_Street= '" + Address_Street + "' where CustomerId = "+ CustomerId + "";
            
           db.Database.ExecuteSqlCommand(query);
            return Ok(new BaseResponse(100));
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetSlsInvoiceItem(int invoiceID)
        {
           
                var res = db.Sls_InvoiceDetail.Where(x => x.InvoiceID == invoiceID).ToList();
                return Ok(new BaseResponse(res)); 
        }


    }
}
