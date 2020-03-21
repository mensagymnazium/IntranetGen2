using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum SubjectTypeEnum
    {
        NotDefined,
        [EnumMember(Value = "Volitelný")]
        Optional,
        [EnumMember(Value = "Maturitní")]
        Graduational,
        [EnumMember(Value = "Cizí jazyk")]
        Language,
        [EnumMember(Value = "Nadstavbový seminář")]
        Seminars
    }
}
