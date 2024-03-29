/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%options case-insensitive
%%
/*"/""*""[^.]*""*""/" //multilinea
"//".**/
\s+                   /* skip whitespace */
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

[0-9]+("."[0-9]+)?\b  return 'numeros'
//COMENTARIOS

//TIPOS DE DATOS

"int"                  return 'int';
"boolean"              return 'boolean';
"double"               return 'double';
"char"                 return 'char';
"string"               return 'string';
"true"                return 'true';
"false"               return 'false';

"new"               return 'new';
    
"=="                   return 'igualigual'
"++"                    return 'masmas';
"--"                    return 'menosmenos';
">="                   return 'mayorigual';
"<="                   return 'menorigual';
"!="                  return 'diferencia';
"<"                   return 'menor';
","                   return 'coma';
">"                   return 'mayor';
//LISTA
"list"              return 'list';
"add"               return 'add';
"."                 return 'punto';
//SIMBOLOS ARITMETICOS
"+"                   return 'mas';
"*"                   return 'multi';
"/"                   return 'div';
"-"                   return 'menos';
"="                   return 'igual';
"^"                   return 'exponente';
"%"                   return 'modulo';

//Operaciones Relacionales

//Ternario
"?"                   return 'interrogacion';
":"                   return 'dospts';

//Operadores Logicos
"!"                   return 'not';
"||"                  return 'or';
"&&"                  return 'and';

//Agrupacion
"("                    return 'parA';
")"                   return 'parC';
"["                   return 'corA';
"]"                   return 'corC';

//Caracteres Finalizacion y Encapsulamiento
";"                   return 'ptcoma';
"{"                   return 'llaveA';
"}"                   return 'llaveC';

//Secuencia de escape
"\\n"                  return "saltoln";
"\\\\"                  return "Barrainv";
"\\\""                return "comilladoble";

//Sentencias de control
"if"                return 'if';
"else"              return 'else';
"switch"            return 'switch';
"case"              return 'case';
"Default"           return 'default';
"break"             return 'break';
"continue"          return 'continue';
"return"            return 'return';

//SETENCIAS CICLICAS
"while"               return 'while';
"do"                  return 'do';
"for"                 return 'for';

//METODO
"void"                  return 'void';
"print"                 return 'print';

//FUNCIONES
"tolower"               return 'tolower';
"toupper"               return 'toupper';
//NATIVAS
"length"                return 'length';
"truncate"              return 'truncate';
"round"                 return 'round';
"TypeOf"                return 'typeof';
"tostring"              return 'tostring';
"tochararray"           return 'tochararray';
"exec"                  return 'exec';

