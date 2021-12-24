using Inv.API.Models;
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
        public IHttpActionResult GetAllSlsInvoice(int CompCode, int BranchCode)
        { 
            string query = "select * from Sls_Ivoice where TrType = 0 and CompCode = "+ CompCode + " and BranchCode = "+ BranchCode + "";
            
            var res = db.Database.SqlQuery<Sls_Ivoice>(query).ToList();
            return Ok(new BaseResponse(res));
        }


    }
}
