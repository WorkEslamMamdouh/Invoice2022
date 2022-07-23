﻿/// <reference path="entities.ts" />




//----------------------------------------------------------------ESGrid--------------------------------------


//class I_D_UOM {
//    constructor() {
//        this.UomID = 0;
//        this.UomCode = "";
//        this.DescA = "";
//        this.DescE = "";
//        this.CompCode = 0;
//        this.Remarks = "";
//        this.CreatedAt = "";
//        this.CreatedBy = "";
//        this.UpdatedAt = "";
//        this.UpdatedBy = "";
//        this.StatusFlag = "";
//    }
//    public UomID: number;
//    public UomCode: string;
//    public DescA: string;
//    public DescE: string;
//    public CompCode: number;
//    public Remarks: string;
//    public CreatedAt: string;
//    public CreatedBy: string;
//    public UpdatedAt: string;
//    public UpdatedBy: string;
//    public StatusFlag: string;
//}


class ESGrid {
    constructor() {
        this.ESG = new ESG();
        this.Column = new Array<Column>();
    }
    public ESG: ESG;
    public Column: Array<Column>;
}


class ESG {
    constructor() {
        this.NameTable = "";
        this.Save = false;
        this.Back = false;
        this.DeleteRow = false;
        this.Add = false;
        this.Edit = false;
        this.LastCounter = 0;
        this.Right = false;
        this.object ;


    }
    public NameTable: string;
    public Save: boolean;
    public Back: boolean;
    public DeleteRow: boolean;
    public Add: boolean;
    public Edit: boolean;
    public LastCounter: number;
    public Right: boolean;
    public object: any

}

class Column {
    constructor() {
        this.style = "";
        this.title = "";
        this.Name = "";
        this.value = "";
        this.Type = "";
        this.visible = false;
        this.Edit = false;
        this.ColumnType = new ControlEvents;

    }
    public style: string;
    public title: string;
    public Name: string;
    public value: string;
    public Type: string;
    public visible: boolean;
    public Edit: boolean;
    public ColumnType: ControlEvents;
}



class ControlEvents {
    constructor() {

        this.NameType = '';
        this.textField = '';
        this.onclick;
        this.onkeyup;
        this.onchange;
        this.dataSource;


    }

    public NameType: string;
    public textField: string;
    public onclick?: () => void;
    public onkeyup?: () => void;
    public onchange?: () => void;
    public dataSource: Array<any>
}




namespace ControlType {

    var ControlEvent: ControlEvents = new ControlEvents();

    export function Input(onchange?: () => void, onkeyup?: () => void, onclick?: () => void): ControlEvents {

        ControlEvent = new ControlEvents();

        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'Input';

        return ControlEvent;
    }


    export function checkbox(onchange?: () => void, onkeyup?: () => void, onclick?: () => void): ControlEvents {
        ControlEvent = new ControlEvents();

        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'checkbox';

        return ControlEvent;
    }


    export function Button(onchange?: () => void, onkeyup?: () => void, onclick?: () => void): ControlEvents {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'Button';

        return ControlEvent;
    }


    export function Dropdown(dataSourc: Array<any>, textField: string, onchange?: () => void, onkeyup?: () => void, onclick?: () => void): ControlEvents {
        debugger
        ControlEvent = new ControlEvents();

        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = dataSourc;
        ControlEvent.NameType = 'Dropdown';
        ControlEvent.textField = textField;

        return ControlEvent;
    }



}

var flagBack = false;



let classs = $('<style> .display_hidden {display:none !important; }  .Text_right {text-align: right; }  .Text_left {text-align: left; }  </style>')
$('head:first').append(classs);

