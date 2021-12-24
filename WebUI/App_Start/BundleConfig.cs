using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Inv.WebUI.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Bundles/jquery").
            Include("~/Scripts/jquery-3.1.1.min.js" ));

            bundles.Add(new ScriptBundle("~/Bundles/IgGrid_SearchGrid").Include(
               "~/Scripts/IgGrid/jquery-ui.min.js",
               "~/Scripts/IgGrid/infragistics.core.js",
               "~/Scripts/IgGrid/infragistics.lob.js",
               "~/Scripts/jsgrid/jsgrid.min.js",
               "~/ClientApp/IgGrid.js"));

            bundles.Add(new ScriptBundle("~/Bundles/ClientApp")
                .Include("~/ClientApp/AjaxCaller.js",
                "~/ClientApp/SystemTools.js",
                "~/ClientApp/Entities.js",
                "~/ClientApp/Shared.js"));

            bundles.Add(new ScriptBundle("~/Bundles/ClientAppWithJsGrid")
                .Include("~/ClientApp/AjaxCaller.js",
                "~/ClientApp/SystemTools.js",
                "~/ClientApp/Entities.js",
                "~/ClientApp/Shared.js",
                "~/ClientApp/JsGrid.js"));

            bundles.Add(new ScriptBundle("~/Bundles/ClientApp2")
                .Include("~/ClientApp/CustomEntities.js",
                "~/ClientApp/MessageBox.js"));

            bundles.Add(new ScriptBundle("~/Bundles/bootstrap")
                .Include("~/js/bootstrap.min.js",
                "~/js/effect.js",
                "~/js/waitMe.js"));

            bundles.Add(new ScriptBundle("~/Bundles/bootstraptest")
             .Include("~/js/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/Bundles/Partial")
                .Include("~/ClientApp/Partial/AppMenu.js",
                "~/ClientApp/Partial/ControlsButtons.js"));

          


            bundles.Add(new StyleBundle("~/Bundles/AppStyle2")
                .Include(
                
                 "~/Scripts/IgGrid/infragistics.css",
                 "~/Scripts/jsgrid/jsgrid.min.css",
                 "~/Scripts/jsgrid/jsgrid-theme.min.css",
                 "~/Scripts/jsgrid/jsgrid-theme.css",
                 "~/Content/DataTables/css/jquery.dataTables.min.css"));

            bundles.Add(new ScriptBundle("~/Bundles/AppScript2")
              .Include( 
                "~/js/my_js.js"));

            bundles.Add(new ScriptBundle("~/Bundles/AppScript3")
              .Include(
                "~/ClientApp/Entities.js",
                "~/ClientApp/Shared.js",
                "~/ClientApp/App.js",
                "~/ClientApp/JsGrid.js",
                "~/Scripts/jsgrid/jsgrid.js",
                "~/ClientApp/SystemTools.js",
                "~/ClientApp/CustomEntities.js",
                "~/ClientApp/MessageBox.js",
                "~/ClientApp/HomeComponent.js"));


            bundles.Add(new ScriptBundle("~/Bundles/AppScript4")
             .Include("~/ClientApp/DataTable.js",
               "~/Scripts/DataTables/dataTables.bootstrap.js"
               ));
            bundles.Add(new ScriptBundle("~/Bundles/AppScript3Admin")
             .Include( 
               "~/ClientApp/Entities.js",
               "~/ClientApp/Shared.js",
               "~/ClientApp/App.js",
               "~/ClientApp/JsGrid.js",
               "~/Scripts/jsgrid/jsgrid.js",
               "~/ClientApp/SystemTools.js",
               "~/ClientApp/CustomEntities.js",
               "~/ClientApp/MessageBox.js"));
        }
    }
}