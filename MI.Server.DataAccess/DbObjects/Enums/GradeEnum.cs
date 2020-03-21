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
        Prima,
        Sekunda,
        Tercie,
        Kvarta,
        Kvinta,
        Sexta,
        Septima,
        Oktáva,
        NotDefined,
    }
}