function BindGridControl(Grid: ESGrid) {


    let NameTable = Grid.ESG.NameTable;
    let style_Text = '';

    if (Grid.ESG.Right == true) {
        $("#" + NameTable).attr('style', 'direction: rtl;');
        style_Text = 'Text_right';
    }
    else {
        $("#" + NameTable).attr('style', 'direction: ltr;');
        style_Text = 'Text_left';

    }


    $("#" + NameTable).html("");
    let table;  // بناء هيكل الجدوا
    table =
        '<div class="button-ap-list responsive-btn">' +
        '<button id="btnEdit_' + NameTable + '" type="button" class="btn btn-custon-four btn-success"><i class="fa fa-save"></i>&nbsp; Edit</button>' +
        '<button id="btnsave_' + NameTable + '" type="button" class="btn btn-custon-four btn-success"><i class="fa fa-save"></i>&nbsp; save</button>' +
        '<button id="btnClean_' + NameTable + '" type="button" class="btn btn-custon-four btn-danger" style="background-color: sandybrown;"><i class="fa fa-refresh"></i>  Back</button>' +
        '</div>' +
        '<br />' +

        '<div class="sparkline8-graph">' +
        '<div class="datatable-dashv1-list custom-datatable-overright">' +
        '<table id="table_' + NameTable + '" data-toggle="table" data-pagination="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="false" data-click-to-select="true" data-toolbar="#toolbar">' +
        '<thead id="thead_' + NameTable + '">' +
        '<tr id="tr_' + NameTable + '">' +
        '<th class="' + NameTable + '_Delete" data-field=""></th>' +

        '</tr>' +
        '</thead>' +
        '<tbody id="tbody_' + NameTable + '">' +

        '</tbody>' +
        '</table>' +
        '</div>' +
        '<br />' +
        '<div class="btn-group project-list-action">' +
        '<button id="btnAdd_' + NameTable + '" class="btn btn-custon-four btn-success oo"><i class="fa fa-plus"></i></button>' +
        '</div>' +
        '</div>'
    $("#" + NameTable).append(table);




    $('#btnAdd_' + NameTable).click(function (e) {
        BuildGridControl(true, Grid);
    });

    if (flagBack == false) {

        $('#btnClean_' + NameTable).click(function (e) {
            CleanGridControl(null, Grid);
        });
    }

    $('#btnsave_' + NameTable).click(function (e) {
        AssignGridControl(Grid);
    });

    $('#btnEdit_' + NameTable).click(function (e) {
        EditGridControl(Grid);
    });




    for (let i = 0; i < Grid.Column.length; i++) {



        //let classs = $('<style>' + NameTable + '_' + i + ' { ' + Grid.Column[i].style +' !important; }</style>')
        //$('html > head').append(classs);


        let visible = "";
        if (Grid.Column[i].visible == false) {
            visible = 'hidden';
            //Grid.Column[i].title = '0';
        }
        let thead; //بناء عناوين الجدول
        thead = '<th data-field="number" class=" ' + style_Text + '  ' + NameTable + '_' + i + '"   ' + visible + ' id="th_' + i + NameTable + '"  data-editable="false">' + Grid.Column[i].title + '</th>'
        $("#tr_" + NameTable).append(thead);


    }
    //------------------------------------------------------------تنظيم الجريد

    Resizable();
    //----------------------------------------------------------------------------------

    $('.' + NameTable + '_Delete').attr('style', 'width: 3% !important;');


    //---------------------------------------------------------------------------------اضافة هيكل body
    //let tbody = '<tr id= "No_Row_' + NameTable + '" class="  animated zoomIn ">' +

    //     '<td><button id="btn_minus_' + NameTable + '" type="button" class="btn btn-custon-four btn-danger"><i class="fa fa-minus-circle"></i></button></td>' +

    //     '</tr>';
    // $('#tbody_'+ NameTable+'').append(tbody); 



    for (let u = 0; u < Grid.Column.length; u++) {

        debugger
        //let td = '';

        //if (Grid.Column[u].ColumnType == 'Input') {
        //    td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + '" ><input  id="' + NameTable+'_' + Grid.Column[u].Name + '" value="' + Grid.Column[u].value + '" type="' + Grid.Column[u].Type + '" class="form-control" placeholder="' + Grid.Column[u].value + '" /></td>';
        //}
        //if (Grid.Column[u].ColumnType == '') {
        //    td = '<td><input  id="' + NameTable + '_' + Grid.Column[u].Name + '" value="' + Grid.Column[u].value + '" type="' + Grid.Column[u].Type + '" class="form-control" placeholder="' + Grid.Column[u].value + '"></td>';
        //}
        //if (Grid.Column[u].ColumnType == '') {
        //    td = '<td><input  id="' + NameTable + '_' + Grid.Column[u].Name + '" value="' + Grid.Column[u].value + '" type="' + Grid.Column[u].Type + '" class="form-control" placeholder="' + Grid.Column[u].value + '"></td>';
        //}
        //if (Grid.Column[u].ColumnType == '') {
        //    td = '<td><input  id="' + NameTable + '_' + Grid.Column[u].Name + '" value="' + Grid.Column[u].value + '" type="' + Grid.Column[u].Type + '" class="form-control" placeholder="' + Grid.Column[u].value + '"></td>';
        //}


        //document.getElementById('No_Row_' + NameTable + '').appendChild(td);

        //$('#No_Row_' + NameTable + '').append(td);

        //--------------------------------------------اضافة style -----------------------------------
        if (Grid.Column[u].style.trim() != '') {
            Grid.Column[u].style = 'width: 10%';
        };

        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
            //let Column_td = $('#td_' + NameTable + '_' + Grid.Column[u].Name);
            //Column_td.attr('style', '' + Grid.Column[u].style + '  !important;');
        };

        let title = $('.' + NameTable + '_' + u + '');
        title.attr('style', '' + Grid.Column[u].style + '  !important;');

        let _Delete = $('.' + NameTable + '_Delete');
        _Delete.attr('style', 'display:none !important;');

        $('#btnClean_' + NameTable).attr('style', 'display:none !important;');


        $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');


        $('#btnsave_' + NameTable).attr('style', 'display:none !important;');


        $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');


        if (Grid.ESG.DeleteRow == false) {
            let _Delete = $('.' + NameTable + '_Delete');
            _Delete.addClass('display_hidden');
        };
        if (Grid.ESG.Back == false) {
            $('#btnClean_' + NameTable).addClass('display_hidden');
        };
        if (Grid.ESG.Add == false) {
            $('#btnAdd_' + NameTable).addClass('display_hidden');

        };

        if (Grid.ESG.Edit == false) {
            $('#btnEdit_' + NameTable).addClass('display_hidden');

        }
        else {
            $('#btnEdit_' + NameTable).attr('style', '');

        }

        //------------------------------------------------------------------------------------------









    }



}

