using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum GradeEnum
    {
        Prima = 0,
        Sekunda = 1,
        Tercie = 2,
        Kvarta = 3,
        Kvinta = 4,
        Sexta = 5,
        Septima = 6,
        Oktava = 7
    }
}
