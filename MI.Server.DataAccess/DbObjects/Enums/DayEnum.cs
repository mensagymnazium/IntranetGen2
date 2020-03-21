using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum DayEnum
    {
        NotDefined,
        [EnumMember(Value = "Pondělí")]
        Monday,
        [EnumMember(Value = "Úterý")]
        Tuesday,
        [EnumMember(Value = "Středa")]
        Wednesday,
        [EnumMember(Value = "Čtvrtek")]
        Thursday,
        [EnumMember(Value = "Pátek")]
        Friday,
    }
}
