
$(document).ready(() => {
    Quotation.InitalizeComponent();
})

namespace Quotation {

    var AccountType: Number = 1;
    var MSG_ID: number;
    var Details: Array<A_RecPay_D_Group> = new Array<A_RecPay_D_Group>();
    //var Details: Array<I_D_Category> = new Array<I_D_Category>();
    var btnNew_sub_Add_service: HTMLButtonElement;
    var btnsave: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var btnEdit: HTMLButtonElement;
    var sys: SystemTools = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession: SystemSession = GetSystemSession(Modules.Quotation);
    var Model: A_RecPay_D_Group = new A_RecPay_D_Group();

    var CountGrid = 0;
    var compcode: Number;//SharedSession.CurrentEnvironment.CompCode;
    var btnback: HTMLButtonElement;

    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);



    export function InitalizeComponent() {

      
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents(); 
    }
     
    function InitalizeControls() {
        // ;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        //btnEdit = document.getElementById("btnedite") as HTMLButtonElement;
        //btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        //btnback = document.getElementById("btnback") as HTMLButtonElement;

        // Buton privialges for single record page



    }

    function InitalizeEvents() {
        // ;
        btnAddDetails.onclick = AddNewRow;//
        //btnsave.onclick = btnsave_onClick;
        //btnback.onclick = btnback_onclick;
    }


    function BuildControls(cnt: number) {
        var html;


        html = '<tr id= "No_Row' + cnt + '" class="  animated zoomIn ">' +
            '<td>1</td>' +
            '<td>1</td>' +
            '<td>adjasdhasjdh</td>' +
            '<td>6600</td>' +
            '<td>900</td>' +
            '<td>3445</td>' +
            '</tr>';
        $("#Table_Data").append(html);



        

        $("#btn_minus" + cnt).click(function (e) {
            DeleteRow(cnt); 
        });

        return;
    }
    function AddNewRow() {
        
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode 
            CountGrid++;
    
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
        var StatusFlag: String;
        for (var i = 0; i < CountGrid; i++) {
            Model = new A_RecPay_D_Group();

            StatusFlag = $("#txt_StatusFlag" + i).val();
            $("#txt_StatusFlag" + i).val("");
             ;


            if (StatusFlag == "i") {
                Model.StatusFlag = StatusFlag.toString();
               
                Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
                Model.AccountType = Number(AccountType);
                Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;
                //Model.UpdatedBy = "";

                Model.GroupID = 0;
                Model.GroupCode = $("#txtCode" + i).val();
                if ($("#txtDescA" + i).val() == "") {
                    Model.Group_DescA = $("#txtDescL" + i).val();
                    $("#txtDescA" + i).val($("#txtDescL" + i).val());
                }
                else {
                    Model.Group_DescA = $("#txtDescA" + i).val();
                }
                if ($("#txtDescL" + i).val() == "") {
                    Model.Group_DescE = $("#txtDescA" + i).val();
                    $("#txtDescL" + i).val($("#txtDescA" + i).val());
                }
                else {
                    Model.Group_DescE = $("#txtDescL" + i).val();
                }
               
               
                Details.push(Model);




                //Model.CompCode = Number(compcode);
            }
            if (StatusFlag == "u") {


                var UpdatedDetail = Details.filter(x => x.GroupID == $("#txt_ID" + i).val())
                UpdatedDetail[0].UpdatedBy = SysSession.CurrentEnvironment.UserCode;
                UpdatedDetail[0].StatusFlag = StatusFlag.toString();
                UpdatedDetail[0].GroupCode = $("#txtCode" + i).val();
            
                if ($("#txtDescA" + i).val() == "") {
                    UpdatedDetail[0].Group_DescA = $("#txtDescL" + i).val();
                    $("#txtDescA" + i).val($("#txtDescL" + i).val());
                }
                else {
                    UpdatedDetail[0].Group_DescA = $("#txtDescA" + i).val();
                }
                if ($("#txtDescL" + i).val() == "") {
                    UpdatedDetail[0].Group_DescE = $("#txtDescA" + i).val();
                    $("#txtDescL" + i).val($("#txtDescA" + i).val());
                }
                else {
                    UpdatedDetail[0].Group_DescE = $("#txtDescL" + i).val();
                }
            }
            if (StatusFlag == "d") {

                if ($("#txt_ID" + i).val() != "")
                {
                var UpdatedDetail = Details.filter(x => x.GroupID == $("#txt_ID" + i).val())
                UpdatedDetail[0].StatusFlag = StatusFlag.toString();
                }

            }


        }
    }  
    function btnsave_onClick() {
   
        //var CanAdd: boolean = true;
        //if (CountGrid > 0) {
        //    for (var i = 0; i < CountGrid; i++) {
        //        debugger
        //        CanAdd = Validation_Grid(i);
        //        if (CanAdd == false) {
        //            break;
        //        }
        //    }
        //}
        //if (CanAdd) { 
        //    Update();
        //}
    }
    function btnback_onclick() {
        //$('#btnAddDetails').toggleClass("display_none");
        //$('#btnsave').toggleClass("display_none");
        //$('#btnback').toggleClass("display_none");
        //$("#div_Data :input").attr("disabled", "true");
        //$(".minus_btn").addClass("display_none");
        //$("#btnedite").removeClass("display_none");
        //$("#btnedite").removeAttr("disabled");

        //CountGrid = 0;
        //$("#div_Data").html("");
        //Display();


    }

 

}












