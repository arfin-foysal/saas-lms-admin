import Swal from "sweetalert2";

export  const confirmHandel = async (icon, buttonTxt, ButtonClr, Did, func) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: icon,
      confirmButtonColor: ButtonClr,
      cancelButtonColor: "#4e4e4e",
      confirmButtonText: "Yes," + buttonTxt + "!",
      width: 200,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        func(Did);
        Swal.fire("success");
        
      }
    });
  };

  // "error",
  // "Delete",
  // "#FF0000",
  // row?.row?.original?.id,
// handelDelete
  
