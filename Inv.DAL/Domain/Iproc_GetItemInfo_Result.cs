//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inv.DAL.Domain
{
    using System;
    
    public partial class Iproc_GetItemInfo_Result
    {
        public int ItemID { get; set; }
        public int uomid { get; set; }
        public string UomCode { get; set; }
        public string u_DescA { get; set; }
        public string u_DescE { get; set; }
        public string It_DescA { get; set; }
        public string it_DescE { get; set; }
        public string ItemCode { get; set; }
        public Nullable<decimal> MinPrice { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<decimal> OnhandQty { get; set; }
        public Nullable<decimal> GlobalCost { get; set; }
        public Nullable<decimal> VatPrc { get; set; }
        public int VatNatID { get; set; }
    }
}