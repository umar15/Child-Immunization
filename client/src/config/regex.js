export const validMobileNumber = new RegExp("^[0-9-+()]*$");
export const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
export const validPassword = new RegExp("^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{7,}$");
export const validString = new RegExp("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$");
export const validCNIC = new RegExp("^[0-9]{5}-[0-9]{7}-[0-9]$");