function DisplayDataGridControl(List: Array<any>, Grid: ESGrid) {
    debugger


    flagBack = true;

    BindGridControl(Grid);

    let NameTable = Grid.ESG.NameTable;
    $('#btnClean_' + NameTable).click(function (e) {
        CleanGridControl(List, Grid);
    });

    if (List != null) {

        for (let i = 0; i < List.length; i++) {
            BuildGridControl(false, Grid);
            DisplayData(List[i], Grid)
        }
    }

    flagBack = false;

}

function DisplayData(List: any, Grid: ESGrid) {
    debugger
    let NameTable = Grid.ESG.NameTable;
    let cnt = Grid.ESG.LastCounter - 1;

    let _Delete = $('.' + NameTable + '_Delete');
    _Delete.attr('style', 'display:none !important;');

    let btn_minus = $('#td_btn_minus_' + NameTable + cnt);
    btn_minus.attr('style', 'display:none !important;');

    for (let u = 0; u < Grid.Column.length; u++) {


        try {


            //const values = Object.keys(List).map(key => List[key]);

            //const commaJoinedValues = values.join('' + Grid.Column[u].Name + '');
            //alert(commaJoinedValues);

            //alert( Object["values"](List))

            //alert( Object["values"](List).map(x => x.substr(0, x.length - 4)))

            //let descriptor = Object.getOwnPropertyDescriptor(List, '' + Grid.Column[u].Name + '');

            //alert(descriptor);

            //alert( List.Grid.Column[u].Name)
            //alert(List.get('1'))


            //  var entries1: Array<any> = Object["values"](entries[u]);
            //  console.log(entries1);

            //  //alert(entries1.get('1'))

            //  //alert(entries1[0])
            //var x=  Object.defineProperty(entries[u], '' + Grid.Column[u].Name + '', { enumerable: false });

            // Display Properties 
            //alert(entries);
            //alert(Grid.Column[u].Name);
            //alert(x);
            //alert(Object.keys(x))


            //console.log(values);

            //alert(values[u])

            debugger
            //alert('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '');

            var values: Array<any> = Object["values"](List);

            if (Grid.Column[u].ColumnType.NameType == 'Input') {

                $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
            }

            if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
                $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
            }

            if (Grid.Column[u].ColumnType.NameType == 'Button') {
                $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
            }

            if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
                if (values[u] == 1 || values[u] == true) {

                    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', true)
                }
                else {

                    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', false)
                    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', true)
                }
            }

        } catch (e) {

        }


    }

}


