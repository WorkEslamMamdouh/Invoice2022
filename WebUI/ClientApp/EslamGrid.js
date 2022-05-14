//----------------------------------------------------------------ESGrid--------------------------------------
var ESGrid = /** @class */ (function () {
    function ESGrid() {
        this.ESG = new ESG();
        this.Column = new Array();
    }
    return ESGrid;
}());
var ESG = /** @class */ (function () {
    function ESG() {
        this.NameTable = "";
        this.Save = false;
        this.AllClean = false;
        this.DeleteRow = false;
        this.Add = false;
        this.Edit = false;
        this.LastCounter = 0;
        this.Right = false;
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
        debugger;
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
var classs = $('<style> .display_hidden {display:none !important; }  .Text_right {text-align: right; }  .Text_left {text-align: left; }  </style>');
$('head:first').append(classs);
function InitializeGridControl(Grid) {
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
    var table; // بناء هيكل الجدوا
    table =
        '<div class="button-ap-list responsive-btn">' +
            '<button id="btnEdit_' + NameTable + '" type="button" class="btn btn-custon-four btn-success"><i class="fa fa-save"></i>&nbsp; Edit</button>' +
            '<button id="btnsave_' + NameTable + '" type="button" class="btn btn-custon-four btn-success"><i class="fa fa-save"></i>&nbsp; save</button>' +
            '<button id="btnClean_' + NameTable + '" type="button" class="btn btn-custon-four btn-danger"><i class="fa fa-empty"></i>clear data</button>' +
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
        BuildGridControl(Grid);
    });
    $('#btnClean_' + NameTable).click(function (e) {
        CleanGridControl(Grid);
    });
    $('#btnsave_' + NameTable).click(function (e) {
        AssignGridControl(Grid);
    });
    $('#btnEdit_' + NameTable).click(function (e) {
        EditGridControl(Grid);
    });
    for (var i = 0; i < Grid.Column.length; i++) {
        //let classs = $('<style>' + NameTable + '_' + i + ' { ' + Grid.Column[i].style +' !important; }</style>')
        //$('html > head').append(classs);
        var visible = "";
        if (Grid.Column[i].visible == false) {
            visible = 'hidden';
            //Grid.Column[i].title = '0';
        }
        var thead = //بناء عناوين الجدول
         void 0; //بناء عناوين الجدول
        thead = '<th data-field="number" class=" ' + style_Text + '  ' + NameTable + '_' + i + '"   ' + visible + ' id="th_' + i + NameTable + '"  data-editable="false">' + Grid.Column[i].title + '</th>';
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
    for (var u = 0; u < Grid.Column.length; u++) {
        debugger;
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
        }
        ;
        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
            //let Column_td = $('#td_' + NameTable + '_' + Grid.Column[u].Name);
            //Column_td.attr('style', '' + Grid.Column[u].style + '  !important;');
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
        if (Grid.ESG.AllClean == false) {
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
function BuildGridControl(Grid) {
    debugger;
    var NameTable = Grid.ESG.NameTable;
    //const node = document.getElementById("tbody_" + NameTable).lastChild;
    //const clone = node.cloneNode(true);    
    //document.getElementById("tbody_" + NameTable).appendChild(clone);
    var cnt = Grid.ESG.LastCounter;
    if (Grid.ESG.LastCounter == 0) {
        $('#tbody_' + NameTable + '').html('');
    }
    var tbody = '<tr id= "No_Row_' + NameTable + cnt + '" class="  animated zoomIn ">' +
        '<td id="td_btn_minus_' + NameTable + cnt + '" ><button id="btn_minus_' + NameTable + cnt + '" type="button" class="btn btn-custon-four btn-danger"><i class="fa fa-minus-circle"></i></button></td>' +
        '</tr>';
    $('#tbody_' + NameTable + '').append(tbody);
    if (Grid.ESG.DeleteRow == false) {
        var btn_minus = $('#td_btn_minus_' + NameTable + cnt);
        btn_minus.attr('style', 'display:none !important;');
    }
    ;
    $('#btn_minus_' + NameTable + cnt).click(function (e) {
        DeleteRow('No_Row_' + NameTable + cnt, cnt);
    });
    var _loop_1 = function (u) {
        debugger;
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
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" ><select id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" class="form-control ' + classEdit + '">  </select></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
            var ddlFilter = document.getElementById('' + NameTable + '_' + Grid.Column[u].Name + cnt + '');
            DocumentActions.FillCombowithdefult(Grid.Column[u].ColumnType.dataSource, ddlFilter, Grid.Column[u].Name, Grid.Column[u].ColumnType.textField, "Select");
        }
        //document.getElementById('No_Row_' + NameTable + '').appendChild(td);
        debugger;
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').click(function () {
            Grid.Column[u].ColumnType.onclick();
        });
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').on('keyup', function (e) {
            Grid.Column[u].ColumnType.onkeyup();
        });
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').on('change', function (e) {
            Grid.Column[u].ColumnType.onchange();
        });
        //--------------------------------------------اضافة style -----------------------------------
        if (Grid.ESG.LastCounter == 0) {
            if (Grid.Column[u].style.trim() != '') {
                Grid.Column[u].style = 'width: 10%';
            }
            ;
            if (Grid.Column[u].visible == false) {
                Grid.Column[u].style = ' display:none;';
                //let Column_td = $('#td_' + NameTable + '_' + Grid.Column[u].Name);
                //Column_td.attr('style', '' + Grid.Column[u].style + '  !important;');
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
    if ($('#btnsave_' + NameTable).attr('style').trim() == '') {
        $('.Edit_' + NameTable).removeAttr('disabled');
    }
    ;
    Grid.ESG.LastCounter++;
}
function DeleteRow(ID, cnt) {
    WorningMessage("Do you want to delete?", "Do you want to delete?", "warning", "warning", function () {
        $("#" + ID + "").attr("hidden", "true");
        //$("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
    });
}
function CleanGridControl(Grid) {
    var NameTable = Grid.ESG.NameTable;
    for (var i = 0; i < Grid.ESG.LastCounter; i++) {
        $("#No_Row_" + NameTable + i + "").attr("hidden", "true");
        //$("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
    }
    $('#btnEdit_' + NameTable).attr('style', '');
    $('#btnsave_' + NameTable).attr('style', 'display:none !important;');
    $('.' + NameTable + '_Delete').attr('style', 'display:none !important;');
    $('#btnClean_' + NameTable).attr('style', 'display:none !important;');
    $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');
    $('[data-toggle="table"]').bootstrapTable();
    //$('#tbody_' + NameTable + '').html('');
}
function AssignGridControl(Grid) {
    CleanGridControl(Grid);
}
function EditGridControl(Grid) {
    var NameTable = Grid.ESG.NameTable;
    $('.Edit_' + NameTable).removeAttr('disabled');
    $('#btnsave_' + NameTable).attr('style', '');
    $('.' + NameTable + '_Delete').attr('style', '');
    $('#btnClean_' + NameTable).attr('style', '');
    $('#btnAdd_' + NameTable).attr('style', '');
    $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');
}
function Resizable() {
    'use strict';
    var initResizable = function (that) {
        debugger;
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