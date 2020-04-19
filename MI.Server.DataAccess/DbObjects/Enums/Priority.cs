using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Priority
    {
        Primary,
        Secondary
    }
}
