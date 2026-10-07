var fso = new ActiveXObject("Scripting.FileSystemObject");
var f = fso.OpenTextFile("js/data.js", 1);
var code = f.ReadAll();
f.Close();
code = code.replace("const DATA =", "var DATA =");
try {
    eval(code);
    WScript.Echo("Groups: " + getGroups().length);
} catch(e) {
    WScript.Echo("Error on line " + e.line + ": " + e.message);
}
