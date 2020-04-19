using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum PeriodEnum
    {

        NotDefined,
        [EnumMember(Value = "1-2. (8:30 - 10:05)")]
        Period1_2,
        [EnumMember(Value = "3-4. (10:15 - 11:50)")]
        Period3_4,
        [EnumMember(Value = "5-6. (12:15 - 13:50)")]
        Period5_6,
        [EnumMember(Value = "7-8. (14:30 - 16:05)")]
        Period7_8,
        [EnumMember(Value = "9-10. (16:15 - 17:50)")]
        Period9_10,
    }
}
