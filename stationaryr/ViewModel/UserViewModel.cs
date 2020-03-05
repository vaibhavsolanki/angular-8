using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace stationaryr.ViewModel
{

    public class UserViewModel : UserBaseViewModel
    {
        public bool IsLockedOut { get; set; }


        public string[] Roles { get; set; }
    }



    public class UserEditViewModel : UserBaseViewModel
    {
        public string CurrentPassword { get; set; }

        public string NewPassword { get; set; }


        public string[] Roles { get; set; }
    }



    public class UserPatchViewModel
    {
        public string FullName { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }
    }



    public abstract class UserBaseViewModel
    {
        public string Id { get; set; }

        //        [Required(ErrorMessage = "Username is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 200 characters")]
        public string UserName { get; set; }

        public string FullName { get; set; }

        //  [Required(ErrorMessage = "Email is required"), StringLength(200, ErrorMessage = "Email must be at most 200 characters"), EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Department { get; set; }
        public string Configuration { get; set; }

        public bool IsEnabled { get; set; }
    }




}
