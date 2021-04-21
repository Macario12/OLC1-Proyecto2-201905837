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
"!="                  return 'diferencia';
"<"                   return 'menor';
"<="                   return 'menorigual';
","                   return 'coma';
">"                   return 'mayor';
">="                   return 'mayorigual';

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
["\""]([^"\""])*["\""] return 'cadena';
["\'"]([^"\""])*["\'"] return 'caracter';



<<EOF>>               return 'EOF';
.                     { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex
%{
    const TIPO_OPERACION = require('./controller/Enums/TipoOperacion');
    const TIPO_VALOR = require('./controller/Enums/TipoValor');
    
    const TIPO_DATO = require('./controller/Enums/TipoDato');
   
    const INSTRUCCION = require('./controller/Instruccion/Instruccion')
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


%left umenos

%start INICIO

%% /* language grammar */

INICIO: OPCIONESCUERPO EOF{return $4;}
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO{$1.push($2); $$=$1;}
    | CUERPO {$$=[$1];}
;

CUERPO: DEC_VAR  {$$=$1}
    |INICIALIZACION ptcoma CUERPO{$$=$1}
    | METODOS{$$=$1}
    | INICIALIZACION{$$=$1}
    | FUNCIONES {$$=$1}
    | CALLS{$$=$1}
    | PRINT{$$=$1}
;

CUERPOMETODO: IFS CUERPOMETODO
    | DEC_VAR CUERPOMETODO
    | INICIALIZACION ptcoma CUERPOMETODO
    | DECLAVECT CUERPOMETODO
    | MODDIFIC CUERPOMETODO
    | DECLALIST CUERPOMETODO
    | ADDLIST CUERPOMETODO
    | break ptcoma CUERPOMETODO
    | SWITCHS CUERPOMETODO
    | WHILES CUERPOMETODO
    | IFS
    | DEC_VAR 
    | INICIALIZACION ptcoma
    | DECLAVECT
    | MODDIFIC
    | DECLALIST
    | ADDLIST
    | break ptcoma
    | FORS CUERPOMETODO
    | FORS
    | DOWHILE CUERPOMETODO
    | DOWHILE
    | RETURN CUERPOMETODO
    | RETURN
    | continue CUERPOMETODO
    | continue 
    | LLAMADAS CUERPOMETODO
    | LLAMADAS
    | PRINT CUERPOMETODO
    | PRINT
;

DEC_VAR: TIPO identificador ptcoma
        | TIPO identificador igual EXP ptcoma
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

INICIALIZACION: identificador igual EXP ptcoma
;

CASTEO: parA TIPO parC EXP
;
TIPO: char
    | boolean
    | double
    | int
    | string
;

EXP:  EXP mas EXP
    | EXP menos EXP
    | EXP div EXP
    | EXP multi EXP
    | EXP exponente EXP
    | menos EXP %prec umenos
    | EXP modulo EXP
    | identificador
    | LLAMADAS 
    | cadena
    | caracter
    | numeros {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.INT, this._$.first_line,this._$.first_column+1)}
    | BOOL
;

BOOL: true
    | false
;

DECLAVECT: TIPO corA corC identificador igual new TIPO corA numeros corC
        | TIPO corA corC identificador igual llaveA EXPRESIONES llaveC
;

EXPRESIONES:  cadena coma EXPRESIONES
            | numeros coma EXPRESIONES
            | caracter coma EXPRESIONES
            | DEC_VAR coma EXPRESIONES
            | identificador coma EXPRESIONES
            | DEC_VAR
            | identificador
            | caracter
            | cadena
            | numeros
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

IFS: if parA CONDICIONES parC llaveA CUERPOMETODO llaveC CONTINAUCIONIF
    |if parA CONDICIONES parC llaveA CUERPOMETODO llaveC
;
CONTINAUCIONIF: ELSEIF CONTINAUCIONIF
    | ELSES
    ;


SWITCHS: switch parA CONDICIONES parC llaveA CUERPOSWITCH llaveC 
;
CUERPOSWITCH: case numeros dospts CUERPOMETODO CUERPOSWITCH
            | case numeros dospts CUERPOMETODO  
            | default dospts CUERPOMETODO
;

ELSEIF: else if parA CONDICIONES parC llaveA CUERPOMETODO llaveC 
;

ELSES: else llaveA CUERPOMETODO llaveC
;

WHILES: while parA CONDICIONES parC llaveA CUERPOMETODO llaveC
;

FORS: for parA DEC_VAR CONDICIONES ptcoma identificador INCRE parC llaveA CUERPOMETODO llaveC
    | for parA INICIALIZACION  CONDICIONES ptcoma INICIALIZACION parC llaveA CUERPOMETODO llaveC
    | for parA INICIALIZACION  CONDICIONES ptcoma identificador INCRE parC llaveA CUERPOMETODO llaveC
;

DOWHILE: do llaveA CUERPOMETODO llaveC while parA CONDICIONES parC ptcoma
;

INCRE: mas mas
    |menos menos
;
CONDICIONES: EXP mayor EXP LOGICO CONDICIONES
            | EXP menor EXP LOGICO CONDICIONES
            | EXP igual igual EXP LOGICO CONDICIONES
            | EXP mayorigual EXP LOGICO CONDICIONES
            | EXP igualigual EXP LOGICO CONDICIONES
            | EXP mayor EXP 
            | EXP menor EXP
            | EXP menorigual EXP    
            | EXP mayorigual EXP
            | EXP igual igual EXP
            | EXP
;

LOGICO: or
    | and
    | not
;

FUNCIONES: TIPO  identificador parA EXPRESIONES parC llaveA CUERPOMETODO llaveC
    |  TIPO  identificador parA parC llaveA CUERPOMETODO llaveC
;

METODOS: void identificador parA EXPRESIONES parC llaveA CUERPOMETODO llaveC
    | void identificador parA parC llaveA CUERPOMETODO llaveC
;

//LLAMADAS

LLAMADAS: identificador parA EXPRESIONES parC 
    | identificador parA parC 
;
CALLS: LLAMADAS ptcoma
;
PRINT: print parA EXP parC ptcoma {$$ = new INSTRUCCION.nuevoPrint($4, this._$.first_line, this._$.first_column+1)}
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
EXEC: exec LLAMADAS
;