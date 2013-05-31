

function log(s)
{
    console.log(s);
}

// collect factors as we go [ only prime factors ]



function checkdiv(i, N) 
{ 
    var d=N/i; 
    var di=Math.floor(d); 
    var diff=d-di; 
    return (diff<0.00001);
}

var allfactors = {};
var primes = [];

function isprime(j)
{
    return allfactors[j].length==0;
}

function factors(N) 
{ 
    var facs=[]; 
    
    if (allfactors[N])
        return allfactors[N];
    
    function addfactors(k)
    {
        var fs = factors(k);
        if (fs.length>0)
            facs = facs.concat(fs);
        else
            facs.push(k); 
    }
    
    for (var i=2; i<N; i++)
    { 
        if (isprime(i) && checkdiv(i, N)) 
        {
            var n = N/i;
            
            addfactors(i);
            addfactors(n);
            
            return allfactors[N] =facs;
        }
    }; 
    allfactors[N] =facs;
    primes.push(N);
    return facs;
}

// show all factors from 1 to 100

for (var i=1; i<=1000; i++) 
{
    var fs = factors(i);
}

// simplify a fraction  N/D

function simplify(N, D)
{
    var fsN = factors(N);
    var fsD = factors(D);
    
    //log(N+' : '+fsN.join(','));
    //log(D+' : '+fsD.join(','));
    
    // remove common factors 
    
    var inter = popcommon(fsN, fsD);
    
    var common = product(inter);
    var simpleD = D/common;
    var simpleN = N/common;
    log('');
    log(N+'/'+D+' = '+simpleN+'/'+simpleD+ ' ...  [ divide both by '+common+']');
}

function product(fs)
{
    var p=1;
    for (var i=0;i<fs.length;i++)
    {
        var n = fs[i];
        p = p*n;
    }
    return p;
}

function popcommon(A, B)
{
    if (A.length==0 || B.length==0)
        return [];
    var a = A[0];
    var b = B[0];
    
    
    if (a<b)
    {
        return popcommon(A.slice(1), B);
    }
    if (b<a)
    {
        return popcommon(A, B.slice(1));
    }
    
    //a==b : pop common from both
    
    return [a].concat(popcommon(A.slice(1),B.slice(1)));
}


// some examples : USAGE

simplify(123, 348);
simplify(64, 32);
simplify(30, 21);
simplify(50, 44);

simplify(35, 25);

simplify(360, 45);

simplify(101, 103);
simplify(81, 45);
