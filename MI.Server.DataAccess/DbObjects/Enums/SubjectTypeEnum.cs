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
    public enum SubjectTypeEnum
    {
        NotDefined = 0 ,
        [EnumMember(Value = "Volitelný")]
        Optional = 1,
        [EnumMember(Value = "Maturitní semináře")]
        Graduational = 2,
        [EnumMember(Value = "Cizí jazyk")]
        ForeignLanguage = 4,
        [EnumMember(Value = "Nadstavbový seminář")]
        Seminars = 8,
        [EnumMember(Value = "Specializační semináře")]
        SpecialSeminars = 16,
        [EnumMember(Value = "Jazyk a jazyková komuniakce")]
        LanguageCommunication = 32,
        [EnumMember(Value = "Matematika a její aplikace")]
        MathApplication = 64,
        [EnumMember(Value = "Informační a komunikační technologie")]
        Informatics = 128,
        [EnumMember(Value = "Člověk a společnost")]
        HumanSociety = 256,
        [EnumMember(Value = "Člověk a příroda")]
        HumanNature = 512,
        [EnumMember(Value = "Umění a kultura")]
        ArtCulture = 1024,
        [EnumMember(Value = "Člověk a zdraví")]
        HumanHealth = 2048,
        [EnumMember(Value = "Člověk a svět práce")]
        HumanWork = 4096,











    }
}