function BuildGridControl(flagDisplay: boolean, Grid: ESGrid) {
    debugger
    let NameTable = Grid.ESG.NameTable;
    //const node = document.getElementById("tbody_" + NameTable).lastChild;
    //const clone = node.cloneNode(true);    
    //document.getElementById("tbody_" + NameTable).appendChild(clone);

    let cnt = Grid.ESG.LastCounter;

    if (Grid.ESG.LastCounter == 0) {
        $('#tbody_' + NameTable + '').html('');

    }
    let classDisplay = flagDisplay == false ? "" : "animated zoomIn"
    let tbody = '<tr id= "No_Row_' + NameTable + cnt + '" class="' + classDisplay + '">' +
        '<td id="td_btn_minus_' + NameTable + cnt + '" class="td_btn_minus_' + NameTable + '" ><button id="btn_minus_' + NameTable + cnt + '" type="button" class="btn btn-custon-four btn-danger"><i class="fa fa-minus-circle"></i></button></td>' +
        '<td id="td_StatusFlag_' + NameTable + '' + cnt + '" style="display:none !important;" ><input  disabled="disabled" id="StatusFlag_' + NameTable + '_' + cnt + '" value="" type="hidden" class="form-control " placeholder="flag" /></td>';
        '</tr>';
    $('#tbody_' + NameTable + '').append(tbody);



    if (Grid.ESG.DeleteRow == false) {
        let btn_minus = $('#td_btn_minus_' + NameTable + cnt);
        btn_minus.attr('style', 'display:none !important;');
    };



    $('#btn_minus_' + NameTable + cnt).click(function (e) {
        DeleteRow('No_Row_' + NameTable + cnt, cnt, NameTable);
    });


    for (let u = 0; u < Grid.Column.length; u++) {


        debugger
        let td = '';
        let classEdit = '';

        if (Grid.Column[u].Edit == true) {
            classEdit = 'Edit_' + NameTable;
        };



         


        if (Grid.Column[u].ColumnType.NameType == 'Input') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" ><input  disabled="disabled" id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" value="' + Grid.Column[u].value + '" type="' + Grid.Column[u].Type + '" class="form-control ' + classEdit + '" placeholder="' + Grid.Column[u].value + '" /></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }

        if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" ><select disabled="disabled"  id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" class="form-control ' + classEdit + '">  </select></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
            let ddlFilter: HTMLSelectElement = document.getElementById('' + NameTable + '_' + Grid.Column[u].Name + cnt + '') as HTMLSelectElement;
            DocumentActions.FillCombowithdefult(Grid.Column[u].ColumnType.dataSource, ddlFilter, Grid.Column[u].Name, Grid.Column[u].ColumnType.textField, "Select");
        }

        if (Grid.Column[u].ColumnType.NameType == 'Button') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" style="text-align: center;" ><button id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" type="' + Grid.Column[u].Type + '" class="btn btn-custon-four btn-success classEdit"> ' + Grid.Column[u].value + ' </button></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }

        if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" ><input  disabled="disabled" id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" value="' + Grid.Column[u].value + '" type="checkbox" class="form-control ' + classEdit + '" placeholder="' + Grid.Column[u].value + '" /></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }
        //document.getElementById('No_Row_' + NameTable + '').appendChild(td);








        debugger

        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').click(function () {
      
            if ($("#StatusFlag_" + NameTable+'_'+ cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");

            Grid.Column[u].ColumnType.onclick();
        });

        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').on('keyup', function (e) {
            if ($("#StatusFlag_" + NameTable+'_'+ cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");

            Grid.Column[u].ColumnType.onkeyup();
        });

        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').on('change', function (e) {
            if ($("#StatusFlag_" + NameTable+'_'+ cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");

            Grid.Column[u].ColumnType.onchange();
        });




        //--------------------------------------------اضافة style -----------------------------------

        if (Grid.ESG.LastCounter == 0) {
            if (Grid.Column[u].style.trim() != '') {
                Grid.Column[u].style = 'width: 10%';
            };

            if (Grid.Column[u].visible == false) {
                Grid.Column[u].style = ' display:none;';
                //let Column_td = $('#td_' + NameTable + '_' + Grid.Column[u].Name);
                //Column_td.attr('style', '' + Grid.Column[u].style + '  !important;');
            };

            let title = $('.' + NameTable + '_' + u + '');
            title.attr('style', '' + Grid.Column[u].style + '  !important;');

            let DeleteRow = $('.' + NameTable + '_Delete');
            DeleteRow.attr('style', 'width: 3% !important;');


        }



        if (Grid.ESG.DeleteRow == false) {
            let title = $('.' + NameTable + '_Delete');
            title.attr('style', 'display:none !important;');

        };




        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
            let Column_td = $('#td_' + NameTable + '_' + Grid.Column[u].Name + cnt);
            Column_td.attr('style', '' + Grid.Column[u].style + '  !important;');
        };




        //------------------------------------------------------------------------------------------



    }


    if ($('#btnsave_' + NameTable).attr('style').trim() == '') {

        $('.Edit_' + NameTable).removeAttr('disabled');

    };


    Grid.ESG.LastCounter++;




}