//EXPRESIONES REGULARES
([a-zA-Z])([a-zA-Z0-9_])* return 'identificador';
["\""]([^"\""])*["\""] { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
\'[^\"]?\'  { yytext = yytext.substr(1,yyleng-2); return 'caracter'; }


<<EOF>>               return 'EOF';
.                     { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex
%{
    const TIPO_OPERACION = require('./controller/Enums/TipoOperacion');
    const TIPO_VALOR = require('./controller/Enums/TipoValor');
    
    const TIPO_DATO = require('./controller/Enums/TipoDato');
   
    const INSTRUCCION = require('./controller/Instruccion/Instruccion');

        let idSentencia = 1;
        let respuesta = {
                listaIns: [],
                errorSintactico: ""
        };
%}

/* operator associations and precedence */
%left 'or'  
%left 'and'
%right 'not'
%left 'igualigual' 'diferencia' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left  'menos' 'mas'
%left 'multi' 'div' 'modulo' 
%left 'exponente'
%left umenos

%start INICIO

%% /* language grammar */

INICIO:  OPCIONESCUERPO EOF {respuesta.errorSintactico = ""; respuesta.listaIns = $1; return respuesta;}
    | error ptyComa         { respuesta.errorSintactico  =  "Error Sintactico: " + "Linea: "  + (this._$.first_line-1) + ", Columna: " + this._$.first_column ; return respuesta; }|
;


OPCIONESCUERPO: OPCIONESCUERPO CUERPO {$1.push($2); $$=$1;}
    | CUERPO {$$=[$1];}
;

CUERPO: DEC_VAR  {$$=$1}
    |INICIALIZACION ptcoma CUERPO{$$=$1}
    | METODOS{$$=$1}
    | INICIALIZACION{$$=$1}
    | FUNCIONES {$$=$1}
    | PRINT{$$=$1}  
    | EXEC {$$=$1}
;
 
OPCIONESMETODS: OPCIONESMETODS CUERPOMETODO {$1.push($2); $$=$1;}
    | CUERPOMETODO {$$=[$1];}
    ;

CUERPOMETODO:  SWITCHS  {$$=$1}
    | WHILES   {$$=$1}
    | IFS  {$$=$1}
    | DEC_VAR   {$$=$1}
    | INICIALIZACION ptcoma CUERPOMETODO {$$=$1}
    | INICIALIZACION{$$=$1}
    | DECLAVECT  {$$=$1}
    | MODDIFIC  {$$=$1}
    | DECLALIST  {$$=$1}
    | ADDLIST  {$$=$1}
    | BREAK {$$=$1}
    | FORS  {$$=$1}
    | DOWHILE  {$$=$1}
    | RETURN  {$$=$1}
    | continue   {$$=$1}
    | CALLS {$$=$1}
    | PRINT {$$=$1}
;
BREAK:  break ptcoma  {$$ = INSTRUCCION.nuevoBreak(this._$.first_line,this._$.first_column+1)}
;
DEC_VAR: TIPO identificador ptcoma { $$ = INSTRUCCION.nuevaDeclaracion($2,null, $1,this._$.first_line,this._$.first_column+1, idSentencia); idSentencia += 5;}
        | TIPO identificador igual EXP ptcoma { $$ = INSTRUCCION.nuevaDeclaracion($2,$4, $1,this._$.first_line,this._$.first_column+1, idSentencia); idSentencia += 5;}
        | TIPO identificador igual CASTEO ptcoma
        | TIPO identificador igual ACCESS ptcoma
        | TIPO identificador igual TOLOWEER ptcoma
        | TIPO identificador igual TOUPPER ptcoma
        | TIPO identificador igual LENGTH ptcoma
        | TIPO identificador igual TRUNCATE ptcoma
        | TIPO identificador igual ROUND ptcoma
        | TIPO identificador igual TYPEOF ptcoma
        | TIPO identificador igual TOSTRING ptcoma
        | TIPO identificador igual TOCHARARRAY ptcoma
        | TIPO identificador
;

RETURN: return EXP ptcoma
    | return ptcoma
;

INICIALIZACION: identificador igual EXP ptcoma {$$=INSTRUCCION.nuevaAsignacion($1,$3,this._$.first_line,this._$.first_column+1, idSentencia); idSentencia += 4;}
    | AUM ptcoma {$$ = $1}    
;

AUM :  identificador menosmenos { $$ = INSTRUCCION.nuevaAsignacion($1,INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1), INSTRUCCION.nuevoValor(1, TIPO_VALOR.INT, this._$.first_line,this._$.first_column+1), TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1),this._$.first_line,this._$.first_column+1, idSentencia++);}
    | identificador masmas { $$ = INSTRUCCION.nuevaAsignacion($1,INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1), INSTRUCCION.nuevoValor(1, TIPO_VALOR.INT, this._$.first_line,this._$.first_column+1), TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1),this._$.first_line,this._$.first_column+1, idSentencia++);}
    ;

CASTEO: parA TIPO parC EXP
;
TIPO: char {$$ = TIPO_DATO.CHAR}
    | boolean {$$= TIPO_DATO.BOOLEAN}
    | double {$$ =TIPO_DATO.INT}
    | int {$$ = TIPO_DATO.INT}
    | string {$$ = TIPO_DATO.STRING}
;

EXP:  EXP mas EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP menos EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | parA EXP parC {$$ = $2}
    | EXP div EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP multi EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP exponente EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.POTENCIA,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | menos EXP %prec umenos {$$ = INSTRUCCION.nuevaOperacionBinaria(1, $2, TIPO_OPERACION.NEGACION,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP modulo EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MODULO,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 2;}
    | LLAMADAS 
    | cadena {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.STRING, this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 2;}
    | caracter {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CHAR, this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 2;}
    | numeros {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.INT, this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 2;}
    | true {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.BOOLEAN, this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 2;}
    | false {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BOOLEAN, this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 2;}
    | EXP menor EXP  {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP mayor EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP menorigual EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP mayorigual EXP{$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP diferencia EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP igualigual EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP or EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | EXP and EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | not EXP {$$ = INSTRUCCION.nuevaOperacionBinaria($2, null, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 3;}
    | identificador masmas {$$ = INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1), INSTRUCCION.nuevoValor(1, TIPO_VALOR.INT, this._$.first_line,this._$.first_column+1), TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1)}}
    | identificador menosmenos {$$ = INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1), INSTRUCCION.nuevoValor(1, TIPO_VALOR.INT, this._$.first_line,this._$.first_column+1), TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1)}}
;



DECLAVECT: TIPO corA corC identificador igual new TIPO corA numeros corC
        | TIPO corA corC identificador igual llaveA EXPRESIONES llaveC
;

LISTAVALORES: LISTAVALORES coma EXP {$1.push($3); $$=$1}
    | EXP {$$=[$1]}
;
LISTAPARAMETROS: LISTAPARAMETROS coma PARAMETROS {$1.push($3); $$=$1;}
    | PARAMETROS {$$=[$1];}
    ;
PARAMETROS: TIPO identificador { $$ = INSTRUCCION.nuevaDeclaracion($2,null, $1,this._$.first_line,this._$.first_column+1,idSentencia); idSentencia += 2}
;
ACCESS: identificador corA numeros corC
    | identificador corA corA numeros corC corC 

;

MODDIFIC: identificador corA numeros corC igual EXP ptcoma
    |identificador corA corA numeros corC corC igual EXP ptcoma
;

