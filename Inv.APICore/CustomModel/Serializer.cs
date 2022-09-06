﻿/* 
 * This sample was created by Mohammed S. Elsuissey
 * Software consultant and .Net developer
 * asegypt@gmail.com
 * 01000592036
 */
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Inv.APICore.CustomModel
{
    public class SerializerToken
    {
        public static string Serialize(JObject request)
        {
            return SerializeToken(request);
        }

        private static string SerializeToken(JToken request)
        {
            string serialized = "";
            if (request.Parent is null)
            {
                SerializeToken(request.First);
            }
            else
            {
                if (request.Type == JTokenType.Property)
                {
                    string name = ((JProperty)request).Name.ToUpper();
                    serialized += "\"" + name + "\"";
                    foreach (var property in request)
                    {
                        if (property.Type == JTokenType.Object)
                        {
                            serialized += SerializeToken(property);
                        }
                        if (property.Type == JTokenType.Boolean || property.Type == JTokenType.Integer || property.Type == JTokenType.Float || property.Type == JTokenType.Date)
                        {
                            serialized += "\"" + property.Value<string>() + "\"";
                        }
                        if (property.Type == JTokenType.String)
                        {
                            serialized += JsonConvert.ToString(property.Value<string>());
                        }
                        if (property.Type == JTokenType.Array)
                        {
                            foreach (var item in property.Children())
                            {
                                serialized += "\"" + ((JProperty)request).Name.ToUpper() + "\"";
                                if (item.Type == JTokenType.String)
                                {
                                    serialized += JsonConvert.ToString(item.Value<string>());
                                }
                                else
                                {
                                    serialized += SerializeToken(item);
                                }
                            }
                        }
                    }
                }
            }
            if (request.Type == JTokenType.Object)
            {
                foreach (var property in request.Children())
                {

                    if (property.Type == JTokenType.Object || property.Type == JTokenType.Property)
                    {
                        serialized += SerializeToken(property);
                    }
                }
            }

            return serialized;
        }
    }
}