function DeleteRow(ID: string, cnt: number, NameTable: string) {

    WorningMessage("Do you want to delete?", "Do you want to delete?", "warning", "warning", () => {

        $("#" + ID + "").attr("hidden", "true");
        $("#StatusFlag_" + NameTable + '_' + cnt).val() == 'i' ? $("#StatusFlag_" + NameTable + '_' + cnt).val('m') : $("#StatusFlag_" + NameTable + '_' + cnt).val('d');

    });
}

function CleanGridControl(List: Array<any>, Grid: ESGrid) {
    debugger
    let NameTable = Grid.ESG.NameTable;
    //for (var i = 0; i < Grid.ESG.LastCounter; i++) {
    //    $("#No_Row_" + NameTable + i + "").attr("hidden", "true");
    //    //$("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
    //}
    $('#table_' + NameTable).html('');

    $('#btnEdit_' + NameTable).attr('style', '');
    $('#btnsave_' + NameTable).attr('style', 'display:none !important;');
    $('.' + NameTable + '_Delete').attr('style', 'display:none !important;');
    $('#btnClean_' + NameTable).attr('style', 'display:none !important;');
    $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');


    Grid.ESG.LastCounter = 0;

    DisplayDataGridControl(List, Grid)


    $('[data-toggle="table"]').bootstrapTable();
    //$('#tbody_' + NameTable + '').html('');
}

function AssignGridControl(Grid: ESGrid) {

    //GActions.AssignToModel(Model.A_Rec_D_Customer);//Insert Update
    debugger

    var model = Grid.ESG.object;
    let NameTable = Grid.ESG.NameTable; 
    let LastCountGrid = Grid.ESG.LastCounter;

     
    var DetailsModel = new Array <any>();
    var SinglModel = new Array <any>();

    SinglModel.push(model);

    

    alert(SinglModel)

    var Model = SinglModel;
    alert(Model);
     
    for (var i = 0; i < LastCountGrid; i++) {
        debugger
        let cnt = i;
        let StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();

         

        if (StatusFlag == "i") {
             
             
            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag)
             
            DetailsModel.push(Model);

        }

        if (StatusFlag == "u") {


            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag)

            DetailsModel.push(Model);
        }

        if (StatusFlag == "d") {

             
            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag)

            DetailsModel.push(Model);
        }
    }
   


    console.log(DetailsModel);
    alert(DetailsModel);
    return DetailsModel;
     

   /* CleanGridControl(null, Grid);*/

}
 
