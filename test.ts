
type Split<S extends string, Splitor extends string> =
    string extends S
    ? string[]
    : S extends `${infer BEFORE}${Splitor}${infer AFTER}`
    ? [BEFORE, ...Split<AFTER, Splitor>]
    : S extends ``
    ? []
    : [S]


type A = Split<'a,b', ','>


type ParseSQLParameter<SQL extends string> =
    string extends SQL
    ? any[]
    : SQL extends `${string}?${infer LEFTSQL}`
    ? [any, ...ParseSQLParameter<LEFTSQL>]
    : []

type SQLParameter<SQL extends string> =
    ParseSQLParameter<SQL> extends []
    ? []
    : [ParseSQLParameter<SQL>]
function query<SQL extends string>(query: SQL, ...param: SQLParameter<SQL>): any[] {
    return []
}

query("SELECT * FROM DUAL")
query("SELECT * FROM USER WHERE ID = ?", [1])
query("SELECT * FROM USER WHERE ID = ? and PW = ?", [1, 2])
query("SELECT * FROM USER WHERE ID = ? and PW = ?", [1, 2, 3])