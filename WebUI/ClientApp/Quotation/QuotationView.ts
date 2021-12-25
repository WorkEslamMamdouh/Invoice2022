
$(document).ready(() => {
    QuotationView.InitalizeComponent();
})

namespace QuotationView {

    var sys: SystemTools = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession: SystemSession = GetSystemSession(Modules.Quotation);

    var InvoiceModel: Array<Sls_Ivoice> = new Array<Sls_Ivoice>(); 

    var ReportGrid: JsGrid = new JsGrid();
    var compcode;
    var BranchCode;

    export function InitalizeComponent() {

      
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitalizeEvents();
      
        Display();

    }  
    function InitalizeControls() {
       
      
    }      
    function InitalizeEvents() {
      
      
    }
    function InitializeGrid() {


        //let res: any = GetResourceList("");
        //$("#id_ReportGrid").attr("style", "");
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
        ReportGrid.OnItemEditing = () => { };
        ReportGrid.Columns = [
            { title: "الرقم", name: "InvoiceID", type: "text", width: "100px", visible: false },
            { title: "الرقم", name: "TrNo", type: "text", width: "100px" },
            { title: "التاريخ", name: "TrDate", type: "text", width: "100px" },
            { title: "الاجمالي", name: "NetAfterVat", type: "text", width: "100px" },  
        ];
        //ReportGrid.Bind();
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
                    InvoiceModel = result.Response as Array<Sls_Ivoice>; 

                    InitializeGrid();
                    ReportGrid.DataSource = InvoiceModel;
                    ReportGrid.Bind();
                }
            }
        });


    }
}












