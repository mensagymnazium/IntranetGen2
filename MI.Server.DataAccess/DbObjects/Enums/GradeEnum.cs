using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    public enum GradeEnum
    {
        Prima   = (1 << 0),
        Sekunda = (1 << 1),
        Tercie  = (1 << 2),
        Kvarta  = (1 << 3),
        Kvinta  = (1 << 4),
        Sexta   = (1 << 5),
        Septima = (1 << 6),
        Oktava  = (1 << 7)
    }
}
