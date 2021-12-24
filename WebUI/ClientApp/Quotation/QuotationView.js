$(document).ready(function () {
    QuotationView.InitalizeComponent();
});
var QuotationView;
(function (QuotationView) {
    var sys = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession = GetSystemSession(Modules.Quotation);
    var InvoiceModel = new Array();
    var ReportGrid = new JsGrid();
    var compcode;
    var BranchCode;
    function InitalizeComponent() {
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitalizeEvents();
        Display();
    }
    QuotationView.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitalizeEvents() {
    }
    function InitializeGrid() {
        var res = GetResourceList("");
        $("#id_ReportGrid").attr("style", "");
        //ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "InvoiceID";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 10;
        ReportGrid.Sorting = true;
        ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = false;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.SwitchingLanguageEnabled = false;
        ReportGrid.OnItemEditing = function () { };
        ReportGrid.Columns = [
            { title: "الرقم", name: "InvoiceID", type: "text", width: "100px", visible: false },
            { title: "الاسم", name: "InvoiceID", type: "text", width: "100px" },
            //{ title: "رقم الجوال", name: "phone", type: "text", width: "100px" },
            //{ title: "النوع", name: "Type_Supplier", type: "text", width: "100px" },
            //{ title: "ملاحظات", name: "Notes", type: "text", width: "100px" },
            //{ title: "مفعل", name: "IS_Active_Name", type: "textdd", width: "100px" },
        ];
        ReportGrid.Bind();
    }
    function Display() {
        debugger;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SlsTrSales", "GetAllSlsInvoice"),
            data: { CompCode: compcode, BranchCode: BranchCode },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    InvoiceModel = result.Response;
                    InitializeGrid();
                    ReportGrid.DataSource = InvoiceModel;
                    ReportGrid.Bind();
                }
            }
        });
    }
})(QuotationView || (QuotationView = {}));
//# sourceMappingURL=QuotationView.js.map