function EditGridControl(Grid: ESGrid) {

    debugger
    let NameTable = Grid.ESG.NameTable;

    $('.Edit_' + NameTable).removeAttr('disabled');

    $('#btnsave_' + NameTable).attr('style', '');




    if (Grid.ESG.DeleteRow == true) {
        let btn_minus = $('.td_btn_minus_' + NameTable + '');
        btn_minus.attr('style', ' ');

        let nam = NameTable + '_Delete';
        let title = $('.' + nam + '');
        title.attr('style', ' ');
    };


    $('#btnClean_' + NameTable).attr('style', '');
    $('#btnAdd_' + NameTable).attr('style', '');


    $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');


    Resizable();
}





var GActions = {

     
  

    AssignToModel: <T>(Model: T, NameTable: string, cnt: number, StatusFlag: string): T => {
        debugger
        let properties = Object.getOwnPropertyNames(Model);
        for (var property of properties) {
            let element = document.getElementsByName('' + NameTable + '_' + property + cnt)[0] as HTMLInputElement;

            if (property == 'StatusFlag') {
                Model[property] = StatusFlag;
            }

            if (element != null) {
                if (element.type == "checkbox")
                    Model[property] = element.checked;
                else
                    Model[property] = element.value;
            }
        }

        return Model;
    },




    SetRequiredElements: (...elements: Array<HTMLElement>): void => {
        RequiredElements = new Array<HTMLElement>();
        for (var element of elements) {
            //element.className += RequiredClassName;
            RequiredElements.push(element);
        }
    },
    SetExchangeElements: (ArElement: HTMLInputElement, EnElement: HTMLInputElement) => {
        exchangeElements = new Array<HTMLInputElement>();
        exchangeElements.push(ArElement);
        exchangeElements.push(EnElement);
    },
    ValidateRequired: (): boolean => {
        //let result: boolean = false;
        let bools: Array<boolean> = new Array<boolean>();

        let elements = RequiredElements;// Array.prototype.slice.call(document.getElementsByClassName("required")) as Array<HTMLElement>;
        for (var element of elements) {
            switch (element.tagName.toUpperCase()) {
                case "INPUT":
                    if ((element as HTMLInputElement).type == "check") {
                        if ((element as HTMLInputElement).checked == false) {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    else {
                        if ((element as HTMLInputElement).value == "") {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    break;

                case "SELECT":
                    if ((element as HTMLSelectElement).value == "") {
                        bools.push(false);
                        element.style.borderColor = "red";
                    }
                    else {
                        bools.push(true);
                        element.style.borderColor = "";
                    }
                    break;


                default:
            }
        }

        if (exchangeElements.length > 0) {
            if (exchangeElements[0].value == "" && exchangeElements[1].value == "") {
                bools.push(false);
                exchangeElements[0].style.borderColor = "orange";
                exchangeElements[1].style.borderColor = "orange";
            }
            else {
                bools.push(true);
                exchangeElements[0].style.borderColor = "";
                exchangeElements[1].style.borderColor = "";
            }
        }
        let count = bools.filter(f => f == false).length;
        if (count > 0)
            return false;
        else
            return true;
    },

    RenderFromModel: (dataSource: any): void => {
        try {

            let properties = Object.getOwnPropertyNames(dataSource);
            for (var property of properties) {
                let element = document.getElementsByName(property)[0] as HTMLInputElement;
                if (element == null)
                    continue;
                if (property == "CreatedAt" || property == "UpdatedAt") {

                    if (String(dataSource[property]).indexOf("Date") > -1) {
                        element.value = DateTimeFormat(dataSource[property]);
                    }
                    else {
                        element.value = dataSource[property];
                    }
                    continue;
                }

                if (property == "CreatedBy" || property == "UpdatedBy") {
                    let value = String(dataSource[property]).toString();
                    if (value != null)
                        element.value = value;
                    else
                        element.value = "";
                    continue;
                }
                if (dataSource[property] == null) {
                    try {
                        element.value = dataSource[property]
                    } catch (e) {

                    }
                    finally {
                        continue;
                    }

                }
                if (element.type == "checkbox")
                    element.checked = <boolean>(dataSource[property]);
                else if (element.type == "date") {
                    element.value = dataSource[property];
                }
                else
                    element.value = dataSource[property];

            }
        } catch (e) {

        }
    },
  
    //eslam elassal
    FillComboSingular: (dataSource: Array<any>, combo: HTMLSelectElement) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i: number = 0; i < dataSource.length; i++) {
                //let code = dataSource[i][i];
                //let name = dataSource[i][dataSource[i]];
                combo.add(new Option(dataSource[i], i.toString()));
            }
        }

    },

    FillCombo: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                combo.add(new Option(name, code));
            }
        }

    },
    FillComboFirstvalue: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, Name: any, Code: any) => {
        if (combo != null) {

            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(Name, Code));

            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];

                combo.add(new Option(name, code));
                if (name == Name && code == Code) {
                    combo.remove(i + 1);
                }
            }
        }

    },


    FillCombowithdefultAndEmptyChoice: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any, EmptyChoiceName: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                let id = dataSource[i][codeField];

                combo.add(new Option(name, code));

            }

            //add empty
            combo.add(new Option(EmptyChoiceName, "-1"));

        }
    },

    FillCombowithdefult: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                let id = dataSource[i][codeField];
                //var x = true;
                //if (x==true) {
                //    $("#name").attr('id', id);

                //}
                //let test = 


                combo.add(new Option(name, code));
                //




            }

        }
    },
    //Filldefult: (combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any) => {
    //    if (combo != null) {
    //        for (let i: number = combo.length; i >= 0; i--) {
    //            combo.remove(i);
    //        }
    //        combo.add(new Option(NameDefult, null));              

    //    }
    //},
    FillComboWithEmpty: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any) => {
        for (let i: number = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        combo.add(new Option("", ""));
        for (let i: number = 0; i < dataSource.length; i++) {
            let code = dataSource[i][codeField];
            let name = dataSource[i][textField];
            combo.add(new Option(name, code));
        }
    },

    GetElementById: <T extends HTMLElement>(id: string): T => {
        let element: T = document.getElementById(id) as T;
        return element;
    },
    CreateElement: <T extends HTMLElement>(id: string) => {
        let element: T = document.createElement(id) as T;
        return element;
    }
};















