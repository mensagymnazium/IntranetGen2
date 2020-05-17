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
        [EnumMember(Value = "Jazyk a jazyková komunikace")]
        LanguageCommunication = 1,
        [EnumMember(Value = "Matematika a její aplikace")]
        MathApplication = 2,
        [EnumMember(Value = "Informační a komunikační technologie")]
        Informatics = 4,
        [EnumMember(Value = "Člověk a společnost")]
        HumanSociety = 8,
        [EnumMember(Value = "Člověk a příroda")]
        HumanNature = 16,
        [EnumMember(Value = "Umění a kultura")]
        ArtCulture = 32,
        [EnumMember(Value = "Člověk a zdraví")]
        HumanHealth = 64,
        [EnumMember(Value = "Člověk a svět práce")]
        HumanWork = 128,
    }
}
