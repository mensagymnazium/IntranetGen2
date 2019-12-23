﻿using MI.Server.BusinessLogic.Business;
using MI.Server.DataAccess.Database;

namespace MI.Server.BusinessLogic
{
    public class BusinessManager
    {
        private readonly MensaIntranetContext _context;

        public SubjectBusiness SubjectBusiness => new SubjectBusiness(_context);
        public SignupBusiness SignupBusiness => new SignupBusiness(_context);
        public TeacherBusiness TeacherBusiness => new TeacherBusiness(_context);

        public BusinessManager(MensaIntranetContext context)
        {
            _context = context;
        }
    }
}