function Resizable() {  //تنظيم الجريد



    'use strict';

    var initResizable = function (that) {
        debugger
        //Deletes the plugin to re-create it
        that.$el.colResizable({ disable: true });

        //Creates the plugin
        that.$el.colResizable({
            liveDrag: that.options.liveDrag,
            fixed: that.options.fixed,
            headerOnly: that.options.headerOnly,
            minWidth: that.options.minWidth,
            hoverCursor: that.options.hoverCursor,
            dragCursor: that.options.dragCursor,
            onResize: that.onResize,
            onDrag: that.options.onResizableDrag
        });
    };

    $.extend($.fn.bootstrapTable.defaults, {
        resizable: false,
        liveDrag: false,
        fixed: true,
        headerOnly: false,
        minWidth: 15,
        hoverCursor: 'e-resize',
        dragCursor: 'e-resize',
        onResizableResize: function (e) {
            return false;
        },
        onResizableDrag: function (e) {
            return false;
        }
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _toggleView = BootstrapTable.prototype.toggleView,
        _resetView = BootstrapTable.prototype.resetView;

    BootstrapTable.prototype.toggleView = function () {
        _toggleView.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.resizable && this.options.cardView) {
            //Deletes the plugin
            $(this.$el).colResizable({ disable: true });
        }
    };

    BootstrapTable.prototype.resetView = function () {
        var that = this;

        _resetView.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.resizable) {
            // because in fitHeader function, we use setTimeout(func, 100);
            setTimeout(function () {
                initResizable(that);
            }, 300);
        }
    };

    BootstrapTable.prototype.onResize = function (e) {
        var that = $(e.currentTarget);
        that.bootstrapTable('resetView');
        that.data('bootstrap.table').options.onResizableResize.apply(e);
    }



    $('[data-toggle="table"]').bootstrapTable();

}