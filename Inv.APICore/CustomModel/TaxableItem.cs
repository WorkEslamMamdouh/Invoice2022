﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.DAL.Domain;
using Inv.API.Models;
using System.Text;

namespace Inv.APICore.CustomModel
{
     

    public class TaxableItem
    {
        public string taxType { get; set; }
        public double? amount { get; set; }
        public string subType { get; set; }
        public double? rate { get; set; }
    }



}