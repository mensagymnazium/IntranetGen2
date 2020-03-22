using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    [Flags]
    public enum GradeEnum
    {
        NotDefined = 0,
        Prima = 1,
        Sekunda = 2,
        Tercie = 4,
        Kvarta = 8,
        Kvinta = 16,
        Sexta = 32,
        Septima = 64,
        Oktáva = 128,
    }
}
