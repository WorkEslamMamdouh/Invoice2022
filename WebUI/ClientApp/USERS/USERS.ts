﻿
$(document).ready(() => {
    USERS.InitalizeComponent();
})

namespace USERS {

    var sys: SystemTools = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession: SystemSession = GetSystemSession(Modules.Quotation);

    var InvoiceItemsDetailsModel: Array<Sls_InvoiceDetail> = new Array<Sls_InvoiceDetail>();
    var invoiceItemSingleModel: Sls_InvoiceDetail = new Sls_InvoiceDetail();
    var InvoiceModel: Sls_Ivoice = new Sls_Ivoice();
    var MasterDetailsModel: SlsInvoiceMasterDetails = new SlsInvoiceMasterDetails();

    var CountGrid = 0;
    var compcode: number;//SharedSession.CurrentEnvironment.CompCode;
    var BranchCode: number;//SharedSession.CurrentEnvironment.CompCode;
    var btnAddDetails: HTMLButtonElement;   
    var btnsave: HTMLButtonElement;
    var btnClean: HTMLButtonElement;
    var CustomerId: number = 0;
    var btnCustSrch: HTMLButtonElement;
    var invoiceID: number = 0;
    var txtDate: HTMLInputElement;
    var txtRFQ: HTMLInputElement;
    var txtCompanysales: HTMLInputElement;
    var txtCompanyname: HTMLInputElement;
    var txtQutationNo: HTMLInputElement;
    var txtsalesVAT: HTMLInputElement;
    var txtfirstdays: HTMLInputElement;
    var txtsecounddays: HTMLInputElement;
    var txtlastdays: HTMLInputElement;
    var txtPlacedeliv: HTMLInputElement;   
    var txtRemark: HTMLInputElement;
    var txtNetBefore: HTMLInputElement;
    var txtAllDiscount:HTMLInputElement;
    var txtNetAfterVat:HTMLInputElement;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);

    export function InitalizeComponent() {

      
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitalizeEvents();
        AddNewRow();

        txtDate.value = GetDate();
    }  
    function InitalizeControls() {
        // ;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnCustSrch = document.getElementById("btnCustSrch") as HTMLButtonElement;
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        btnClean = document.getElementById("btnClean") as HTMLButtonElement;         
        // inputs
        txtDate = document.getElementById("txtDate") as HTMLInputElement;
        txtRFQ = document.getElementById("txtRFQ") as HTMLInputElement;
        txtCompanysales = document.getElementById("txtCompanysales") as HTMLInputElement;
        txtCompanyname = document.getElementById("txtCompanyname") as HTMLInputElement;
        txtQutationNo = document.getElementById("txtQutationNo") as HTMLInputElement;
        txtsalesVAT = document.getElementById("txtsalesVAT") as HTMLInputElement;
        txtfirstdays = document.getElementById("txtfirstdays") as HTMLInputElement;
        txtsecounddays = document.getElementById("txtsecounddays") as HTMLInputElement;
        txtlastdays = document.getElementById("txtlastdays") as HTMLInputElement;
        txtPlacedeliv = document.getElementById("txtPlacedeliv") as HTMLInputElement;      
        txtRemark = document.getElementById("txtRemark") as HTMLInputElement;
        txtNetBefore = document.getElementById("txtNetBefore") as HTMLInputElement;
        txtAllDiscount = document.getElementById("txtAllDiscount") as HTMLInputElement;
        txtNetAfterVat = document.getElementById("txtNetAfterVat") as HTMLInputElement;
    }      
    function InitalizeEvents() {
      
        btnAddDetails.onclick = AddNewRow;//
        btnCustSrch.onclick = btnCustSrch_onClick;
        btnsave.onclick = insert;
        btnClean.onclick = success_insert;
        txtAllDiscount.onkeyup = computeTotal;
    }
    function btnCustSrch_onClick() {
        sys.FindKey(Modules.Quotation, "btnCustSrch", "", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            CustomerId = id;
            //ddCustomer_onchange();
        });
    }


    function BuildControls(cnt: number) {
        var html;

        html = '<tr id= "No_Row' + cnt + '" class="  animated zoomIn ">' +
           
            '<td><button id="btn_minus' + cnt + '" type="button" class="btn btn-custon-four btn-danger"><i class="fa fa-minus-circle"></i></button></td>' +
            '<td><input  id="serial' + cnt +'" disabled="disabled" value="'+(cnt+1)+'" type="text" class="form-control" placeholder="SR"></td>' +
            '<td><input  id="QTY' + cnt +'" type="number" class="form-control" placeholder="QTY"></td>' +
            '<td><input  id="Description' + cnt +'" type="text" class="form-control" placeholder="Description"></td>' +
            '<td><input  id="UnitPrice' + cnt +'" value="0" type="number" class="form-control" placeholder="Unit Price"></td>' +
            '<td><input  id="Totalprice' + cnt +'" value="0" type="number" disabled="disabled" class="form-control" placeholder="Total price"></td>' +
            '<td><input  id="DiscountPrc' + cnt +'" value="0" type="number" class="form-control" placeholder="DiscountPrc%"></td>' +
            '<td><input  id="DiscountAmount' + cnt +'" value="0" type="number" class="form-control" placeholder="DiscountAmount"></td>' +
            '<td><input  id="Net' + cnt +'" type="number" disabled="disabled" value="0" class="form-control" placeholder="Net"></td>' +
            '</tr>';
        $("#Table_Data").append(html);
        $("#UnitPrice" + cnt).on('keyup', function (e) {
            computeRows(cnt);
        });
        $("#QTY" + cnt).on('keyup', function (e) {
            computeRows(cnt);
        });
        $("#DiscountPrc" + cnt).on('keyup', function (e) {         
            if (Number($("#DiscountPrc" + cnt).val()) < 0 || $("#DiscountPrc" + cnt).val().trim() == "" ) {
                $("#DiscountPrc" + cnt).val("0");
            }
            if (Number($("#DiscountPrc" + cnt).val()) > 100) {
                $("#DiscountPrc" + cnt).val("100");
            }
            computeRows(cnt);
             
        });
        $("#btn_minus" + cnt).click(function (e) {
            DeleteRow(cnt); 
        });

        return;
    }
    function computeRows(cnt:number) {

        $("#Totalprice" + cnt).val(Number($("#UnitPrice" + cnt).val()) * (Number($("#QTY" + cnt).val())));
        $("#DiscountAmount" + cnt).val(Number($("#DiscountPrc" + cnt).val()) * Number($("#Totalprice" + cnt).val()) / 100);
        $("#Net" + cnt).val(Number($("#Totalprice" + cnt).val()) - (Number($("#DiscountAmount" + cnt).val())));
        computeTotal();
    }
    function computeTotal() {  
   
        let NetCount = 0;        
        for (let i = 0; i < CountGrid; i++) {    
          
            NetCount += Number($("#Net" + i).val());
            NetCount = Number(NetCount.toFixed(2).toString());

        }
        txtNetBefore.value = NetCount.toString();


        let Net = (Number(txtNetBefore.value) - Number(txtAllDiscount.value)).toFixed(2);
        txtNetAfterVat.value = Net.toString();
    }

    function AddNewRow() {
        $('paginationSwitch').addClass("display_none");
        $('.no-records-found').addClass("display_none");
     
        let CanAdd: boolean = true;
            if (CountGrid > 0) {
                for (var i = 0; i < CountGrid; i++) {
                    CanAdd = validationgrid(i);
                    if (CanAdd == false) {
                        break;
                    }
                }
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode 
            CountGrid++;

        }

    }
    function validationgrid(rowcount: number) {
         
        if ($("#QTY" + rowcount).val().trim() == "" || Number($("#QTY" + rowcount).val()) <= 0) {
            Errorinput($("#QTY" + rowcount));
            DisplayMassage('يجب ادخال كمية الصنف', 'Item quantity must be entered', MessageType.Error);
            return false;
        }
        if ($("#Description" + rowcount).val().trim() == "") {
            Errorinput($("#Description" + rowcount));
            DisplayMassage('يجب ادخال وصف الصنف', 'Item Describtion must be entered', MessageType.Error);
            return false;
        }
        if ($("#UnitPrice" + rowcount).val().trim() == "" || Number($("#UnitPrice" + rowcount).val()) <= 0) {
            Errorinput($("#UnitPrice" + rowcount));
            DisplayMassage('يجب ادخال سعر الصنف', 'Item Price must be entered', MessageType.Error);
            return false;     
        }
        
        return true;    
    }
    function DeleteRow(RecNo: number) {
        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
            
            $("#ddlFamily" + RecNo).val("99");
            $("#ddlItem" + RecNo).val("99");
            $("#txtQuantity" + RecNo).val("99");
            $("#txtPrice" + RecNo).val("199");
            $("#txtUnitpriceWithVat" + RecNo).val("199");
            $("#No_Row" + RecNo).attr("hidden", "true");
        });
    }       
    function Assign() {
        //var StatusFlag: String;
        InvoiceModel = new Sls_Ivoice();
        InvoiceItemsDetailsModel = new Array<Sls_InvoiceDetail>();


        InvoiceModel.CustomerId = CustomerId == 0 ? null : CustomerId;
        InvoiceModel.Status = 1;
        InvoiceModel.CompCode = Number(compcode);
        InvoiceModel.BranchCode = Number(BranchCode);
        var InvoiceNumber = Number(txtQutationNo.value);
        InvoiceModel.TrNo = InvoiceNumber;
        InvoiceModel.CreatedAt = sys.SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.CreatedBy = sys.SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.TrType = 0//0 invoice 1 return     
        InvoiceModel.InvoiceID = 0;
        InvoiceModel.TrDate = txtDate.value;
        InvoiceModel.RefNO = txtRFQ.value;
        InvoiceModel.SalesmanId = Number(txtCompanysales.value);                
        InvoiceModel.Remark = txtRemark.value; 
        InvoiceModel.TotalAmount = Number(txtNetBefore.value);
        InvoiceModel.RoundingAmount = Number(txtAllDiscount.value);
        InvoiceModel.NetAfterVat = Number(txtNetAfterVat.value);
        //-------------------------(T E R M S & C O N D I T I O N S)-----------------------------------------------     
        InvoiceModel.ContractNo = txtsalesVAT.value;       //----------------- include sales VAT.
        InvoiceModel.ContractNo = txtfirstdays.value;      //----------------- days starting from the delivery date.
        InvoiceModel.ContractNo = txtsecounddays.value;    //----------------- days from offer date.
        InvoiceModel.ContractNo = txtlastdays.value;       //----------------- days from purchase order.
        InvoiceModel.PrevInvoiceHash = txtPlacedeliv.value;//----------------- Place of delivery.

        // Details
        for (var i = 0; i < CountGrid; i++) {

            invoiceItemSingleModel = new Sls_InvoiceDetail();

            invoiceItemSingleModel.InvoiceItemID = 0;            
            invoiceItemSingleModel.Serial = Number($("#serial" + i).val());
            invoiceItemSingleModel.SoldQty = Number($('#QTY' + i).val());
            invoiceItemSingleModel.Itemdesc = $("#Description" + i).val();
            invoiceItemSingleModel.NetUnitPrice = Number($("#UnitPrice" + i).val());
            invoiceItemSingleModel.ItemTotal = Number($("#Totalprice" + i).val());
            invoiceItemSingleModel.DiscountAmount = Number($("#Discount" + i).val());
            invoiceItemSingleModel.NetAfterVat = Number($("#Net" + i).val()); 
                InvoiceItemsDetailsModel.push(invoiceItemSingleModel);

            }
            
        MasterDetailsModel.Sls_Ivoice = InvoiceModel;
        MasterDetailsModel.Sls_InvoiceDetail = InvoiceItemsDetailsModel;   
    }
    function insert() {
        Assign();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("SlsTrSales", "InsertInvoiceMasterDetail"),
            data: JSON.stringify(MasterDetailsModel),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {

                  let res = result.Response as Sls_Ivoice;
                     invoiceID = res.InvoiceID;
                    DisplayMassage(" تم اصدار  فاتورة رقم  " + res.TrNo + " ", "An invoice number has been issued " + res.TrNo + "", MessageType.Succeed);

                     success_insert();

                 
                } else {       
                    DisplayMassage("الرجاء تحديث الصفحة واعادت تكرارالمحاولة مره اخري", "Please refresh the page and try again", MessageType.Error);

                }
            }
        });

    }
    function success_insert() {
        txtDate.value = GetDate();
        CountGrid = 0;   
        CustomerId = 0;
        invoiceID  = 0;     
        txtRFQ.value = "";
        txtCompanysales.value = "";
        txtCompanyname.value = "";
        txtQutationNo.value = "";
        txtsalesVAT.value = "";
        txtfirstdays.value = "";
        txtsecounddays.value = "";
        txtlastdays.value = "";
        txtPlacedeliv.value = "";
        txtRemark.value = "";
        txtNetBefore.value = "";
        txtAllDiscount.value = "";
        txtNetAfterVat.value = "";
        $("#Table_Data").html("");
        AddNewRow();
    }      
}












