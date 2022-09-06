﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.DAL.Domain;
using Inv.API.Models;
using System.Text;

namespace Inv.APICore.CustomModel
{
     
    public class UnitValue
    {
        public string currencySold { get; set; }
        public double? amountEGP { get; set; }//itemprice
        public double amountSold { get; set; } = 0.00;//itemprice
        public double currencyExchangeRate { get; set; } = 0.00;//itemprice
    }

   
}