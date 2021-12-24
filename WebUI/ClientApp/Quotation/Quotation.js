$(document).ready(function () {
    Quotation.InitalizeComponent();
});
var Quotation;
(function (Quotation) {
    var sys = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession = GetSystemSession(Modules.Quotation);
    var InvoiceItemsDetailsModel = new Array();
    var invoiceItemSingleModel = new Sls_InvoiceDetail();
    var InvoiceModel = new Sls_Ivoice();
    var MasterDetailsModel = new SlsInvoiceMasterDetails();
    var CountGrid = 0;
    var compcode; //SharedSession.CurrentEnvironment.CompCode;
    var btnAddDetails;
    var btnsave;
    var CustomerId = 0;
    var btnCustSrch;
    var invoiceID = 0;
    var txtDate;
    var txtRFQ;
    var txtCompanysales;
    var txtCompanyname;
    var txtQutationNo;
    var txtsalesVAT;
    var txtfirstdays;
    var txtsecounddays;
    var txtlastdays;
    var txtPlacedeliv;
    var paginationSwitch;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    function InitalizeComponent() {
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        AddNewRow();
        txtDate.value = GetDate();
    }
    Quotation.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // ;
        btnAddDetails = document.getElementById("btnAddDetails");
        btnCustSrch = document.getElementById("btnCustSrch");
        btnsave = document.getElementById("btnsave");
        paginationSwitch = document.getElementsByName("paginationSwitch");
        // inputs
        txtDate = document.getElementById("txtDate");
        txtRFQ = document.getElementById("txtRFQ");
        txtCompanysales = document.getElementById("txtCompanysales");
        txtCompanyname = document.getElementById("txtCompanyname");
        txtQutationNo = document.getElementById("txtQutationNo");
        txtsalesVAT = document.getElementById("txtsalesVAT");
        txtfirstdays = document.getElementById("txtfirstdays");
        txtsecounddays = document.getElementById("txtsecounddays");
        txtlastdays = document.getElementById("txtlastdays");
        txtPlacedeliv = document.getElementById("txtPlacedeliv");
    }
    function InitalizeEvents() {
        btnAddDetails.onclick = AddNewRow; //
        btnCustSrch.onclick = btnCustSrch_onClick;
        btnsave.onclick = insert;
    }
    function btnCustSrch_onClick() {
        sys.FindKey(Modules.Quotation, "btnCustSrch", "", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            CustomerId = id;
            //ddCustomer_onchange();
        });
    }
    function BuildControls(cnt) {
        var html;
        html = '<tr id= "No_Row' + cnt + '" class="  animated zoomIn ">' +
            '<td><input  id="serial' + cnt + '" value="' + (cnt + 1) + '" type="text" class="form-control" placeholder="SR"></td>' +
            '<td><input  id="QTY' + cnt + '" type="number" class="form-control" placeholder="QTY"></td>' +
            '<td><input  id="Description' + cnt + '" type="text" class="form-control" placeholder="Description"></td>' +
            '<td><input  id="UnitPrice' + cnt + '" value="0" type="number" class="form-control" placeholder="Unit Price"></td>' +
            '<td><input  id="Totalprice' + cnt + '" value="0" type="number" disabled="disabled" class="form-control" placeholder="Total price"></td>' +
            '<td><input  id="DiscountPrc' + cnt + '" value="0" type="number" class="form-control" placeholder="DiscountPrc%"></td>' +
            '<td><input  id="DiscountAmount' + cnt + '" value="0" type="number" class="form-control" placeholder="DiscountAmount"></td>' +
            '<td><input  id="Net' + cnt + '" type="number" disabled="disabled" value="0" class="form-control" placeholder="Net"></td>' +
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
    function computeRows(cnt) {
        $("#Totalprice" + cnt).val(Number($("#UnitPrice" + cnt).val()) * (Number($("#QTY" + cnt).val())));
        $("#DiscountAmount" + cnt).val(Number($("#DiscountPrc" + cnt).val()) * Number($("#Totalprice" + cnt).val()) / 100);
        $("#Net" + cnt).val(Number($("#Totalprice" + cnt).val()) - (Number($("#DiscountAmount" + cnt).val())));
    }
    function AddNewRow() {
        $('paginationSwitch').addClass("display_none");
        $('.no-records-found').addClass("display_none");
        if (CountGrid != 0) {
            if (!validationgrid()) {
                return;
            }
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode 
            CountGrid++;
        }
        else {
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode 
            CountGrid++;
        }
    }
    function validationgrid() {
        if ($("#QTY" + CountGrid).val().trim() == "" || Number($("#QTY" + CountGrid).val()) <= 0) {
            Errorinput($("#QTY" + CountGrid));
            DisplayMassage('يجب ادخال كمية الصنف', 'Item quantity must be entered', MessageType.Error);
            return false;
        }
        if ($("#UnitPrice" + CountGrid).val().trim() == "" || Number($("#UnitPrice" + CountGrid).val()) <= 0) {
            Errorinput($("#UnitPrice" + CountGrid));
            DisplayMassage('يجب ادخال سعر الصنف', 'Item Price must be entered', MessageType.Error);
            return false;
        }
        return true;
    }
    function DeleteRow(RecNo) {
        if (!SysSession.CurrentPrivileges.Remove)
            return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
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
        InvoiceItemsDetailsModel = new Array();
        InvoiceModel.CustomerId = CustomerId == 0 ? null : CustomerId;
        InvoiceModel.CompCode = Number(compcode);
        var InvoiceNumber = Number(txtQutationNo.value);
        InvoiceModel.TrNo = InvoiceNumber;
        InvoiceModel.CreatedAt = sys.SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.CreatedBy = sys.SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.TrType = 0; //0 invoice 1 return     
        InvoiceModel.InvoiceID = 0;
        InvoiceModel.TrDate = txtDate.value;
        InvoiceModel.RefNO = txtRFQ.value;
        InvoiceModel.SalesmanId = Number(txtCompanysales.value);
        //-------------------------(T E R M S & C O N D I T I O N S)-----------------------------------------------     
        InvoiceModel.ContractNo = txtsalesVAT.value; //----------------- include sales VAT.
        InvoiceModel.ContractNo = txtfirstdays.value; //----------------- days starting from the delivery date.
        InvoiceModel.ContractNo = txtsecounddays.value; //----------------- days from offer date.
        InvoiceModel.ContractNo = txtlastdays.value; //----------------- days from purchase order.
        InvoiceModel.PrevInvoiceHash = txtPlacedeliv.value; //----------------- Place of delivery.
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
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    var res = result.Response;
                    invoiceID = res.InvoiceID;
                    DisplayMassage(" تم اصدار  فاتورة رقم  " + res.TrNo + " ", "An invoice number has been issued ", MessageType.Succeed);
                    success_insert();
                }
                else {
                    DisplayMassage("الرجاء تحديث الصفحة واعادت تكرارالمحاولة مره اخري", "Please refresh the page and try again", MessageType.Error);
                }
            }
        });
    }
    function success_insert() {
        txtDate.value = GetDate();
        CountGrid = 0;
        CustomerId = 0;
        invoiceID = 0;
        txtRFQ.value = "";
        txtCompanysales.value = "";
        txtCompanyname.value = "";
        txtQutationNo.value = "";
        txtsalesVAT.value = "";
        txtfirstdays.value = "";
        txtsecounddays.value = "";
        txtlastdays.value = "";
        txtPlacedeliv.value = "";
    }
})(Quotation || (Quotation = {}));
//# sourceMappingURL=Quotation.js.map