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
var ESGrid = /** @class */ (function () {
    function ESGrid() {
        this.ESG = new ESG();
        this.Column = new Array();
    }
    return ESGrid;
}());
var ESG = /** @class */ (function () {
    function ESG() {
        this.PrimaryKey = "";
        this.NameTable = "";
        this.Save = false;
        this.Back = false;
        this.DeleteRow = false;
        this.Add = false;
        this.Edit = false;
        this.SelectedKey;
        this.LastCounter = 0;
        this.RowCnt = 0;
        this.Right = false;
        this.object = new Object();
        this.TotalModel = new Object();
        this.Model = new Array();
        this.OnfunctionSave;
        this.OnfunctionTotal;
        this.OnRowDoubleClicked;
    }
    return ESG;
}());
var Column = /** @class */ (function () {
    function Column() {
        this.style = "";
        this.title = "";
        this.Name = "";
        this.value = "";
        this.Type = "";
        this.visible = false;
        this.Edit = false;
        this.ColumnType = new ControlEvents;
    }
    return Column;
}());
var ControlEvents = /** @class */ (function () {
    function ControlEvents() {
        this.NameType = '';
        this.textField = '';
        this.onclick;
        this.onkeyup;
        this.onchange;
        this.dataSource;
    }
    return ControlEvents;
}());
var ControlType;
(function (ControlType) {
    String.prototype.Val_Set = function (value, Grid) {
        var NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val(value);
        return (value);
    };
    String.prototype.Val_Num = function (Grid) {
        var NameFild = this;
        var value = $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val();
        return (Number(value));
    };
    String.prototype.Val_Str = function (Grid) {
        var NameFild = this;
        var value = $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val();
        return (value);
    };
    var ControlEvent = new ControlEvents();
    function Input(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'Input';
        return ControlEvent;
    }
    ControlType.Input = Input;
    function checkbox(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'checkbox';
        return ControlEvent;
    }
    ControlType.checkbox = checkbox;
    function Button(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'Button';
        return ControlEvent;
    }
    ControlType.Button = Button;
    function Dropdown(dataSourc, textField, onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = dataSourc;
        ControlEvent.NameType = 'Dropdown';
        ControlEvent.textField = textField;
        return ControlEvent;
    }
    ControlType.Dropdown = Dropdown;
})(ControlType || (ControlType = {}));
var flagBack = false;
var classs = $('<style> .display_hidden {display:none !important; }  .Text_right {text-align: right; }  .Text_left {text-align: left; }  </style>');
$('head:first').append(classs);
function BindGridControl(Grid) {
    var NameTable = Grid.ESG.NameTable;
    var style_Text = '';
    if (Grid.ESG.Right == true) {
        $("#" + NameTable).attr('style', 'direction: rtl;');
        style_Text = 'Text_right';
    }
    else {
        $("#" + NameTable).attr('style', 'direction: ltr;');
        style_Text = 'Text_left';
    }
    $("#" + NameTable).html("");
    var table; // ???????? ???????? ????????????
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
            '</div>';
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
        AssignGridControl(Grid, Grid.ESG.object);
    });
    $('#btnEdit_' + NameTable).click(function (e) {
        EditGridControl(Grid);
    });
    for (var i = 0; i < Grid.Column.length; i++) {
        var visible = "";
        if (Grid.Column[i].visible == false) {
            visible = 'hidden';
        }
        var thead = //???????? ???????????? ????????????
         void 0; //???????? ???????????? ????????????
        thead = '<th data-field="number" class=" ' + style_Text + '  ' + NameTable + '_' + i + '"   ' + visible + ' id="th_' + i + NameTable + '"  data-editable="false">' + Grid.Column[i].title + '</th>';
        $("#tr_" + NameTable).append(thead);
    }
    //------------------------------------------------------------?????????? ????????????
    Resizable();
    //----------------------------------------------------------------------------------
    $('.' + NameTable + '_Delete').attr('style', 'width: 3% !important;');
    //---------------------------------------------------------------------------------?????????? ???????? body 
    for (var u = 0; u < Grid.Column.length; u++) {
        //--------------------------------------------?????????? style -----------------------------------
        if (Grid.Column[u].style.trim() != '') {
            Grid.Column[u].style = 'width: 10%';
        }
        ;
        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
        }
        ;
        var title = $('.' + NameTable + '_' + u + '');
        title.attr('style', '' + Grid.Column[u].style + '  !important;');
        var _Delete = $('.' + NameTable + '_Delete');
        _Delete.attr('style', 'display:none !important;');
        $('#btnClean_' + NameTable).attr('style', 'display:none !important;');
        $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');
        $('#btnsave_' + NameTable).attr('style', 'display:none !important;');
        $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');
        if (Grid.ESG.DeleteRow == false) {
            var _Delete_1 = $('.' + NameTable + '_Delete');
            _Delete_1.addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Back == false) {
            $('#btnClean_' + NameTable).addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Add == false) {
            $('#btnAdd_' + NameTable).addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Edit == false) {
            $('#btnEdit_' + NameTable).addClass('display_hidden');
        }
        else {
            $('#btnEdit_' + NameTable).attr('style', '');
        }
        //------------------------------------------------------------------------------------------
    }
}
function DisplayDataGridControl(List, Grid) {
    flagBack = true;
    BindGridControl(Grid);
    var NameTable = Grid.ESG.NameTable;
    $('#btnClean_' + NameTable).click(function (e) {
        CleanGridControl(List, Grid);
    });
    if (List != null) {
        for (var i = 0; i < List.length; i++) {
            BuildGridControl(false, Grid);
            DisplayData(List[i], Grid);
        }
    }
    flagBack = false;
}
function DisplayData(List, Grid) {
    var NameTable = Grid.ESG.NameTable;
    var cnt = Grid.ESG.LastCounter - 1;
    var _Delete = $('.' + NameTable + '_Delete');
    _Delete.attr('style', 'display:none !important;');
    var btn_minus = $('#td_btn_minus_' + NameTable + cnt);
    btn_minus.attr('style', 'display:none !important;');
    for (var u = 0; u < Grid.Column.length; u++) {
        try {
            var values = Object["values"](List);
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
                    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', true);
                }
                else {
                    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', false);
                    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', true);
                }
            }
        }
        catch (e) {
        }
    }
}
function BuildGridControl(flagDisplay, Grid) {
    var NameTable = Grid.ESG.NameTable;
    var cnt = Grid.ESG.LastCounter;
    if (Grid.ESG.LastCounter == 0) {
        $('#tbody_' + NameTable + '').html('');
    }
    var classDisplay = flagDisplay == false ? "" : "animated zoomIn";
    var tbody = '<tr id= "No_Row_' + NameTable + cnt + '" class="' + classDisplay + '">' +
        '<td id="td_btn_minus_' + NameTable + cnt + '" class="td_btn_minus_' + NameTable + '" ><button id="btn_minus_' + NameTable + cnt + '" type="button" class="btn btn-custon-four btn-danger"><i class="fa fa-minus-circle"></i></button></td>' +
        '<td id="td_StatusFlag_' + NameTable + '' + cnt + '" style="display:none !important;" ><input  disabled="disabled" id="StatusFlag_' + NameTable + '_' + cnt + '" value="" type="hidden" class="form-control " placeholder="flag" /></td>' +
        '<td id="td_Ser_' + NameTable + '' + cnt + '" style="display:none !important;" ><input  disabled="disabled" id="Ser_' + NameTable + '_' + cnt + '" value="' + cnt + '" type="hidden" class="form-control " placeholder="flag" /></td>';
    '</tr>';
    $('#tbody_' + NameTable + '').append(tbody);
    if (Grid.ESG.DeleteRow == false) {
        var btn_minus = $('#td_btn_minus_' + NameTable + cnt);
        btn_minus.attr('style', 'display:none !important;');
    }
    ;
    $('#btn_minus_' + NameTable + cnt).click(function (e) {
        DeleteRow('No_Row_' + NameTable + cnt, cnt, NameTable);
    });
    var _loop_1 = function (u) {
        var td = '';
        var classEdit = '';
        if (Grid.Column[u].Edit == true) {
            classEdit = 'Edit_' + NameTable;
        }
        ;
        if (Grid.Column[u].ColumnType.NameType == 'Input') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" ><input  disabled="disabled" id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" value="' + Grid.Column[u].value + '" type="' + Grid.Column[u].Type + '" class="form-control ' + classEdit + '" placeholder="' + Grid.Column[u].value + '" /></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }
        if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" ><select disabled="disabled"  id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" class="form-control ' + classEdit + '">  </select></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
            var ddlFilter = document.getElementById('' + NameTable + '_' + Grid.Column[u].Name + cnt + '');
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
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').focus(function () {
            Grid.ESG.RowCnt = Number($("#Ser_" + NameTable + '_' + cnt).val());
        });
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').click(function () {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            Grid.Column[u].ColumnType.onclick();
        });
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').on('keyup', function (e) {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            Grid.Column[u].ColumnType.onkeyup();
        });
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').on('change', function (e) {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            Grid.Column[u].ColumnType.onchange();
            ComputeTotalGridControl(Grid, Grid.ESG.object);
        });
        //--------------------------------------------?????????? style -----------------------------------
        if (Grid.ESG.LastCounter == 0) {
            if (Grid.Column[u].style.trim() != '') {
                Grid.Column[u].style = 'width: 10%';
            }
            ;
            if (Grid.Column[u].visible == false) {
                Grid.Column[u].style = ' display:none;';
            }
            ;
            var title = $('.' + NameTable + '_' + u + '');
            title.attr('style', '' + Grid.Column[u].style + '  !important;');
            var DeleteRow_1 = $('.' + NameTable + '_Delete');
            DeleteRow_1.attr('style', 'width: 3% !important;');
        }
        if (Grid.ESG.DeleteRow == false) {
            var title = $('.' + NameTable + '_Delete');
            title.attr('style', 'display:none !important;');
        }
        ;
        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
            var Column_td = $('#td_' + NameTable + '_' + Grid.Column[u].Name + cnt);
            Column_td.attr('style', '' + Grid.Column[u].style + '  !important;');
        }
        ;
    };
    for (var u = 0; u < Grid.Column.length; u++) {
        _loop_1(u);
    }
    $('#No_Row_' + NameTable + cnt + '').dblclick(function () {
        Grid.ESG.SelectedKey = $('#' + NameTable + '_' + Grid.ESG.PrimaryKey + cnt + '').val();
        Grid.ESG.OnRowDoubleClicked();
    });
    if ($('#btnsave_' + NameTable).attr('style').trim() == '') {
        $('.Edit_' + NameTable).removeAttr('disabled');
    }
    ;
    Grid.ESG.LastCounter++;
}
function DeleteRow(ID, cnt, NameTable) {
    WorningMessage("Do you want to delete?", "Do you want to delete?", "warning", "warning", function () {
        $("#" + ID + "").attr("hidden", "true");
        $("#StatusFlag_" + NameTable + '_' + cnt).val() == 'i' ? $("#StatusFlag_" + NameTable + '_' + cnt).val('m') : $("#StatusFlag_" + NameTable + '_' + cnt).val('d');
    });
}
function CleanGridControl(List, Grid) {
    var NameTable = Grid.ESG.NameTable;
    $('#table_' + NameTable).html('');
    $('#btnEdit_' + NameTable).attr('style', '');
    $('#btnsave_' + NameTable).attr('style', 'display:none !important;');
    $('.' + NameTable + '_Delete').attr('style', 'display:none !important;');
    $('#btnClean_' + NameTable).attr('style', 'display:none !important;');
    $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');
    Grid.ESG.LastCounter = 0;
    DisplayDataGridControl(List, Grid);
    $('[data-toggle="table"]').bootstrapTable();
}
function AssignGridControl(Grid, Newobject) {
    var obj = Grid.ESG.object;
    var NameTable = Grid.ESG.NameTable;
    var LastCountGrid = Grid.ESG.LastCounter;
    var DetailsModel = new Array();
    var Model = JSON.parse(JSON.stringify(obj));
    for (var i = 0; i < LastCountGrid; i++) {
        var cnt = i;
        var StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        Model = JSON.parse(JSON.stringify(obj));
        if (StatusFlag == "i") {
            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            DetailsModel.push(Model);
        }
        if (StatusFlag == "u") {
            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            DetailsModel.push(Model);
        }
        if (StatusFlag == "d") {
            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            DetailsModel.push(Model);
        }
    }
    Grid.ESG.Model = DetailsModel;
    Grid.ESG.OnfunctionSave();
    return DetailsModel;
}
function ComputeTotalGridControl(Grid, Newobject) {
    var obj = Grid.ESG.object;
    var NameTable = Grid.ESG.NameTable;
    var LastCountGrid = Grid.ESG.LastCounter;
    var _obj = JSON.parse(JSON.stringify(obj));
    var _keys = Object.keys(_obj).filter(function (this_fruit) { return _obj[this_fruit] !== ""; });
    var Model = {};
    _keys.forEach(function (key) { return Model[key] = _obj[key]; });
    Model["Ser"] = 0;
    for (var i = 0; i < LastCountGrid; i++) {
        var cnt = i;
        var StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        if (StatusFlag != "d" && StatusFlag != "m") {
            GActions.ComputeTotalToModel(Model, NameTable, cnt, StatusFlag);
        }
        Model["Ser"] += 1;
    }
    Grid.ESG.TotalModel = Model;
    Grid.ESG.OnfunctionTotal();
    return Grid.ESG.TotalModel;
}
function EditGridControl(Grid) {
    var NameTable = Grid.ESG.NameTable;
    $('.Edit_' + NameTable).removeAttr('disabled');
    $('#btnsave_' + NameTable).attr('style', '');
    if (Grid.ESG.DeleteRow == true) {
        var btn_minus = $('.td_btn_minus_' + NameTable + '');
        btn_minus.attr('style', ' ');
        var nam = NameTable + '_Delete';
        var title = $('.' + nam + '');
        title.attr('style', ' ');
    }
    ;
    $('#btnClean_' + NameTable).attr('style', '');
    $('#btnAdd_' + NameTable).attr('style', '');
    $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');
    Resizable();
}
var GActions = {
    AssignToModel: function (Model, NameTable, cnt, StatusFlag) {
        var properties = Object.getOwnPropertyNames(Model);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            var element = document.getElementById('' + NameTable + '_' + property + cnt);
            if (element != null) {
                if (element.type == "checkbox")
                    Model[property] = element.checked;
                else
                    Model[property] = element.value;
            }
        }
        return Model;
    },
    ComputeTotalToModel: function (Model, NameTable, cnt, StatusFlag) {
        var properties = Object.getOwnPropertyNames(Model);
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var property = properties_2[_i];
            var element = document.getElementById('' + NameTable + '_' + property + cnt);
            if (element != null) {
                if (element.type != "checkbox")
                    try {
                        Model[property] += Number(element.value);
                    }
                    catch (e) {
                    }
            }
        }
        return Model;
    },
};
function Resizable() {
    'use strict';
    var initResizable = function (that) {
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
    var BootstrapTable = $.fn.bootstrapTable.Constructor, _toggleView = BootstrapTable.prototype.toggleView, _resetView = BootstrapTable.prototype.resetView;
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
    };
    $('[data-toggle="table"]').bootstrapTable();
}
//# sourceMappingURL=EslamGrid.js.map