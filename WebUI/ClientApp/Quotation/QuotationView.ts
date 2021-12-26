﻿
$(document).ready(() => {
    QuotationView.InitalizeComponent();
})

namespace QuotationView {

    var sys: SystemTools = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession: SystemSession = GetSystemSession(Modules.Quotation);

    var InvoiceDisplay: Array<Sls_Ivoice> = new Array<Sls_Ivoice>();
    var Invoice: Array<Sls_Ivoice> = new Array<Sls_Ivoice>();
    var InvQuotation: Array<Sls_Ivoice> = new Array<Sls_Ivoice>();

    var ReportGrid: JsGrid = new JsGrid();
    var ReportGridInv: JsGrid = new JsGrid();

    var compcode: number;//SharedSession.CurrentEnvironment.CompCode;
    var BranchCode: number;//SharedSession.CurrentEnvironment.CompCode;

    export function InitalizeComponent() {


        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitalizeEvents();
        InitializeGridQuotation();
        InitializeGridInvoice();
        Display();

    }
    function InitalizeControls() {


    }
    function InitalizeEvents() {


    }
    function Display() {
        debugger
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SlsTrSales", "GetAllSlsInvoice"),
            data: { CompCode: compcode, BranchCode: BranchCode },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    InvoiceDisplay = result.Response as Array<Sls_Ivoice>;
                    InvQuotation = InvoiceDisplay.filter(x => x.TrType == 0);
                    Invoice = InvoiceDisplay.filter(x => x.TrType == 1);
                    ReportGrid.DataSource = InvQuotation;
                    ReportGrid.Bind();

                    ReportGridInv.DataSource = Invoice;
                    ReportGridInv.Bind();
                    
                }
            }
        });


    }
    function InitializeGridQuotation() {


        //let res: any = GetResourceList("");
        //$("#id_ReportGrid").attr("style", "");
        //ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "InvoiceID";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 8;
        ReportGrid.Sorting = true;
        ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = false;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.SwitchingLanguageEnabled = false;
        ReportGrid.OnItemEditing = () => { };
        ReportGrid.Columns = [
            { title: "الرقم", name: "InvoiceID", type: "text", width: "5%", visible: false },
            { title: "TrNo", name: "TrNo", type: "text", width: "5%" },
            { title: "RFQ", name: "RefNO", type: "text", width: "8%" },
            { title: "Date", name: "TrDate", type: "text", width: "7%" },
            { title: "TotalAmount", name: "NetAfterVat", type: "text", width: "10%" },
            {
                width: "5%",
                itemTemplate: (s: string, item: Sls_Ivoice): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Print");
                    txt.id = "butPrint" + item.InvoiceID;
                    txt.className = "btn btn-custon-four btn-danger";
                    txt.onclick = (e) => {
                        PrintQuotation(item.InvoiceID);
                    };
                    return txt;
                }
            },
            {
                width: "5%",
                itemTemplate: (s: string, item: Sls_Ivoice): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("comfirm");
                    txt.id = "butComfirm" + item.InvoiceID;
                    txt.className = "btn btn-custon-four btn-success";
                     
                    txt.onclick = (e) => {
                        ComfirmQuotation(item.InvoiceID);


                    };
                    return txt;
                }
            },

            {
                width: "5%",
                itemTemplate: (s: string, item: Sls_Ivoice): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Eidt");
                    txt.id = "butEidt" + item.InvoiceID;
                    txt.className = "dis src-btn btn btn-warning input-sm";

                    txt.onclick = (e) => {
                        EidtQuotation(item.InvoiceID); 
                    };
                    return txt;
                }
            },
 

            {
                width: "5%",
                itemTemplate: (s: string, item: Sls_Ivoice): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("DelivNote");
                    txt.id = "butDelivNote" + item.InvoiceID;
                    txt.className = "btn btn-custon-four btn-primary";

                    txt.onclick = (e) => {
                        DelivNoteQuotation(item.InvoiceID);
                    };
                    return txt;
                }
            },

         


        ];
        ReportGrid.Bind();
    }
    function InitializeGridInvoice() {


        //let res: any = GetResourceList("");
        //$("#id_ReportGrid").attr("style", "");
        //ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGridInv.ElementName = "ReportGridInv";
        ReportGridInv.PrimaryKey = "InvoiceID";
        ReportGridInv.Paging = true;
        ReportGridInv.PageSize = 8;
        ReportGridInv.Sorting = true;
        ReportGridInv.InsertionMode = JsGridInsertionMode.Binding;
        ReportGridInv.Editing = false;
        ReportGridInv.Inserting = false;
        ReportGridInv.SelectedIndex = 1;
        ReportGridInv.SwitchingLanguageEnabled = false;
        ReportGridInv.OnItemEditing = () => { };
        ReportGridInv.Columns = [
            { title: "الرقم", name: "InvoiceID", type: "text", width: "5%", visible: false },
            { title: "TrNo", name: "TrNo", type: "text", width: "5%" },
            { title: "RFQ", name: "RefNO", type: "text", width: "8%" },
            { title: "Date", name: "TrDate", type: "text", width: "7%" },
            { title: "TotalAmount", name: "NetAfterVat", type: "text", width: "10%" },
            {
                width: "5%",
                itemTemplate: (s: string, item: Sls_Ivoice): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Print");
                    txt.id = "butPrint" + item.InvoiceID;
                    txt.className = "dis src-btn btn btn-warning input-sm";

                    txt.onclick = (e) => {
                        PrintInvoice(item.InvoiceID);
                    };
                    return txt;
                }
            },




        ];
        ReportGridInv.Bind();
    }
     
    function ComfirmQuotation(btnId: number)
    {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SlsTrSales", "UpdateInvoice"),
            data: { InvoiceID: btnId},
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                     
                    Display();
                    $('#viewmail').removeClass('active in');
                    $('#sendmail').addClass('active in');

                    $('#btnQuotations').removeClass('active');
                    $('#btnInvoice').addClass('active');

                } else {
                    DisplayMassage("Please refresh the page and try again", "Please refresh the page and try again", MessageType.Error);

                }
            }
        });

    }
    function EidtQuotation(btnId: number)
    {
        //alert(btnId);
        $('#viewmail').removeClass('active in');
        $('#sendmail').removeClass('active in');
        $('#composemail').addClass('active in');

        $('#btnQuotations').removeClass('active');
        $('#btnInvoice').removeClass('active');
        InitalizeComponentInvoice();

    } 
    function DelivNoteQuotation(btnId: number)
    {
        alert(btnId);
    }
    function PrintQuotation(btnId: number) {
        alert(btnId);
    }

    function PrintInvoice(btnId: number) {
        alert(btnId);
    }


    /*@* ---------------------------------------Eidt Invoice------------------------------------------*@*/

    var InvoiceItemsDetailsModel: Array<Sls_InvoiceDetail> = new Array<Sls_InvoiceDetail>();
    var invoiceItemSingleModel: Sls_InvoiceDetail = new Sls_InvoiceDetail();
    var InvoiceModel: Sls_Ivoice = new Sls_Ivoice();
    var MasterDetailsModel: SlsInvoiceMasterDetails = new SlsInvoiceMasterDetails();
    var CustomerDetail: Array<Customer> = new Array<Customer>();

    var CountGrid = 0;
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
    var txtAllDiscount: HTMLInputElement;
    var txtNetAfterVat: HTMLInputElement;
    var include = "";

    export function InitalizeComponentInvoice() {


        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControlsInvoice();
        InitalizeEventsInvoice();
       
    }
    function InitalizeControlsInvoice() {
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
    function InitalizeEventsInvoice() {

        btnAddDetails.onclick = AddNewRow;//
        btnCustSrch.onclick = btnCustSrch_onClick;
        btnsave.onclick = btnsave_onclick;
        btnClean.onclick = success_insert;
        txtAllDiscount.onkeyup = computeTotal; 
    }
    function btnCustSrch_onClick() {
        sys.FindKey(Modules.Quotation, "btnCustSrch", "", () => {

            CustomerDetail = SearchGrid.SearchDataGrid.SelectedKey;
            console.log(CustomerDetail);
            CustomerId = Number(CustomerDetail[0]);
            alert(String(CustomerDetail[2]));
            txtCompanyname.value = String(CustomerDetail[2]);
            include = String(CustomerDetail[3]);
            if (include == "true") {
                txtsalesVAT.value = "include";
            } else {
                txtsalesVAT.value = "not include";
            }
            computeTotal();
        });
    }
    function BuildControls(cnt: number) {
        var html;

        html = '<tr id= "No_Row' + cnt + '" class="  animated zoomIn ">' +

            '<td><button id="btn_minus' + cnt + '" type="button" class="btn btn-custon-four btn-danger"><i class="fa fa-minus-circle"></i></button></td>' +
            '<td><input  id="serial' + cnt + '" disabled="disabled"  type="text" class="form-control" placeholder="SR"></td>' +
            '<td><input  id="QTY' + cnt + '" type="number" class="form-control" placeholder="QTY"></td>' +
            '<td><input  id="Description' + cnt + '" type="text" class="form-control" placeholder="Description"></td>' +
            '<td><input  id="UnitPrice' + cnt + '" value="0" type="number" class="form-control" placeholder="Unit Price"></td>' +
            '<td><input  id="Totalprice' + cnt + '" value="0" type="number" disabled="disabled" class="form-control" placeholder="Total price"></td>' +
            '<td><input  id="DiscountPrc' + cnt + '" value="0" type="number" class="form-control" placeholder="DiscountPrc%"></td>' +
            '<td><input  id="DiscountAmount' + cnt + '" value="0" type="number" class="form-control" placeholder="DiscountAmount"></td>' +
            '<td><input  id="Net' + cnt + '" type="number" disabled="disabled" value="0" class="form-control" placeholder="Net"></td>' +
            '<td><input  id="txt_StatusFlag' + cnt + '" type="hidden" class="form-control"></td>' +
            '</tr>';
        $("#Table_Data").append(html);
        $("#UnitPrice" + cnt).on('keyup', function (e) {
            computeRows(cnt);
        });
        $("#QTY" + cnt).on('keyup', function (e) {
            computeRows(cnt);
        });
        $("#DiscountPrc" + cnt).on('keyup', function (e) {
            if (Number($("#DiscountPrc" + cnt).val()) < 0 || $("#DiscountPrc" + cnt).val().trim() == "") {
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
    function computeRows(cnt: number) {

        $("#Totalprice" + cnt).val(Number($("#UnitPrice" + cnt).val()) * (Number($("#QTY" + cnt).val())));
        $("#DiscountAmount" + cnt).val(Number($("#DiscountPrc" + cnt).val()) * Number($("#Totalprice" + cnt).val()) / 100);
        $("#Net" + cnt).val(Number($("#Totalprice" + cnt).val()) - (Number($("#DiscountAmount" + cnt).val())));
        computeTotal();
    }
    function computeTotal() {
        let NetCount = 0;
        for (let i = 0; i < CountGrid; i++) {
            if ($("#txt_StatusFlag" + i).val() != 'm' && $("#txt_StatusFlag" + i).val() != 'd') {
                NetCount += Number($("#Net" + i).val());
                NetCount = Number(NetCount.toFixed(2).toString());
            }
        }
        if (include == "true") {
            NetCount = NetCount + ((NetCount * 14) / 100);
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
            Insert_Serial();
        }

    }
    function validationgrid(rowcount: number) {

        if ($("#QTY" + rowcount).val().trim() == "" || Number($("#QTY" + rowcount).val()) <= 0) {
            Errorinput($("#QTY" + rowcount));
            DisplayMassage('Item quantity must be entered', 'Item quantity must be entered', MessageType.Error);
            return false;
        }
        if ($("#Description" + rowcount).val().trim() == "") {
            Errorinput($("#Description" + rowcount));
            DisplayMassage('Item Describtion must be entered', 'Item Describtion must be entered', MessageType.Error);
            return false;
        }
        if ($("#UnitPrice" + rowcount).val().trim() == "" || Number($("#UnitPrice" + rowcount).val()) <= 0) {
            Errorinput($("#UnitPrice" + rowcount));
            DisplayMassage('Item Price must be entered', 'Item Price must be entered', MessageType.Error);
            return false;
        }

        return true;
    }
    function DeleteRow(RecNo: number) {

        WorningMessage("Do you want to delete?", "Do you want to delete?", "warning", "warning", () => {
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
            computeRows(RecNo);
            computeTotal();
            $("#serial" + RecNo).val("99");
            $("#QTY" + RecNo).val("99");
            $("#Description" + RecNo).val("99");
            $("#UnitPrice" + RecNo).val("99");
            $("#Totalprice" + RecNo).val("199");
            $("#DiscountPrc" + RecNo).val("199");
            $("#DiscountAmount" + RecNo).val("199");
            $("#No_Row" + RecNo).attr("hidden", "true");

            Insert_Serial();

        });
    }
    function Insert_Serial() {

        let Ser = 1;
        for (let i = 0; i < CountGrid; i++) {
            if ($("#txt_StatusFlag" + i).val() != 'm' && $("#txt_StatusFlag" + i).val() != 'd') {
                $("#serial" + i).val(Ser);
                Ser++;
            }

        }

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
        InvoiceModel.SalesmanId = 1;
        InvoiceModel.ChargeReason = txtCompanysales.value;
        InvoiceModel.Remark = txtRemark.value;
        InvoiceModel.TotalAmount = Number(txtNetBefore.value);
        InvoiceModel.RoundingAmount = Number(txtAllDiscount.value);
        InvoiceModel.NetAfterVat = Number(txtNetAfterVat.value);
        //-------------------------(T E R M S & C O N D I T I O N S)-----------------------------------------------     
        InvoiceModel.ContractNo = txtsalesVAT.value;       //----------------- include sales VAT.
        InvoiceModel.PurchaseorderNo = txtfirstdays.value;      //----------------- days starting from the delivery date.
        InvoiceModel.ChargeVatPrc = Number(txtsecounddays.value);    //----------------- days from offer date.
        InvoiceModel.ChargeAfterVat = Number(txtlastdays.value);       //----------------- days from purchase order.
        InvoiceModel.PrevInvoiceHash = txtPlacedeliv.value;//----------------- Place of delivery.

        // Details
        for (var i = 0; i < CountGrid; i++) {
            let StatusFlag = $("#txt_StatusFlag" + i).val();
            if (StatusFlag == "i") {
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
        }
        MasterDetailsModel.Sls_Ivoice = InvoiceModel;
        MasterDetailsModel.Sls_InvoiceDetail = InvoiceItemsDetailsModel;
    }
    function insert() {
        if (!validation()) return;


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
                    DisplayMassage("An invoice number has been issued " + res.TrNo + "", "An invoice number has been issued " + res.TrNo + "", MessageType.Succeed);

                    success_insert();


                } else {
                    DisplayMassage("Please refresh the page and try again", "Please refresh the page and try again", MessageType.Error);

                }
            }
        });

    }
    function success_insert() { 
        $('#viewmail').addClass('active in');
        $('#sendmail').removeClass('active in');
        $('#composemail').removeClass('active in');
         
        $('#btnQuotations').addClass('active');
        $('#btnInvoice').removeClass('active');
    }
    function validation() {

        if (txtDate.value.trim() == "") {
            Errorinput(txtDate);
            DisplayMassage('Date must be entered', 'Date must be entered', MessageType.Error);
            return false;
        }
        if (txtCompanyname.value.trim() == "") {
            Errorinput(txtCompanyname);
            DisplayMassage('Company must be choosed', 'Company must be choosed', MessageType.Error);
            return false;
        }
        if (txtCompanysales.value.trim() == "") {
            Errorinput(txtCompanysales);
            DisplayMassage('Company sales man must be choosed', 'Company sales man must be choosed', MessageType.Error);
            return false;
        }
        if (txtRFQ.value.trim() == "") {
            Errorinput(txtRFQ);
            DisplayMassage(' RFQ must be entered', ' RFQ must be entered', MessageType.Error);
            return false;
        }
        if (txtsalesVAT.value.trim() == "") {
            Errorinput(txtsalesVAT);
            DisplayMassage('Vat include or not must be entered', ' Vat include or not must be entered', MessageType.Error);
            return false;
        }
        if (txtfirstdays.value.trim() == "") {
            Errorinput(txtfirstdays);
            DisplayMassage('days starting from the delivery date must be entered', 'days starting from the delivery date must be entered', MessageType.Error);
            return false;
        }
        if (txtsecounddays.value.trim() == "") {
            Errorinput(txtsecounddays);
            DisplayMassage('Offer validity days from offer date must be entered', ' Offer validity days from offer date must be entered', MessageType.Error);
            return false;
        }
        if (txtlastdays.value.trim() == "") {
            Errorinput(txtlastdays);
            DisplayMassage('Place of delivery must be entered', ' Place of delivery must be entered', MessageType.Error);
            return false;
        }
        return true;
    }
    function btnsave_onclick() {
        insert();
    }

    //----------------------------------------------------------------------------------------------------





}