DECLALIST: list menor TIPO mayor identificador igual new  list menor TIPO mayor ptcoma
;
ADDLIST: identificador punto add parA EXP parC ptcoma
;

IFS: if parA EXP parC llaveA OPCIONESMETODS llaveC  {$$ = new INSTRUCCION.nuevoIf($3, $6,this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 8;}
    |if parA EXP parC llaveA OPCIONESMETODS llaveC else llaveA OPCIONESMETODS llaveC {$$ = new INSTRUCCION.nuevoIfElse($3, $6,$10,this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 8;}
    | if parA EXP parC llaveA OPCIONESMETODS llaveC ELSEIFS {$$ = new INSTRUCCION.nuevoIfConElseIf($3, $6,$8,null,this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 8;}
    | if parA EXP parC llaveA OPCIONESMETODS llaveC ELSEIFS else llaveA OPCIONESMETODS llaveC {$$ = new INSTRUCCION.nuevoIfConElseIf($3, $6,$8,$11,this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 8;}
;

ELSEIFS: ELSEIFS CONELSEIF {$1.push($2); $$=$1}
    |CONELSEIF {$$=[$1];}
;

CONELSEIF: else if parA EXP parC llaveA OPCIONESMETODS llaveC {$$ = new INSTRUCCION.nuevoElseIf($4, $7,this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 9;}
;

SWITCHS: switch parA EXP parC llaveA default dospts OPCIONESMETODS llaveC {$$ = new INSTRUCCION.nuevoSwitchDefault($3,$8,this._$.first_line, this._$.first_column+1)}
    | switch parA EXP parC llaveA CASES llaveC {$$ = new INSTRUCCION.nuevoSwitchConCase($3,$6,null,this._$.first_line, this._$.first_column+1)}
    | switch parA EXP parC llaveA CASES default dospts OPCIONESMETODS llaveC {$$ = new INSTRUCCION.nuevoSwitchConCase($3,$6,$9,this._$.first_line, this._$.first_column+1)}
;

CASES: CASES CONCASE {$1.push($2); $$=$1}
    |CONCASE {$$=[$1];}
;

CONCASE: case EXP dospts OPCIONESMETODS  {$$ = new INSTRUCCION.nuevoCase($2, $4,this._$.first_line, this._$.first_column+1)}
;

ELSEIF: else if parA EXP parC llaveA CUERPOMETODO llaveC 
;


WHILES: while parA EXP parC llaveA OPCIONESMETODS llaveC  {$$ = new INSTRUCCION.nuevoWhile($3, $6,this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 8;}
;

FORS: for parA INIFOR  EXP ptcoma AUM parC llaveA OPCIONESMETODS llaveC {$$ = new INSTRUCCION.nuevoFor($3,$4,$6,$9,this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 12;}
;
INIFOR: DEC_VAR {$$ = $1}
    | INICIALIZACION {$$ = $1}
;


DOWHILE: do llaveA OPCIONESMETODS llaveC while parA EXP parC ptcoma {$$ = new INSTRUCCION.nuevoDoWhile($7, $3,this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 10 }
;



LOGICO: or
    | and
    | not
;

FUNCIONES: TIPO  identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODS llaveC
    |  TIPO  identificador parA parC llaveA OPCIONESMETODS llaveC
;

METODOS: void identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODS llaveC {$$ = INSTRUCCION.nuevoMetodo($2, $4, $7 , this._$.first_line, this._$.first_column+1 , idSentencia); idSentencia += 9}
    | void identificador parA parC llaveA OPCIONESMETODS llaveC  {$$ = INSTRUCCION.nuevoMetodo($2, null, $6 , this._$.first_line, this._$.first_column+1 , idSentencia); idSentencia += 9}
;

//LLAMADAS

LLAMADAS: identificador parA LISTAVALORES parC {$$= INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5 }
    | identificador parA parC  {$$= INSTRUCCION.nuevaLlamada($1, null, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4 }
;
CALLS: LLAMADAS ptcoma {$$ = $1}
;
PRINT: print parA EXP parC ptcoma {$$ = new INSTRUCCION.nuevoPrint($3, this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 3;}
    | print parA parC ptcoma {$$ = new INSTRUCCION.nuevoPrint( INSTRUCCION.nuevoValor("", TIPO_VALOR.STRING, this._$.first_line,this._$.first_column+1) , this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 3;}
;


TOLOWEER: tolower parA EXP parC
;
TOUPPER: toupper parA EXP parC
;
LENGTH: length parA EXP parC
;
TRUNCATE: truncate parA EXP parC
;
ROUND: round parA EXP parC
;
TYPEOF: typeof parA EXP parC 
;
TOSTRING: tostring parA EXP parC
;
TOCHARARRAY: tochararray parA EXP parC
;
EXEC: exec identificador parA parC ptcoma  {$$ = INSTRUCCION.nuevoExec($2,null, this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 5}
    | exec identificador parA LISTAVALORES parC ptcoma  {$$ = INSTRUCCION.nuevoExec($2,$4, this._$.first_line, this._$.first_column+1,idSentencia); idSentencia += 6}
;