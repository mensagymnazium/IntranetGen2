using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    [Flags]
    public enum SubjectCategoryEnum
    {
        NotDefined = 0,
        [EnumMember(Value = "Maturitní semináře")]
        Graduational = 1,
        [EnumMember(Value = "Nadstavbový seminář")]
        Seminars = 2,
        [EnumMember(Value = "Specializační semináře")]
        SpecialSeminars = 3,
        [EnumMember(Value = "Cizí jazyk")]
        ForeignLanguage = 4
    }
}
