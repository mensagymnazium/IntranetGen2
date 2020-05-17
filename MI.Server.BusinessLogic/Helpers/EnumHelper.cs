using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MI.Server.BusinessLogic.Helpers
{
    public static class EnumHelper
    {
        public static SubjectTypeEnum GetSubjectTypeEnum(List<SubjectTypeEnum> list)
        {
            if (list.Count == 0)
                return SubjectTypeEnum.NotDefined;
            return list.Aggregate((prev, next) => prev | next);
        }

        public static GradeEnum GetGradeEnum(List<GradeEnum> list)
        {
            if (list.Count == 0)
                return GradeEnum.NotDefined;
            return list.Aggregate((prev, next) => prev | next);
        }

        public static SubjectCategoryEnum GetCategoryEnum(List<SubjectCategoryEnum> list)
        {
            if (list.Count == 0)
                return SubjectCategoryEnum.NotDefined;
            return list.Aggregate((prev, next) => prev | next);
        }
    }
}
