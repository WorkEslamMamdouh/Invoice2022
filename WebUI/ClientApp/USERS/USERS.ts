
$(document).ready(() => {
    USERS.InitalizeComponent();
})

namespace USERS {

    var sys: SystemTools = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession: SystemSession = GetSystemSession(Modules.Quotation);

    var Model: Customer = new Customer();
    var CustomerModel: Array<Customer> = new Array<Customer>();
    var CustomerModelfil: Array<Customer> = new Array<Customer>();
    var ReportGrid: JsGrid = new JsGrid();
    var compcode: number;//SharedSession.CurrentEnvironment.CompCode;
    var BranchCode: number;//SharedSession.CurrentEnvironment.CompCode;
                                    
    var USER_NAME: HTMLInputElement;
    var Tel: HTMLInputElement;
    var USER_CODE: HTMLInputElement;
    var USER_PASSWORD: HTMLInputElement;
    var Create: HTMLButtonElement;
    var IsNew = false;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);

    export function InitalizeComponent() {

        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitalizeEvents();
        clear();
    }
    function InitalizeControls() {
     
        USER_NAME = document.getElementById("USER_NAME") as HTMLInputElement;
        Tel = document.getElementById("Tel") as HTMLInputElement;
        USER_CODE = document.getElementById("USER_CODE") as HTMLInputElement;
        USER_PASSWORD = document.getElementById("USER_PASSWORD") as HTMLInputElement;    
        Create = document.getElementById("Create") as HTMLButtonElement;
    }
    function InitalizeEvents() {
        Create.onclick =Create_onclick;
    }

    function Create_onclick() {
        insert();
    }
    function Assign() {
        Model = new Customer();
        Model.CompCode = Number(compcode);
        Model.BranchCode = Number(BranchCode);
        Model.CustomerId = 0;
        //Model.NAMEA = txtNameComp.value;
        //Model.NAMEE = txtNameComp.value;
        //Model.EMAIL = txtmailComp.value;
        //Model.Address_Street = txtAddressComp.value;
        //Model.Isactive = chkvat.checked;
        //Model.REMARKS = txtRemark.value;
        //Model.CREATED_AT = GetTime();
        //Model.CREATED_BY = sys.SysSession.CurrentEnvironment.UserCode;
    }
    function insert() {
        debugger
        let CreatedAt = GetDate() ;   
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SlsTrSales", "Insert_User"),
            data: {
                USER_CODE: USER_CODE.value, USER_PASSWORD: USER_PASSWORD.value, USER_NAME: USER_NAME.value, Tel: Tel.value, CompCode: compcode, CREATED_BY: sys.SysSession.CurrentEnvironment.UserCode, CREATED_AT: CreatedAt
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    DisplayMassage("Saved successfully", "Saved successfully", MessageType.Error);
                    success_insert();
                } else {
                    DisplayMassage("Please refresh the page and try again", "Please refresh the page and try again", MessageType.Error);

                }
            }
        });

    }
    function update() {
        Assign();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SlsTrSales", "UpdateCustomer"),
            data: {
                
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    DisplayMassage("Saved successfully", "Saved successfully", MessageType.Error);
                    success_insert();
                } else {
                    DisplayMassage("Please refresh the page and try again", "Please refresh the page and try again", MessageType.Error);

                }
            }
        });

    }
    function validation() {
        //if (txtNameComp.value.trim() == "") {
        //    Errorinput(txtNameComp);
        //    DisplayMassage('Company Name must be entered', 'Company Name must be entered', MessageType.Error);
        //    return false;
        //}
        //if (txtmailComp.value.trim() == "") {
        //    Errorinput(txtmailComp);
        //    DisplayMassage('Company Name must be entered', 'Company Name must be entered', MessageType.Error);
        //    return false;
        //}
        //if (txtAddressComp.value.trim() == "") {
        //    Errorinput(txtAddressComp);
        //    DisplayMassage('Address must be entered', 'Address must be entered', MessageType.Error);
        //    return false;
        //}

        return true;
    }
    function success_insert() {
        clear()
        IsNew = true
        $('#btnsave').html('Create')
        Display();
        $('#b').click();
    }      
    function btnsave_onclick() {
        if (!validation()) return;

        if (IsNew == true) {
            insert();
        } else {
            update();
        }


    }        
    function InitializeGrid() {


        //let res: any = GetResourceList("");
        //$("#id_ReportGrid").attr("style", "");
        ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "CustomerId";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 15;
        ReportGrid.Sorting = true;
        ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = false;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.SwitchingLanguageEnabled = false;
        ReportGrid.OnItemEditing = () => { };
        ReportGrid.Columns = [

            { title: "ID", name: "CustomerId", type: "text", width: "5%" },
            { title: "Company Name", name: "NAMEE", type: "text", width: "30%" },
            { title: "EMAIL", name: "EMAIL", type: "text", width: "20%" },
            { title: "Address", name: "Address_Street", type: "text", width: "25%" },
            { title: "REMARK", name: "REMARKS", type: "text", width: "20%" },
        ];
        //ReportGrid.Bind();
    }            
    function Display() {

        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SlsTrSales", "GetAllCustomer"),
            data: {},
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CustomerModel = result.Response as Array<Customer>;

                    InitializeGrid();
                    ReportGrid.DataSource = CustomerModel;
                    ReportGrid.Bind();
                }
            }
        });


    }
    function DriverDoubleClick() {

        IsNew = false;
        CustomerModelfil = CustomerModel.filter(x => x.CustomerId == Number(ReportGrid.SelectedKey))
        //UCustomerId = Number(ReportGrid.SelectedKey);
        //txtNameComp.value = CustomerModelfil[0].NAMEE;
        //txtmailComp.value = CustomerModelfil[0].EMAIL;
        //txtAddressComp.value = CustomerModelfil[0].Address_Street;
        //txtRemark.value = CustomerModelfil[0].REMARKS;
        //chkvat.checked = CustomerModelfil[0].Isactive;
        //$('#a').click();
        //$('#btnsave').html('Update');
    }

    function clear() {
        debugger
        USER_NAME.value = "";
        Tel.value = "";
        USER_CODE.value = "";
        USER_PASSWORD.value = "";
    }
}    
