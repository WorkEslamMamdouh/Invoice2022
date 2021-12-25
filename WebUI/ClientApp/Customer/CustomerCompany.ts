
$(document).ready(() => {
    CustomerCompany.InitalizeComponent();
    
})

namespace CustomerCompany {

    var sys: SystemTools = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession: SystemSession = GetSystemSession(Modules.Quotation);

    var Model: Customer = new Customer();
    var MasterDetailsModel: SlsInvoiceMasterDetails = new SlsInvoiceMasterDetails();
     
    var compcode: number;//SharedSession.CurrentEnvironment.CompCode;
    var BranchCode: number;//SharedSession.CurrentEnvironment.CompCode;
   
    var btnsave: HTMLButtonElement;
    var txtNameComp: HTMLInputElement;
    var txtmailComp: HTMLInputElement;
    var txtAddressComp: HTMLInputElement;
    var chkvat: HTMLInputElement;
    var txtRemark: HTMLInputElement;
     
  
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);

    export function InitalizeComponent() {
        
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        InitalizeControls();
        InitalizeEvents();
        $('#a').click();
    }  
    function InitalizeControls() {
        // ;     
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;    
        // inputs
        txtmailComp = document.getElementById("txtmailComp") as HTMLInputElement;
        txtAddressComp = document.getElementById("txtAddressComp") as HTMLInputElement;
        chkvat = document.getElementById("chkvat") as HTMLInputElement;
        txtNameComp = document.getElementById("txtNameComp") as HTMLInputElement;        
        txtRemark = document.getElementById("txtRemark") as HTMLInputElement;
    }      
    function InitalizeEvents() {       
      btnsave.onclick = insert;
    }
      
    function Assign() { 
        Model = new Customer();     
        Model.CompCode = Number(compcode);
        Model.BranchCode = Number(BranchCode);
        Model.CustomerId = 0;
        Model.NAMEA = txtNameComp.value;
        Model.NAMEE = txtNameComp.value;
        Model.EMAIL = txtmailComp.value;
        Model.Address_Street = txtAddressComp.value;
        Model.Isactive = chkvat.checked;
        Model.REMARKS = txtRemark.value;
        Model.CREATED_AT = GetTime();
        Model.CREATED_BY = sys.SysSession.CurrentEnvironment.UserCode;   
    }
    function insert() {
        if (!validation()) return;
        Assign();        
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SlsTrSales", "InsertCustomer"),
            data: {   
                NAMEA: Model.NAMEA, NAMEE: Model.NAMEE, EMAIL: Model.EMAIL, Address_Street: Model.Address_Street,
                Isactive: Model.Isactive, REMARKS: Model.REMARKS, CREATED_BY: Model.CREATED_BY, CREATED_AT: Model.CREATED_AT
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
        if (txtNameComp.value.trim() == "") {
            Errorinput(txtNameComp);
            DisplayMassage('Company Name must be entered', 'Company Name must be entered', MessageType.Error);
            return false;
        }
        if (txtmailComp.value.trim() == "") {
            Errorinput(txtmailComp);
            DisplayMassage('Company Name must be entered', 'Company Name must be entered', MessageType.Error);
            return false;
        }
        if (txtAddressComp.value.trim() == "") {
            Errorinput(txtAddressComp);
            DisplayMassage('Address must be entered', 'Address must be entered', MessageType.Error);
            return false;
        }
         
        return true;
    }
    function success_insert() {
        txtNameComp.value = "";
        txtmailComp.value ="";  
        txtAddressComp.value = "";     
        txtRemark.value = "";
        chkvat.checked = false;
        
    }      
}












