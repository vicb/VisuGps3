var COMPILED = !0, goog = goog || {};
goog.NODE_JS = !1;
goog.global = goog.NODE_JS ? eval("global") : this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function $goog$provide$($name$$) {
  if(!COMPILED) {
    if(goog.isProvided_($name$$)) {
      throw Error('Namespace "' + $name$$ + '" already declared.');
    }
    delete goog.implicitNamespaces_[$name$$];
    for(var $namespace$$ = $name$$;($namespace$$ = $namespace$$.substring(0, $namespace$$.lastIndexOf("."))) && !goog.getObjectByName($namespace$$);) {
      goog.implicitNamespaces_[$namespace$$] = !0
    }
  }
  goog.exportPath_($name$$)
};
goog.setTestOnly = function $goog$setTestOnly$($opt_message$$) {
  if(COMPILED && !goog.DEBUG) {
    throw $opt_message$$ = $opt_message$$ || "", Error("Importing test-only code into non-debug environment" + $opt_message$$ ? ": " + $opt_message$$ : ".");
  }
};
COMPILED || (goog.isProvided_ = function $goog$isProvided_$($name$$) {
  return!goog.implicitNamespaces_[$name$$] && !!goog.getObjectByName($name$$)
}, goog.implicitNamespaces_ = {});
goog.isExistingGlobalVariable_ = function $goog$isExistingGlobalVariable_$($goog$$) {
  return"undefined" !== String(eval("typeof " + $goog$$))
};
goog.exportPath_ = function $goog$exportPath_$($name$$, $opt_object$$, $cur_opt_objectToExportTo$$) {
  $name$$ = $name$$.split(".");
  $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$ || goog.global;
  !($name$$[0] in $cur_opt_objectToExportTo$$) && $cur_opt_objectToExportTo$$.execScript && $cur_opt_objectToExportTo$$.execScript("var " + $name$$[0]);
  goog.NODE_JS && $cur_opt_objectToExportTo$$ === goog.global && goog.isExistingGlobalVariable_($name$$[0]) && ($cur_opt_objectToExportTo$$ = eval($name$$[0]), $name$$.shift());
  for(var $part$$;$name$$.length && ($part$$ = $name$$.shift());) {
    !$name$$.length && goog.isDef($opt_object$$) ? $cur_opt_objectToExportTo$$[$part$$] = $opt_object$$ : $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$[$part$$] ? $cur_opt_objectToExportTo$$[$part$$] : $cur_opt_objectToExportTo$$[$part$$] = {}
  }
};
goog.getObjectByName = function $goog$getObjectByName$($name$$, $opt_obj$$) {
  var $parts$$ = $name$$.split("."), $cur$$ = $opt_obj$$ || goog.global;
  goog.NODE_JS && $cur$$ === goog.global && goog.isExistingGlobalVariable_($parts$$[0]) && ($cur$$ = eval($parts$$[0]), $parts$$.shift());
  for(var $part$$;$part$$ = $parts$$.shift();) {
    if(goog.isDefAndNotNull($cur$$[$part$$])) {
      $cur$$ = $cur$$[$part$$]
    }else {
      return null
    }
  }
  return $cur$$
};
goog.globalize = function $goog$globalize$($obj$$, $opt_global$$) {
  var $global$$ = $opt_global$$ || goog.global, $x$$;
  for($x$$ in $obj$$) {
    $global$$[$x$$] = $obj$$[$x$$]
  }
};
goog.addDependency = function $goog$addDependency$($path$$, $provides_require$$, $requires$$) {
  if(!COMPILED) {
    for(var $j_provide$$, $path$$ = $path$$.replace(/\\/g, "/"), $deps$$ = goog.dependencies_, $i$$ = 0;$j_provide$$ = $provides_require$$[$i$$];$i$$++) {
      $deps$$.nameToPath[$j_provide$$] = $path$$, $path$$ in $deps$$.pathToNames || ($deps$$.pathToNames[$path$$] = {}), $deps$$.pathToNames[$path$$][$j_provide$$] = !0
    }
    for($j_provide$$ = 0;$provides_require$$ = $requires$$[$j_provide$$];$j_provide$$++) {
      $path$$ in $deps$$.requires || ($deps$$.requires[$path$$] = {}), $deps$$.requires[$path$$][$provides_require$$] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function $goog$require$($errorMessage_name$$) {
  if(!COMPILED && !goog.isProvided_($errorMessage_name$$)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var $path$$ = goog.getPathFromDeps_($errorMessage_name$$);
      if($path$$) {
        goog.included_[$path$$] = !0;
        goog.writeScripts_();
        return
      }
    }
    $errorMessage_name$$ = "goog.require could not find: " + $errorMessage_name$$;
    goog.global.console && goog.global.console.error($errorMessage_name$$);
    throw Error($errorMessage_name$$);
  }
};
goog.basePath = "";
goog.nullFunction = function $goog$nullFunction$() {
};
goog.identityFunction = function $goog$identityFunction$($opt_returnValue$$) {
  return $opt_returnValue$$
};
goog.abstractMethod = function $goog$abstractMethod$() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function $goog$addSingletonGetter$($ctor$$) {
  $ctor$$.getInstance = function $$ctor$$$getInstance$() {
    if($ctor$$.instance_) {
      return $ctor$$.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = $ctor$$);
    return $ctor$$.instance_ = new $ctor$$
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function $goog$inHtmlDocument_$() {
  var $doc$$ = goog.global.document;
  return"undefined" != typeof $doc$$ && "write" in $doc$$
}, goog.findBasePath_ = function $goog$findBasePath_$() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var $scripts$$ = goog.global.document.getElementsByTagName("script"), $i$$ = $scripts$$.length - 1;0 <= $i$$;--$i$$) {
        var $src$$ = $scripts$$[$i$$].src, $l_qmark$$ = $src$$.lastIndexOf("?"), $l_qmark$$ = -1 == $l_qmark$$ ? $src$$.length : $l_qmark$$;
        if("base.js" == $src$$.substr($l_qmark$$ - 7, 7)) {
          goog.basePath = $src$$.substr(0, $l_qmark$$ - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function $goog$importScript_$($src$$) {
  var $importScript$$ = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[$src$$] && $importScript$$($src$$) && (goog.dependencies_.written[$src$$] = !0)
}, goog.writeScriptTag_ = function $goog$writeScriptTag_$($src$$) {
  return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + $src$$ + '"><\/script>'), !0) : !1
}, goog.writeScripts_ = function $goog$writeScripts_$() {
  function $visitNode$$($path$$) {
    if(!($path$$ in $deps$$.written)) {
      if(!($path$$ in $deps$$.visited) && ($deps$$.visited[$path$$] = !0, $path$$ in $deps$$.requires)) {
        for(var $requireName$$ in $deps$$.requires[$path$$]) {
          if(!goog.isProvided_($requireName$$)) {
            if($requireName$$ in $deps$$.nameToPath) {
              $visitNode$$($deps$$.nameToPath[$requireName$$])
            }else {
              throw Error("Undefined nameToPath for " + $requireName$$);
            }
          }
        }
      }
      $path$$ in $seenScript$$ || ($seenScript$$[$path$$] = !0, $scripts$$.push($path$$))
    }
  }
  var $scripts$$ = [], $seenScript$$ = {}, $deps$$ = goog.dependencies_, $i$$7_path$$;
  for($i$$7_path$$ in goog.included_) {
    $deps$$.written[$i$$7_path$$] || $visitNode$$($i$$7_path$$)
  }
  for($i$$7_path$$ = 0;$i$$7_path$$ < $scripts$$.length;$i$$7_path$$++) {
    if($scripts$$[$i$$7_path$$]) {
      goog.importScript_(goog.basePath + $scripts$$[$i$$7_path$$])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function $goog$getPathFromDeps_$($rule$$) {
  return $rule$$ in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[$rule$$] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function $goog$typeOf$($value$$) {
  var $s$$ = typeof $value$$;
  if("object" == $s$$) {
    if($value$$) {
      if($value$$ instanceof Array) {
        return"array"
      }
      if($value$$ instanceof Object) {
        return $s$$
      }
      var $className$$ = Object.prototype.toString.call($value$$);
      if("[object Window]" == $className$$) {
        return"object"
      }
      if("[object Array]" == $className$$ || "number" == typeof $value$$.length && "undefined" != typeof $value$$.splice && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == $className$$ || "undefined" != typeof $value$$.call && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == $s$$ && "undefined" == typeof $value$$.call) {
      return"object"
    }
  }
  return $s$$
};
goog.isDef = function $goog$isDef$($val$$) {
  return void 0 !== $val$$
};
goog.isNull = function $goog$isNull$($val$$) {
  return null === $val$$
};
goog.isDefAndNotNull = function $goog$isDefAndNotNull$($val$$) {
  return null != $val$$
};
goog.isArray = function $goog$isArray$($val$$) {
  return"array" == goog.typeOf($val$$)
};
goog.isArrayLike = function $goog$isArrayLike$($val$$) {
  var $type$$ = goog.typeOf($val$$);
  return"array" == $type$$ || "object" == $type$$ && "number" == typeof $val$$.length
};
goog.isDateLike = function $goog$isDateLike$($val$$) {
  return goog.isObject($val$$) && "function" == typeof $val$$.getFullYear
};
goog.isString = function $goog$isString$($val$$) {
  return"string" == typeof $val$$
};
goog.isBoolean = function $goog$isBoolean$($val$$) {
  return"boolean" == typeof $val$$
};
goog.isNumber = function $goog$isNumber$($val$$) {
  return"number" == typeof $val$$
};
goog.isFunction = function $goog$isFunction$($val$$) {
  return"function" == goog.typeOf($val$$)
};
goog.isObject = function $goog$isObject$($val$$) {
  var $type$$ = typeof $val$$;
  return"object" == $type$$ && null != $val$$ || "function" == $type$$
};
goog.getUid = function $goog$getUid$($obj$$) {
  return $obj$$[goog.UID_PROPERTY_] || ($obj$$[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function $goog$removeUid$($obj$$) {
  "removeAttribute" in $obj$$ && $obj$$.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete $obj$$[goog.UID_PROPERTY_]
  }catch($ex$$) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function $goog$cloneObject$($obj$$) {
  var $clone_type$$ = goog.typeOf($obj$$);
  if("object" == $clone_type$$ || "array" == $clone_type$$) {
    if($obj$$.clone) {
      return $obj$$.clone()
    }
    var $clone_type$$ = "array" == $clone_type$$ ? [] : {}, $key$$;
    for($key$$ in $obj$$) {
      $clone_type$$[$key$$] = goog.cloneObject($obj$$[$key$$])
    }
    return $clone_type$$
  }
  return $obj$$
};
goog.bindNative_ = function $goog$bindNative_$($fn$$, $selfObj$$, $var_args$$) {
  return $fn$$.call.apply($fn$$.bind, arguments)
};
goog.bindJs_ = function $goog$bindJs_$($fn$$, $selfObj$$, $var_args$$) {
  if(!$fn$$) {
    throw Error();
  }
  if(2 < arguments.length) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $newArgs$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
      return $fn$$.apply($selfObj$$, $newArgs$$)
    }
  }
  return function() {
    return $fn$$.apply($selfObj$$, arguments)
  }
};
goog.bind = function $goog$bind$($fn$$, $selfObj$$, $var_args$$) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function $goog$partial$($fn$$, $var_args$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $newArgs$$ = Array.prototype.slice.call(arguments);
    $newArgs$$.unshift.apply($newArgs$$, $args$$);
    return $fn$$.apply(this, $newArgs$$)
  }
};
goog.mixin = function $goog$mixin$($target$$, $source$$) {
  for(var $x$$ in $source$$) {
    $target$$[$x$$] = $source$$[$x$$]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function $goog$globalEval$($script$$) {
  if(goog.global.execScript) {
    goog.global.execScript($script$$, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval($script$$)
      }else {
        var $doc$$ = goog.global.document, $scriptElt$$ = $doc$$.createElement("script");
        $scriptElt$$.type = "text/javascript";
        $scriptElt$$.defer = !1;
        $scriptElt$$.appendChild($doc$$.createTextNode($script$$));
        $doc$$.body.appendChild($scriptElt$$);
        $doc$$.body.removeChild($scriptElt$$)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function $goog$getCssName$($className$$, $opt_modifier$$) {
  var $getMapping$$ = function $$getMapping$$$($cssName$$) {
    return goog.cssNameMapping_[$cssName$$] || $cssName$$
  }, $rename_renameByParts$$ = function $$rename_renameByParts$$$($cssName$$1_parts$$) {
    for(var $cssName$$1_parts$$ = $cssName$$1_parts$$.split("-"), $mapped$$ = [], $i$$ = 0;$i$$ < $cssName$$1_parts$$.length;$i$$++) {
      $mapped$$.push($getMapping$$($cssName$$1_parts$$[$i$$]))
    }
    return $mapped$$.join("-")
  }, $rename_renameByParts$$ = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? $getMapping$$ : $rename_renameByParts$$ : function($a$$) {
    return $a$$
  };
  return $opt_modifier$$ ? $className$$ + "-" + $rename_renameByParts$$($opt_modifier$$) : $rename_renameByParts$$($className$$)
};
goog.setCssNameMapping = function $goog$setCssNameMapping$($mapping$$, $opt_style$$) {
  goog.cssNameMapping_ = $mapping$$;
  goog.cssNameMappingStyle_ = $opt_style$$
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function $goog$getMsg$($str$$, $opt_values$$) {
  var $values$$ = $opt_values$$ || {}, $key$$;
  for($key$$ in $values$$) {
    var $value$$ = ("" + $values$$[$key$$]).replace(/\$/g, "$$$$"), $str$$ = $str$$.replace(RegExp("\\{\\$" + $key$$ + "\\}", "gi"), $value$$)
  }
  return $str$$
};
goog.exportSymbol = function $goog$exportSymbol$($publicPath$$, $object$$, $opt_objectToExportTo$$) {
  goog.exportPath_($publicPath$$, $object$$, $opt_objectToExportTo$$)
};
goog.exportProperty = function $goog$exportProperty$($object$$, $publicName$$, $symbol$$) {
  $object$$[$publicName$$] = $symbol$$
};
goog.inherits = function $goog$inherits$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.superClass_ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$
};
goog.base = function $goog$base$($me$$, $opt_methodName$$, $var_args$$) {
  var $caller$$ = arguments.callee.caller;
  if($caller$$.superClass_) {
    return $caller$$.superClass_.constructor.apply($me$$, Array.prototype.slice.call(arguments, 1))
  }
  for(var $args$$ = Array.prototype.slice.call(arguments, 2), $foundCaller$$ = !1, $ctor$$ = $me$$.constructor;$ctor$$;$ctor$$ = $ctor$$.superClass_ && $ctor$$.superClass_.constructor) {
    if($ctor$$.prototype[$opt_methodName$$] === $caller$$) {
      $foundCaller$$ = !0
    }else {
      if($foundCaller$$) {
        return $ctor$$.prototype[$opt_methodName$$].apply($me$$, $args$$)
      }
    }
  }
  if($me$$[$opt_methodName$$] === $caller$$) {
    return $me$$.constructor.prototype[$opt_methodName$$].apply($me$$, $args$$)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function $goog$scope$($fn$$) {
  $fn$$.call(goog.global)
};
goog.debug = {};
goog.debug.Error = function $goog$debug$Error$($opt_msg$$) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  $opt_msg$$ && (this.message = String($opt_msg$$))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function $goog$string$startsWith$($str$$, $prefix$$) {
  return 0 == $str$$.lastIndexOf($prefix$$, 0)
};
goog.string.endsWith = function $goog$string$endsWith$($str$$, $suffix$$) {
  var $l$$ = $str$$.length - $suffix$$.length;
  return 0 <= $l$$ && $str$$.indexOf($suffix$$, $l$$) == $l$$
};
goog.string.caseInsensitiveStartsWith = function $goog$string$caseInsensitiveStartsWith$($str$$, $prefix$$) {
  return 0 == goog.string.caseInsensitiveCompare($prefix$$, $str$$.substr(0, $prefix$$.length))
};
goog.string.caseInsensitiveEndsWith = function $goog$string$caseInsensitiveEndsWith$($str$$, $suffix$$) {
  return 0 == goog.string.caseInsensitiveCompare($suffix$$, $str$$.substr($str$$.length - $suffix$$.length, $suffix$$.length))
};
goog.string.subs = function $goog$string$subs$($str$$, $var_args$$) {
  for(var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    var $replacement$$ = String(arguments[$i$$]).replace(/\$/g, "$$$$"), $str$$ = $str$$.replace(/\%s/, $replacement$$)
  }
  return $str$$
};
goog.string.collapseWhitespace = function $goog$string$collapseWhitespace$($str$$) {
  return $str$$.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function $goog$string$isEmpty$($str$$) {
  return/^[\s\xa0]*$/.test($str$$)
};
goog.string.isEmptySafe = function $goog$string$isEmptySafe$($str$$) {
  return goog.string.isEmpty(goog.string.makeSafe($str$$))
};
goog.string.isBreakingWhitespace = function $goog$string$isBreakingWhitespace$($str$$) {
  return!/[^\t\n\r ]/.test($str$$)
};
goog.string.isAlpha = function $goog$string$isAlpha$($str$$) {
  return!/[^a-zA-Z]/.test($str$$)
};
goog.string.isNumeric = function $goog$string$isNumeric$($str$$) {
  return!/[^0-9]/.test($str$$)
};
goog.string.isAlphaNumeric = function $goog$string$isAlphaNumeric$($str$$) {
  return!/[^a-zA-Z0-9]/.test($str$$)
};
goog.string.isSpace = function $goog$string$isSpace$($ch$$) {
  return" " == $ch$$
};
goog.string.isUnicodeChar = function $goog$string$isUnicodeChar$($ch$$) {
  return 1 == $ch$$.length && " " <= $ch$$ && "~" >= $ch$$ || "\u0080" <= $ch$$ && "\ufffd" >= $ch$$
};
goog.string.stripNewlines = function $goog$string$stripNewlines$($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function $goog$string$canonicalizeNewlines$($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function $goog$string$normalizeWhitespace$($str$$) {
  return $str$$.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function $goog$string$normalizeSpaces$($str$$) {
  return $str$$.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function $goog$string$collapseBreakingSpaces$($str$$) {
  return $str$$.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function $goog$string$trim$($str$$) {
  return $str$$.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function $goog$string$trimLeft$($str$$) {
  return $str$$.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function $goog$string$trimRight$($str$$) {
  return $str$$.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function $goog$string$caseInsensitiveCompare$($str1$$, $str2$$) {
  var $test1$$ = String($str1$$).toLowerCase(), $test2$$ = String($str2$$).toLowerCase();
  return $test1$$ < $test2$$ ? -1 : $test1$$ == $test2$$ ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function $goog$string$numerateCompare$($str1$$, $str2$$) {
  if($str1$$ == $str2$$) {
    return 0
  }
  if(!$str1$$) {
    return-1
  }
  if(!$str2$$) {
    return 1
  }
  for(var $num1_tokens1$$ = $str1$$.toLowerCase().match(goog.string.numerateCompareRegExp_), $num2_tokens2$$ = $str2$$.toLowerCase().match(goog.string.numerateCompareRegExp_), $count$$ = Math.min($num1_tokens1$$.length, $num2_tokens2$$.length), $i$$ = 0;$i$$ < $count$$;$i$$++) {
    var $a$$ = $num1_tokens1$$[$i$$], $b$$ = $num2_tokens2$$[$i$$];
    if($a$$ != $b$$) {
      return $num1_tokens1$$ = parseInt($a$$, 10), !isNaN($num1_tokens1$$) && ($num2_tokens2$$ = parseInt($b$$, 10), !isNaN($num2_tokens2$$) && $num1_tokens1$$ - $num2_tokens2$$) ? $num1_tokens1$$ - $num2_tokens2$$ : $a$$ < $b$$ ? -1 : 1
    }
  }
  return $num1_tokens1$$.length != $num2_tokens2$$.length ? $num1_tokens1$$.length - $num2_tokens2$$.length : $str1$$ < $str2$$ ? -1 : 1
};
goog.string.urlEncode = function $goog$string$urlEncode$($str$$) {
  return encodeURIComponent(String($str$$))
};
goog.string.urlDecode = function $goog$string$urlDecode$($str$$) {
  return decodeURIComponent($str$$.replace(/\+/g, " "))
};
goog.string.newLineToBr = function $goog$string$newLineToBr$($str$$, $opt_xml$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, $opt_xml$$ ? "<br />" : "<br>")
};
goog.string.htmlEscape = function $goog$string$htmlEscape$($str$$, $opt_isLikelyToContainHtmlChars$$) {
  if($opt_isLikelyToContainHtmlChars$$) {
    return $str$$.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test($str$$)) {
    return $str$$
  }
  -1 != $str$$.indexOf("&") && ($str$$ = $str$$.replace(goog.string.amperRe_, "&amp;"));
  -1 != $str$$.indexOf("<") && ($str$$ = $str$$.replace(goog.string.ltRe_, "&lt;"));
  -1 != $str$$.indexOf(">") && ($str$$ = $str$$.replace(goog.string.gtRe_, "&gt;"));
  -1 != $str$$.indexOf('"') && ($str$$ = $str$$.replace(goog.string.quotRe_, "&quot;"));
  return $str$$
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function $goog$string$unescapeEntities$($str$$) {
  return goog.string.contains($str$$, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_($str$$) : goog.string.unescapePureXmlEntities_($str$$) : $str$$
};
goog.string.unescapeEntitiesUsingDom_ = function $goog$string$unescapeEntitiesUsingDom_$($str$$) {
  var $seen$$ = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, $div$$ = document.createElement("div");
  return $str$$.replace(goog.string.HTML_ENTITY_PATTERN_, function($s$$, $entity$$) {
    var $value$$ = $seen$$[$s$$];
    if($value$$) {
      return $value$$
    }
    if("#" == $entity$$.charAt(0)) {
      var $n$$ = Number("0" + $entity$$.substr(1));
      isNaN($n$$) || ($value$$ = String.fromCharCode($n$$))
    }
    $value$$ || ($div$$.innerHTML = $s$$ + " ", $value$$ = $div$$.firstChild.nodeValue.slice(0, -1));
    return $seen$$[$s$$] = $value$$
  })
};
goog.string.unescapePureXmlEntities_ = function $goog$string$unescapePureXmlEntities_$($str$$) {
  return $str$$.replace(/&([^;]+);/g, function($s$$, $entity$$) {
    switch($entity$$) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == $entity$$.charAt(0)) {
          var $n$$ = Number("0" + $entity$$.substr(1));
          if(!isNaN($n$$)) {
            return String.fromCharCode($n$$)
          }
        }
        return $s$$
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function $goog$string$whitespaceEscape$($str$$, $opt_xml$$) {
  return goog.string.newLineToBr($str$$.replace(/  /g, " &#160;"), $opt_xml$$)
};
goog.string.stripQuotes = function $goog$string$stripQuotes$($str$$, $quoteChars$$) {
  for(var $length$$ = $quoteChars$$.length, $i$$ = 0;$i$$ < $length$$;$i$$++) {
    var $quoteChar$$ = 1 == $length$$ ? $quoteChars$$ : $quoteChars$$.charAt($i$$);
    if($str$$.charAt(0) == $quoteChar$$ && $str$$.charAt($str$$.length - 1) == $quoteChar$$) {
      return $str$$.substring(1, $str$$.length - 1)
    }
  }
  return $str$$
};
goog.string.truncate = function $goog$string$truncate$($str$$, $chars$$, $opt_protectEscapedCharacters$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  $str$$.length > $chars$$ && ($str$$ = $str$$.substring(0, $chars$$ - 3) + "...");
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$
};
goog.string.truncateMiddle = function $goog$string$truncateMiddle$($str$$, $chars$$, $opt_protectEscapedCharacters$$, $half_opt_trailingChars$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  if($half_opt_trailingChars$$ && $str$$.length > $chars$$) {
    $half_opt_trailingChars$$ > $chars$$ && ($half_opt_trailingChars$$ = $chars$$);
    var $endPoint_endPos$$ = $str$$.length - $half_opt_trailingChars$$, $str$$ = $str$$.substring(0, $chars$$ - $half_opt_trailingChars$$) + "..." + $str$$.substring($endPoint_endPos$$)
  }else {
    $str$$.length > $chars$$ && ($half_opt_trailingChars$$ = Math.floor($chars$$ / 2), $endPoint_endPos$$ = $str$$.length - $half_opt_trailingChars$$, $str$$ = $str$$.substring(0, $half_opt_trailingChars$$ + $chars$$ % 2) + "..." + $str$$.substring($endPoint_endPos$$))
  }
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function $goog$string$quote$($s$$) {
  $s$$ = String($s$$);
  if($s$$.quote) {
    return $s$$.quote()
  }
  for(var $sb$$ = ['"'], $i$$ = 0;$i$$ < $s$$.length;$i$$++) {
    var $ch$$ = $s$$.charAt($i$$), $cc$$ = $ch$$.charCodeAt(0);
    $sb$$[$i$$ + 1] = goog.string.specialEscapeChars_[$ch$$] || (31 < $cc$$ && 127 > $cc$$ ? $ch$$ : goog.string.escapeChar($ch$$))
  }
  $sb$$.push('"');
  return $sb$$.join("")
};
goog.string.escapeString = function $goog$string$escapeString$($str$$) {
  for(var $sb$$ = [], $i$$ = 0;$i$$ < $str$$.length;$i$$++) {
    $sb$$[$i$$] = goog.string.escapeChar($str$$.charAt($i$$))
  }
  return $sb$$.join("")
};
goog.string.escapeChar = function $goog$string$escapeChar$($c$$) {
  if($c$$ in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[$c$$]
  }
  if($c$$ in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[$c$$] = goog.string.specialEscapeChars_[$c$$]
  }
  var $rv$$ = $c$$, $cc$$ = $c$$.charCodeAt(0);
  if(31 < $cc$$ && 127 > $cc$$) {
    $rv$$ = $c$$
  }else {
    if(256 > $cc$$) {
      if($rv$$ = "\\x", 16 > $cc$$ || 256 < $cc$$) {
        $rv$$ += "0"
      }
    }else {
      $rv$$ = "\\u", 4096 > $cc$$ && ($rv$$ += "0")
    }
    $rv$$ += $cc$$.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[$c$$] = $rv$$
};
goog.string.toMap = function $goog$string$toMap$($s$$) {
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $s$$.length;$i$$++) {
    $rv$$[$s$$.charAt($i$$)] = !0
  }
  return $rv$$
};
goog.string.contains = function $goog$string$contains$($s$$, $ss$$) {
  return-1 != $s$$.indexOf($ss$$)
};
goog.string.countOf = function $goog$string$countOf$($s$$, $ss$$) {
  return $s$$ && $ss$$ ? $s$$.split($ss$$).length - 1 : 0
};
goog.string.removeAt = function $goog$string$removeAt$($s$$, $index$$, $stringLength$$) {
  var $resultStr$$ = $s$$;
  0 <= $index$$ && ($index$$ < $s$$.length && 0 < $stringLength$$) && ($resultStr$$ = $s$$.substr(0, $index$$) + $s$$.substr($index$$ + $stringLength$$, $s$$.length - $index$$ - $stringLength$$));
  return $resultStr$$
};
goog.string.remove = function $goog$string$remove$($s$$, $ss$$) {
  var $re$$ = RegExp(goog.string.regExpEscape($ss$$), "");
  return $s$$.replace($re$$, "")
};
goog.string.removeAll = function $goog$string$removeAll$($s$$, $ss$$) {
  var $re$$ = RegExp(goog.string.regExpEscape($ss$$), "g");
  return $s$$.replace($re$$, "")
};
goog.string.regExpEscape = function $goog$string$regExpEscape$($s$$) {
  return String($s$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function $goog$string$repeat$($string$$, $length$$) {
  return Array($length$$ + 1).join($string$$)
};
goog.string.padNumber = function $goog$string$padNumber$($num$$4_s$$, $length$$, $index$$45_opt_precision$$) {
  $num$$4_s$$ = goog.isDef($index$$45_opt_precision$$) ? $num$$4_s$$.toFixed($index$$45_opt_precision$$) : String($num$$4_s$$);
  $index$$45_opt_precision$$ = $num$$4_s$$.indexOf(".");
  -1 == $index$$45_opt_precision$$ && ($index$$45_opt_precision$$ = $num$$4_s$$.length);
  return goog.string.repeat("0", Math.max(0, $length$$ - $index$$45_opt_precision$$)) + $num$$4_s$$
};
goog.string.makeSafe = function $goog$string$makeSafe$($obj$$) {
  return null == $obj$$ ? "" : String($obj$$)
};
goog.string.buildString = function $goog$string$buildString$($var_args$$) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function $goog$string$getRandomString$() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function $goog$string$compareVersions$($version1$$, $version2$$) {
  for(var $order_v1CompNum$$ = 0, $v1Subs$$ = goog.string.trim(String($version1$$)).split("."), $v2Subs$$ = goog.string.trim(String($version2$$)).split("."), $subCount$$ = Math.max($v1Subs$$.length, $v2Subs$$.length), $subIdx$$ = 0;0 == $order_v1CompNum$$ && $subIdx$$ < $subCount$$;$subIdx$$++) {
    var $v1Sub$$ = $v1Subs$$[$subIdx$$] || "", $v2Sub$$ = $v2Subs$$[$subIdx$$] || "", $v1CompParser$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$ = RegExp("(\\d*)(\\D*)", "g");
    do {
      var $v1Comp$$ = $v1CompParser$$.exec($v1Sub$$) || ["", "", ""], $v2Comp$$ = $v2CompParser$$.exec($v2Sub$$) || ["", "", ""];
      if(0 == $v1Comp$$[0].length && 0 == $v2Comp$$[0].length) {
        break
      }
      var $order_v1CompNum$$ = 0 == $v1Comp$$[1].length ? 0 : parseInt($v1Comp$$[1], 10), $v2CompNum$$ = 0 == $v2Comp$$[1].length ? 0 : parseInt($v2Comp$$[1], 10), $order_v1CompNum$$ = goog.string.compareElements_($order_v1CompNum$$, $v2CompNum$$) || goog.string.compareElements_(0 == $v1Comp$$[2].length, 0 == $v2Comp$$[2].length) || goog.string.compareElements_($v1Comp$$[2], $v2Comp$$[2])
    }while(0 == $order_v1CompNum$$)
  }
  return $order_v1CompNum$$
};
goog.string.compareElements_ = function $goog$string$compareElements_$($left$$, $right$$) {
  return $left$$ < $right$$ ? -1 : $left$$ > $right$$ ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function $goog$string$hashCode$($str$$) {
  for(var $result$$ = 0, $i$$ = 0;$i$$ < $str$$.length;++$i$$) {
    $result$$ = 31 * $result$$ + $str$$.charCodeAt($i$$), $result$$ %= goog.string.HASHCODE_MAX_
  }
  return $result$$
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function $goog$string$createUniqueString$() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function $goog$string$toNumber$($str$$) {
  var $num$$ = Number($str$$);
  return 0 == $num$$ && goog.string.isEmpty($str$$) ? NaN : $num$$
};
goog.string.toCamelCase = function $goog$string$toCamelCase$($str$$) {
  return String($str$$).replace(/\-([a-z])/g, function($all$$, $match$$) {
    return $match$$.toUpperCase()
  })
};
goog.string.toSelectorCase = function $goog$string$toSelectorCase$($str$$) {
  return String($str$$).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function $goog$string$toTitleCase$($str$$, $opt_delimiters$$) {
  var $delimiters$$ = goog.isString($opt_delimiters$$) ? goog.string.regExpEscape($opt_delimiters$$) : "\\s";
  return $str$$.replace(RegExp("(^" + ($delimiters$$ ? "|[" + $delimiters$$ + "]+" : "") + ")([a-z])", "g"), function($all$$, $p1$$, $p2$$) {
    return $p1$$ + $p2$$.toUpperCase()
  })
};
goog.string.parseInt = function $goog$string$parseInt$($value$$) {
  isFinite($value$$) && ($value$$ = String($value$$));
  return goog.isString($value$$) ? /^\s*-?0x/i.test($value$$) ? parseInt($value$$, 16) : parseInt($value$$, 10) : NaN
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function $goog$asserts$AssertionError$($messagePattern$$, $messageArgs$$) {
  $messageArgs$$.unshift($messagePattern$$);
  goog.debug.Error.call(this, goog.string.subs.apply(null, $messageArgs$$));
  $messageArgs$$.shift();
  this.messagePattern = $messagePattern$$
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function $goog$asserts$doAssertFailure_$($defaultMessage$$, $defaultArgs$$, $givenMessage$$, $givenArgs$$) {
  var $message$$ = "Assertion failed";
  if($givenMessage$$) {
    var $message$$ = $message$$ + (": " + $givenMessage$$), $args$$ = $givenArgs$$
  }else {
    $defaultMessage$$ && ($message$$ += ": " + $defaultMessage$$, $args$$ = $defaultArgs$$)
  }
  throw new goog.asserts.AssertionError("" + $message$$, $args$$ || []);
};
goog.asserts.assert = function $goog$asserts$assert$($condition$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !$condition$$ && goog.asserts.doAssertFailure_("", null, $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $condition$$
};
goog.asserts.fail = function $goog$asserts$fail$($opt_message$$, $var_args$$) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + ($opt_message$$ ? ": " + $opt_message$$ : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function $goog$asserts$assertNumber$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber($value$$) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertString = function $goog$asserts$assertString$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString($value$$) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertFunction = function $goog$asserts$assertFunction$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction($value$$) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertObject = function $goog$asserts$assertObject$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject($value$$) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertArray = function $goog$asserts$assertArray$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray($value$$) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertBoolean = function $goog$asserts$assertBoolean$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean($value$$) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertInstanceof = function $goog$asserts$assertInstanceof$($value$$, $type$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !($value$$ instanceof $type$$) && goog.asserts.doAssertFailure_("instanceof check failed.", null, $opt_message$$, Array.prototype.slice.call(arguments, 3));
  return $value$$
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function $goog$array$peek$($array$$) {
  return $array$$[$array$$.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call($arr$$, $obj$$, $opt_fromIndex$$)
} : function($arr$$, $obj$$, $fromIndex_i$$16_opt_fromIndex$$) {
  $fromIndex_i$$16_opt_fromIndex$$ = null == $fromIndex_i$$16_opt_fromIndex$$ ? 0 : 0 > $fromIndex_i$$16_opt_fromIndex$$ ? Math.max(0, $arr$$.length + $fromIndex_i$$16_opt_fromIndex$$) : $fromIndex_i$$16_opt_fromIndex$$;
  if(goog.isString($arr$$)) {
    return!goog.isString($obj$$) || 1 != $obj$$.length ? -1 : $arr$$.indexOf($obj$$, $fromIndex_i$$16_opt_fromIndex$$)
  }
  for(;$fromIndex_i$$16_opt_fromIndex$$ < $arr$$.length;$fromIndex_i$$16_opt_fromIndex$$++) {
    if($fromIndex_i$$16_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex_i$$16_opt_fromIndex$$] === $obj$$) {
      return $fromIndex_i$$16_opt_fromIndex$$
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call($arr$$, $obj$$, null == $opt_fromIndex$$ ? $arr$$.length - 1 : $opt_fromIndex$$)
} : function($arr$$, $obj$$, $fromIndex$$2_i$$17_opt_fromIndex$$) {
  $fromIndex$$2_i$$17_opt_fromIndex$$ = null == $fromIndex$$2_i$$17_opt_fromIndex$$ ? $arr$$.length - 1 : $fromIndex$$2_i$$17_opt_fromIndex$$;
  0 > $fromIndex$$2_i$$17_opt_fromIndex$$ && ($fromIndex$$2_i$$17_opt_fromIndex$$ = Math.max(0, $arr$$.length + $fromIndex$$2_i$$17_opt_fromIndex$$));
  if(goog.isString($arr$$)) {
    return!goog.isString($obj$$) || 1 != $obj$$.length ? -1 : $arr$$.lastIndexOf($obj$$, $fromIndex$$2_i$$17_opt_fromIndex$$)
  }
  for(;0 <= $fromIndex$$2_i$$17_opt_fromIndex$$;$fromIndex$$2_i$$17_opt_fromIndex$$--) {
    if($fromIndex$$2_i$$17_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex$$2_i$$17_opt_fromIndex$$] === $obj$$) {
      return $fromIndex$$2_i$$17_opt_fromIndex$$
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    $i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)
  }
};
goog.array.forEachRight = function $goog$array$forEachRight$($arr$$, $f$$, $opt_obj$$) {
  for(var $i$$19_l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$19_l$$ = $i$$19_l$$ - 1;0 <= $i$$19_l$$;--$i$$19_l$$) {
    $i$$19_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$19_l$$], $i$$19_l$$, $arr$$)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $res$$ = [], $resLength$$ = 0, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$) {
      var $val$$ = $arr2$$[$i$$];
      $f$$.call($opt_obj$$, $val$$, $i$$, $arr$$) && ($res$$[$resLength$$++] = $val$$)
    }
  }
  return $res$$
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $res$$ = Array($l$$), $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    $i$$ in $arr2$$ && ($res$$[$i$$] = $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$))
  }
  return $res$$
};
goog.array.reduce = function $goog$array$reduce$($arr$$, $f$$, $val$$0$$, $opt_obj$$) {
  if($arr$$.reduce) {
    return $opt_obj$$ ? $arr$$.reduce(goog.bind($f$$, $opt_obj$$), $val$$0$$) : $arr$$.reduce($f$$, $val$$0$$)
  }
  var $rval$$ = $val$$0$$;
  goog.array.forEach($arr$$, function($val$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$, $index$$, $arr$$)
  });
  return $rval$$
};
goog.array.reduceRight = function $goog$array$reduceRight$($arr$$, $f$$, $val$$0$$, $opt_obj$$) {
  if($arr$$.reduceRight) {
    return $opt_obj$$ ? $arr$$.reduceRight(goog.bind($f$$, $opt_obj$$), $val$$0$$) : $arr$$.reduceRight($f$$, $val$$0$$)
  }
  var $rval$$ = $val$$0$$;
  goog.array.forEachRight($arr$$, function($val$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$, $index$$, $arr$$)
  });
  return $rval$$
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && !$f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function $goog$array$find$($arr$$, $f$$13_i$$, $opt_obj$$) {
  $f$$13_i$$ = goog.array.findIndex($arr$$, $f$$13_i$$, $opt_obj$$);
  return 0 > $f$$13_i$$ ? null : goog.isString($arr$$) ? $arr$$.charAt($f$$13_i$$) : $arr$$[$f$$13_i$$]
};
goog.array.findIndex = function $goog$array$findIndex$($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return $i$$
    }
  }
  return-1
};
goog.array.findRight = function $goog$array$findRight$($arr$$, $f$$15_i$$, $opt_obj$$) {
  $f$$15_i$$ = goog.array.findIndexRight($arr$$, $f$$15_i$$, $opt_obj$$);
  return 0 > $f$$15_i$$ ? null : goog.isString($arr$$) ? $arr$$.charAt($f$$15_i$$) : $arr$$[$f$$15_i$$]
};
goog.array.findIndexRight = function $goog$array$findIndexRight$($arr$$, $f$$, $opt_obj$$) {
  for(var $i$$27_l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$27_l$$ = $i$$27_l$$ - 1;0 <= $i$$27_l$$;$i$$27_l$$--) {
    if($i$$27_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$27_l$$], $i$$27_l$$, $arr$$)) {
      return $i$$27_l$$
    }
  }
  return-1
};
goog.array.contains = function $goog$array$contains$($arr$$, $obj$$) {
  return 0 <= goog.array.indexOf($arr$$, $obj$$)
};
goog.array.isEmpty = function $goog$array$isEmpty$($arr$$) {
  return 0 == $arr$$.length
};
goog.array.clear = function $goog$array$clear$($arr$$) {
  if(!goog.isArray($arr$$)) {
    for(var $i$$ = $arr$$.length - 1;0 <= $i$$;$i$$--) {
      delete $arr$$[$i$$]
    }
  }
  $arr$$.length = 0
};
goog.array.insert = function $goog$array$insert$($arr$$, $obj$$) {
  goog.array.contains($arr$$, $obj$$) || $arr$$.push($obj$$)
};
goog.array.insertAt = function $goog$array$insertAt$($arr$$, $obj$$, $opt_i$$) {
  goog.array.splice($arr$$, $opt_i$$, 0, $obj$$)
};
goog.array.insertArrayAt = function $goog$array$insertArrayAt$($arr$$, $elementsToAdd$$, $opt_i$$) {
  goog.partial(goog.array.splice, $arr$$, $opt_i$$, 0).apply(null, $elementsToAdd$$)
};
goog.array.insertBefore = function $goog$array$insertBefore$($arr$$, $obj$$, $opt_obj2$$) {
  var $i$$;
  2 == arguments.length || 0 > ($i$$ = goog.array.indexOf($arr$$, $opt_obj2$$)) ? $arr$$.push($obj$$) : goog.array.insertAt($arr$$, $obj$$, $i$$)
};
goog.array.remove = function $goog$array$remove$($arr$$, $obj$$) {
  var $i$$ = goog.array.indexOf($arr$$, $obj$$), $rv$$;
  ($rv$$ = 0 <= $i$$) && goog.array.removeAt($arr$$, $i$$);
  return $rv$$
};
goog.array.removeAt = function $goog$array$removeAt$($arr$$, $i$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call($arr$$, $i$$, 1).length
};
goog.array.removeIf = function $goog$array$removeIf$($arr$$, $f$$17_i$$, $opt_obj$$) {
  $f$$17_i$$ = goog.array.findIndex($arr$$, $f$$17_i$$, $opt_obj$$);
  return 0 <= $f$$17_i$$ ? (goog.array.removeAt($arr$$, $f$$17_i$$), !0) : !1
};
goog.array.concat = function $goog$array$concat$($var_args$$) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function $goog$array$toArray$($object$$) {
  var $length$$ = $object$$.length;
  if(0 < $length$$) {
    for(var $rv$$ = Array($length$$), $i$$ = 0;$i$$ < $length$$;$i$$++) {
      $rv$$[$i$$] = $object$$[$i$$]
    }
    return $rv$$
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function $goog$array$extend$($arr1$$, $var_args$$) {
  for(var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    var $arr2$$ = arguments[$i$$], $isArrayLike$$;
    if(goog.isArray($arr2$$) || ($isArrayLike$$ = goog.isArrayLike($arr2$$)) && $arr2$$.hasOwnProperty("callee")) {
      $arr1$$.push.apply($arr1$$, $arr2$$)
    }else {
      if($isArrayLike$$) {
        for(var $len1$$ = $arr1$$.length, $len2$$ = $arr2$$.length, $j$$ = 0;$j$$ < $len2$$;$j$$++) {
          $arr1$$[$len1$$ + $j$$] = $arr2$$[$j$$]
        }
      }else {
        $arr1$$.push($arr2$$)
      }
    }
  }
};
goog.array.splice = function $goog$array$splice$($arr$$, $index$$, $howMany$$, $var_args$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply($arr$$, goog.array.slice(arguments, 1))
};
goog.array.slice = function $goog$array$slice$($arr$$, $start$$, $opt_end$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call($arr$$, $start$$) : goog.array.ARRAY_PROTOTYPE_.slice.call($arr$$, $start$$, $opt_end$$)
};
goog.array.removeDuplicates = function $goog$array$removeDuplicates$($arr$$, $opt_rv$$) {
  for(var $returnArray$$ = $opt_rv$$ || $arr$$, $seen$$ = {}, $cursorInsert$$ = 0, $cursorRead$$ = 0;$cursorRead$$ < $arr$$.length;) {
    var $current$$ = $arr$$[$cursorRead$$++], $key$$ = goog.isObject($current$$) ? "o" + goog.getUid($current$$) : (typeof $current$$).charAt(0) + $current$$;
    Object.prototype.hasOwnProperty.call($seen$$, $key$$) || ($seen$$[$key$$] = !0, $returnArray$$[$cursorInsert$$++] = $current$$)
  }
  $returnArray$$.length = $cursorInsert$$
};
goog.array.binarySearch = function $goog$array$binarySearch$($arr$$, $target$$, $opt_compareFn$$) {
  return goog.array.binarySearch_($arr$$, $opt_compareFn$$ || goog.array.defaultCompare, !1, $target$$)
};
goog.array.binarySelect = function $goog$array$binarySelect$($arr$$, $evaluator$$, $opt_obj$$) {
  return goog.array.binarySearch_($arr$$, $evaluator$$, !0, void 0, $opt_obj$$)
};
goog.array.binarySearch_ = function $goog$array$binarySearch_$($arr$$, $compareFn$$, $isEvaluator$$, $opt_target$$, $opt_selfObj$$) {
  for(var $left$$ = 0, $right$$ = $arr$$.length, $found$$;$left$$ < $right$$;) {
    var $middle$$ = $left$$ + $right$$ >> 1, $compareResult$$;
    $compareResult$$ = $isEvaluator$$ ? $compareFn$$.call($opt_selfObj$$, $arr$$[$middle$$], $middle$$, $arr$$) : $compareFn$$($opt_target$$, $arr$$[$middle$$]);
    0 < $compareResult$$ ? $left$$ = $middle$$ + 1 : ($right$$ = $middle$$, $found$$ = !$compareResult$$)
  }
  return $found$$ ? $left$$ : ~$left$$
};
goog.array.sort = function $goog$array$sort$($arr$$, $opt_compareFn$$) {
  goog.asserts.assert(null != $arr$$.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call($arr$$, $opt_compareFn$$ || goog.array.defaultCompare)
};
goog.array.stableSort = function $goog$array$stableSort$($arr$$, $opt_compareFn$$) {
  for(var $i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
    $arr$$[$i$$] = {index:$i$$, value:$arr$$[$i$$]}
  }
  var $valueCompareFn$$ = $opt_compareFn$$ || goog.array.defaultCompare;
  goog.array.sort($arr$$, function stableCompareFn($obj1$$, $obj2$$) {
    return $valueCompareFn$$($obj1$$.value, $obj2$$.value) || $obj1$$.index - $obj2$$.index
  });
  for($i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
    $arr$$[$i$$] = $arr$$[$i$$].value
  }
};
goog.array.sortObjectsByKey = function $goog$array$sortObjectsByKey$($arr$$, $key$$, $opt_compareFn$$) {
  var $compare$$ = $opt_compareFn$$ || goog.array.defaultCompare;
  goog.array.sort($arr$$, function($a$$, $b$$) {
    return $compare$$($a$$[$key$$], $b$$[$key$$])
  })
};
goog.array.isSorted = function $goog$array$isSorted$($arr$$, $compare$$1_opt_compareFn$$, $opt_strict$$) {
  for(var $compare$$1_opt_compareFn$$ = $compare$$1_opt_compareFn$$ || goog.array.defaultCompare, $i$$ = 1;$i$$ < $arr$$.length;$i$$++) {
    var $compareResult$$ = $compare$$1_opt_compareFn$$($arr$$[$i$$ - 1], $arr$$[$i$$]);
    if(0 < $compareResult$$ || 0 == $compareResult$$ && $opt_strict$$) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function $goog$array$equals$($arr1$$, $arr2$$, $equalsFn_opt_equalsFn$$) {
  if(!goog.isArrayLike($arr1$$) || !goog.isArrayLike($arr2$$) || $arr1$$.length != $arr2$$.length) {
    return!1
  }
  for(var $l$$ = $arr1$$.length, $equalsFn_opt_equalsFn$$ = $equalsFn_opt_equalsFn$$ || goog.array.defaultCompareEquality, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if(!$equalsFn_opt_equalsFn$$($arr1$$[$i$$], $arr2$$[$i$$])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function $goog$array$compare$($arr1$$, $arr2$$, $opt_equalsFn$$) {
  return goog.array.equals($arr1$$, $arr2$$, $opt_equalsFn$$)
};
goog.array.compare3 = function $goog$array$compare3$($arr1$$, $arr2$$, $compare$$2_opt_compareFn$$) {
  for(var $compare$$2_opt_compareFn$$ = $compare$$2_opt_compareFn$$ || goog.array.defaultCompare, $l$$ = Math.min($arr1$$.length, $arr2$$.length), $i$$ = 0;$i$$ < $l$$;$i$$++) {
    var $result$$ = $compare$$2_opt_compareFn$$($arr1$$[$i$$], $arr2$$[$i$$]);
    if(0 != $result$$) {
      return $result$$
    }
  }
  return goog.array.defaultCompare($arr1$$.length, $arr2$$.length)
};
goog.array.defaultCompare = function $goog$array$defaultCompare$($a$$, $b$$) {
  return $a$$ > $b$$ ? 1 : $a$$ < $b$$ ? -1 : 0
};
goog.array.defaultCompareEquality = function $goog$array$defaultCompareEquality$($a$$, $b$$) {
  return $a$$ === $b$$
};
goog.array.binaryInsert = function $goog$array$binaryInsert$($array$$, $value$$, $index$$49_opt_compareFn$$) {
  $index$$49_opt_compareFn$$ = goog.array.binarySearch($array$$, $value$$, $index$$49_opt_compareFn$$);
  return 0 > $index$$49_opt_compareFn$$ ? (goog.array.insertAt($array$$, $value$$, -($index$$49_opt_compareFn$$ + 1)), !0) : !1
};
goog.array.binaryRemove = function $goog$array$binaryRemove$($array$$, $index$$50_value$$, $opt_compareFn$$) {
  $index$$50_value$$ = goog.array.binarySearch($array$$, $index$$50_value$$, $opt_compareFn$$);
  return 0 <= $index$$50_value$$ ? goog.array.removeAt($array$$, $index$$50_value$$) : !1
};
goog.array.bucket = function $goog$array$bucket$($array$$, $sorter$$) {
  for(var $buckets$$ = {}, $i$$ = 0;$i$$ < $array$$.length;$i$$++) {
    var $value$$ = $array$$[$i$$], $key$$ = $sorter$$($value$$, $i$$, $array$$);
    goog.isDef($key$$) && ($buckets$$[$key$$] || ($buckets$$[$key$$] = [])).push($value$$)
  }
  return $buckets$$
};
goog.array.toObject = function $goog$array$toObject$($arr$$, $keyFunc$$, $opt_obj$$) {
  var $ret$$ = {};
  goog.array.forEach($arr$$, function($element$$, $index$$) {
    $ret$$[$keyFunc$$.call($opt_obj$$, $element$$, $index$$, $arr$$)] = $element$$
  });
  return $ret$$
};
goog.array.repeat = function $goog$array$repeat$($value$$, $n$$) {
  for(var $array$$ = [], $i$$ = 0;$i$$ < $n$$;$i$$++) {
    $array$$[$i$$] = $value$$
  }
  return $array$$
};
goog.array.flatten = function $goog$array$flatten$($var_args$$) {
  for(var $result$$ = [], $i$$ = 0;$i$$ < arguments.length;$i$$++) {
    var $element$$ = arguments[$i$$];
    goog.isArray($element$$) ? $result$$.push.apply($result$$, goog.array.flatten.apply(null, $element$$)) : $result$$.push($element$$)
  }
  return $result$$
};
goog.array.rotate = function $goog$array$rotate$($array$$, $n$$) {
  goog.asserts.assert(null != $array$$.length);
  $array$$.length && ($n$$ %= $array$$.length, 0 < $n$$ ? goog.array.ARRAY_PROTOTYPE_.unshift.apply($array$$, $array$$.splice(-$n$$, $n$$)) : 0 > $n$$ && goog.array.ARRAY_PROTOTYPE_.push.apply($array$$, $array$$.splice(0, -$n$$)));
  return $array$$
};
goog.array.zip = function $goog$array$zip$($var_args$$) {
  if(!arguments.length) {
    return[]
  }
  for(var $result$$ = [], $i$$ = 0;;$i$$++) {
    for(var $value$$ = [], $j$$ = 0;$j$$ < arguments.length;$j$$++) {
      var $arr$$ = arguments[$j$$];
      if($i$$ >= $arr$$.length) {
        return $result$$
      }
      $value$$.push($arr$$[$i$$])
    }
    $result$$.push($value$$)
  }
};
goog.array.shuffle = function $goog$array$shuffle$($arr$$, $opt_randFn$$) {
  for(var $randFn$$ = $opt_randFn$$ || Math.random, $i$$ = $arr$$.length - 1;0 < $i$$;$i$$--) {
    var $j$$ = Math.floor($randFn$$() * ($i$$ + 1)), $tmp$$ = $arr$$[$i$$];
    $arr$$[$i$$] = $arr$$[$j$$];
    $arr$$[$j$$] = $tmp$$
  }
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function $goog$userAgent$getUserAgentString$() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function $goog$userAgent$getNavigator$() {
  return goog.global.navigator
};
goog.userAgent.init_ = function $goog$userAgent$init_$() {
  goog.userAgent.detectedOpera_ = !1;
  goog.userAgent.detectedIe_ = !1;
  goog.userAgent.detectedWebkit_ = !1;
  goog.userAgent.detectedMobile_ = !1;
  goog.userAgent.detectedGecko_ = !1;
  var $ua$$;
  if(!goog.userAgent.BROWSER_KNOWN_ && ($ua$$ = goog.userAgent.getUserAgentString())) {
    var $navigator$$ = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = 0 == $ua$$.indexOf("Opera");
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && -1 != $ua$$.indexOf("MSIE");
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && -1 != $ua$$.indexOf("WebKit");
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && -1 != $ua$$.indexOf("Mobile");
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && "Gecko" == $navigator$$.product
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function $goog$userAgent$determinePlatform_$() {
  var $navigator$$ = goog.userAgent.getNavigator();
  return $navigator$$ && $navigator$$.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function $goog$userAgent$initPlatform_$() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function $goog$userAgent$determineVersion_$() {
  var $arr$$54_operaVersion_version$$ = "", $docMode_re$$;
  goog.userAgent.OPERA && goog.global.opera ? ($arr$$54_operaVersion_version$$ = goog.global.opera.version, $arr$$54_operaVersion_version$$ = "function" == typeof $arr$$54_operaVersion_version$$ ? $arr$$54_operaVersion_version$$() : $arr$$54_operaVersion_version$$) : (goog.userAgent.GECKO ? $docMode_re$$ = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? $docMode_re$$ = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && ($docMode_re$$ = /WebKit\/(\S+)/), $docMode_re$$ && ($arr$$54_operaVersion_version$$ = 
  ($arr$$54_operaVersion_version$$ = $docMode_re$$.exec(goog.userAgent.getUserAgentString())) ? $arr$$54_operaVersion_version$$[1] : ""));
  return goog.userAgent.IE && ($docMode_re$$ = goog.userAgent.getDocumentMode_(), $docMode_re$$ > parseFloat($arr$$54_operaVersion_version$$)) ? String($docMode_re$$) : $arr$$54_operaVersion_version$$
};
goog.userAgent.getDocumentMode_ = function $goog$userAgent$getDocumentMode_$() {
  var $doc$$ = goog.global.document;
  return $doc$$ ? $doc$$.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function $goog$userAgent$compare$($v1$$, $v2$$) {
  return goog.string.compareVersions($v1$$, $v2$$)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function $goog$userAgent$isVersion$($version$$) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionCache_[$version$$] || (goog.userAgent.isVersionCache_[$version$$] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, $version$$))
};
goog.userAgent.isDocumentModeCache_ = {};
goog.userAgent.isDocumentMode = function $goog$userAgent$isDocumentMode$($documentMode$$) {
  return goog.userAgent.isDocumentModeCache_[$documentMode$$] || (goog.userAgent.isDocumentModeCache_[$documentMode$$] = goog.userAgent.IE && !!document.documentMode && document.documentMode >= $documentMode$$)
};
goog.dom = {};
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentMode(9) || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT, INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", ARTICLE:"ARTICLE", ASIDE:"ASIDE", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDI:"BDI", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", COMMAND:"COMMAND", DATA:"DATA", DATALIST:"DATALIST", DD:"DD", DEL:"DEL", DETAILS:"DETAILS", DFN:"DFN", 
DIALOG:"DIALOG", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", EMBED:"EMBED", FIELDSET:"FIELDSET", FIGCAPTION:"FIGCAPTION", FIGURE:"FIGURE", FONT:"FONT", FOOTER:"FOOTER", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HEADER:"HEADER", HGROUP:"HGROUP", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", KEYGEN:"KEYGEN", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", 
MAP:"MAP", MARK:"MARK", MATH:"MATH", MENU:"MENU", META:"META", METER:"METER", NAV:"NAV", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", OUTPUT:"OUTPUT", P:"P", PARAM:"PARAM", PRE:"PRE", PROGRESS:"PROGRESS", Q:"Q", RP:"RP", RT:"RT", RUBY:"RUBY", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SECTION:"SECTION", SELECT:"SELECT", SMALL:"SMALL", SOURCE:"SOURCE", SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUMMARY:"SUMMARY", 
SUP:"SUP", SVG:"SVG", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TIME:"TIME", TITLE:"TITLE", TR:"TR", TRACK:"TRACK", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO", WBR:"WBR"};
goog.dom.classes = {};
goog.dom.classes.set = function $goog$dom$classes$set$($element$$, $className$$) {
  $element$$.className = $className$$
};
goog.dom.classes.get = function $goog$dom$classes$get$($className$$4_element$$) {
  $className$$4_element$$ = $className$$4_element$$.className;
  return goog.isString($className$$4_element$$) && $className$$4_element$$.match(/\S+/g) || []
};
goog.dom.classes.add = function $goog$dom$classes$add$($element$$, $var_args$$) {
  var $classes$$ = goog.dom.classes.get($element$$), $args$$ = goog.array.slice(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$.length;
  goog.dom.classes.add_($classes$$, $args$$);
  $element$$.className = $classes$$.join(" ");
  return $classes$$.length == $expectedCount$$
};
goog.dom.classes.remove = function $goog$dom$classes$remove$($element$$, $var_args$$) {
  var $classes$$ = goog.dom.classes.get($element$$), $args$$ = goog.array.slice(arguments, 1), $newClasses$$ = goog.dom.classes.getDifference_($classes$$, $args$$);
  $element$$.className = $newClasses$$.join(" ");
  return $newClasses$$.length == $classes$$.length - $args$$.length
};
goog.dom.classes.add_ = function $goog$dom$classes$add_$($classes$$, $args$$) {
  for(var $i$$ = 0;$i$$ < $args$$.length;$i$$++) {
    goog.array.contains($classes$$, $args$$[$i$$]) || $classes$$.push($args$$[$i$$])
  }
};
goog.dom.classes.getDifference_ = function $goog$dom$classes$getDifference_$($arr1$$, $arr2$$) {
  return goog.array.filter($arr1$$, function($item$$) {
    return!goog.array.contains($arr2$$, $item$$)
  })
};
goog.dom.classes.swap = function $goog$dom$classes$swap$($element$$, $fromClass$$, $toClass$$) {
  for(var $classes$$ = goog.dom.classes.get($element$$), $removed$$ = !1, $i$$ = 0;$i$$ < $classes$$.length;$i$$++) {
    $classes$$[$i$$] == $fromClass$$ && (goog.array.splice($classes$$, $i$$--, 1), $removed$$ = !0)
  }
  $removed$$ && ($classes$$.push($toClass$$), $element$$.className = $classes$$.join(" "));
  return $removed$$
};
goog.dom.classes.addRemove = function $goog$dom$classes$addRemove$($element$$, $classesToRemove$$, $classesToAdd$$) {
  var $classes$$ = goog.dom.classes.get($element$$);
  goog.isString($classesToRemove$$) ? goog.array.remove($classes$$, $classesToRemove$$) : goog.isArray($classesToRemove$$) && ($classes$$ = goog.dom.classes.getDifference_($classes$$, $classesToRemove$$));
  goog.isString($classesToAdd$$) && !goog.array.contains($classes$$, $classesToAdd$$) ? $classes$$.push($classesToAdd$$) : goog.isArray($classesToAdd$$) && goog.dom.classes.add_($classes$$, $classesToAdd$$);
  $element$$.className = $classes$$.join(" ")
};
goog.dom.classes.has = function $goog$dom$classes$has$($element$$, $className$$) {
  return goog.array.contains(goog.dom.classes.get($element$$), $className$$)
};
goog.dom.classes.enable = function $goog$dom$classes$enable$($element$$, $className$$, $enabled$$) {
  $enabled$$ ? goog.dom.classes.add($element$$, $className$$) : goog.dom.classes.remove($element$$, $className$$)
};
goog.dom.classes.toggle = function $goog$dom$classes$toggle$($element$$, $className$$) {
  var $add$$ = !goog.dom.classes.has($element$$, $className$$);
  goog.dom.classes.enable($element$$, $className$$, $add$$);
  return $add$$
};
goog.math = {};
goog.math.randomInt = function $goog$math$randomInt$($a$$) {
  return Math.floor(Math.random() * $a$$)
};
goog.math.uniformRandom = function $goog$math$uniformRandom$($a$$, $b$$) {
  return $a$$ + Math.random() * ($b$$ - $a$$)
};
goog.math.clamp = function $goog$math$clamp$($value$$, $min$$, $max$$) {
  return Math.min(Math.max($value$$, $min$$), $max$$)
};
goog.math.modulo = function $goog$math$modulo$($a$$, $b$$) {
  var $r$$ = $a$$ % $b$$;
  return 0 > $r$$ * $b$$ ? $r$$ + $b$$ : $r$$
};
goog.math.lerp = function $goog$math$lerp$($a$$, $b$$, $x$$) {
  return $a$$ + $x$$ * ($b$$ - $a$$)
};
goog.math.nearlyEquals = function $goog$math$nearlyEquals$($a$$, $b$$, $opt_tolerance$$) {
  return Math.abs($a$$ - $b$$) <= ($opt_tolerance$$ || 1E-6)
};
goog.math.standardAngle = function $goog$math$standardAngle$($angle$$) {
  return goog.math.modulo($angle$$, 360)
};
goog.math.toRadians = function $goog$math$toRadians$($angleDegrees$$) {
  return $angleDegrees$$ * Math.PI / 180
};
goog.math.toDegrees = function $goog$math$toDegrees$($angleRadians$$) {
  return 180 * $angleRadians$$ / Math.PI
};
goog.math.angleDx = function $goog$math$angleDx$($degrees$$, $radius$$) {
  return $radius$$ * Math.cos(goog.math.toRadians($degrees$$))
};
goog.math.angleDy = function $goog$math$angleDy$($degrees$$, $radius$$) {
  return $radius$$ * Math.sin(goog.math.toRadians($degrees$$))
};
goog.math.angle = function $goog$math$angle$($x1$$, $y1$$, $x2$$, $y2$$) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2($y2$$ - $y1$$, $x2$$ - $x1$$)))
};
goog.math.angleDifference = function $goog$math$angleDifference$($startAngle$$, $endAngle$$) {
  var $d$$ = goog.math.standardAngle($endAngle$$) - goog.math.standardAngle($startAngle$$);
  180 < $d$$ ? $d$$ -= 360 : -180 >= $d$$ && ($d$$ = 360 + $d$$);
  return $d$$
};
goog.math.sign = function $goog$math$sign$($x$$) {
  return 0 == $x$$ ? 0 : 0 > $x$$ ? -1 : 1
};
goog.math.longestCommonSubsequence = function $goog$math$longestCommonSubsequence$($array1$$, $array2$$, $compare$$3_opt_compareFn$$, $collect_opt_collectorFn$$) {
  for(var $compare$$3_opt_compareFn$$ = $compare$$3_opt_compareFn$$ || function($a$$, $b$$) {
    return $a$$ == $b$$
  }, $collect_opt_collectorFn$$ = $collect_opt_collectorFn$$ || function($i1$$) {
    return $array1$$[$i1$$]
  }, $length1$$ = $array1$$.length, $length2$$ = $array2$$.length, $arr$$ = [], $i$$ = 0;$i$$ < $length1$$ + 1;$i$$++) {
    $arr$$[$i$$] = [], $arr$$[$i$$][0] = 0
  }
  for(var $j$$ = 0;$j$$ < $length2$$ + 1;$j$$++) {
    $arr$$[0][$j$$] = 0
  }
  for($i$$ = 1;$i$$ <= $length1$$;$i$$++) {
    for($j$$ = 1;$j$$ <= $length1$$;$j$$++) {
      $arr$$[$i$$][$j$$] = $compare$$3_opt_compareFn$$($array1$$[$i$$ - 1], $array2$$[$j$$ - 1]) ? $arr$$[$i$$ - 1][$j$$ - 1] + 1 : Math.max($arr$$[$i$$ - 1][$j$$], $arr$$[$i$$][$j$$ - 1])
    }
  }
  for(var $result$$ = [], $i$$ = $length1$$, $j$$ = $length2$$;0 < $i$$ && 0 < $j$$;) {
    $compare$$3_opt_compareFn$$($array1$$[$i$$ - 1], $array2$$[$j$$ - 1]) ? ($result$$.unshift($collect_opt_collectorFn$$($i$$ - 1, $j$$ - 1)), $i$$--, $j$$--) : $arr$$[$i$$ - 1][$j$$] > $arr$$[$i$$][$j$$ - 1] ? $i$$-- : $j$$--
  }
  return $result$$
};
goog.math.sum = function $goog$math$sum$($var_args$$) {
  return goog.array.reduce(arguments, function($sum$$, $value$$) {
    return $sum$$ + $value$$
  }, 0)
};
goog.math.average = function $goog$math$average$($var_args$$) {
  return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.standardDeviation = function $goog$math$standardDeviation$($var_args$$) {
  var $sampleSize_variance$$ = arguments.length;
  if(2 > $sampleSize_variance$$) {
    return 0
  }
  var $mean$$ = goog.math.average.apply(null, arguments), $sampleSize_variance$$ = goog.math.sum.apply(null, goog.array.map(arguments, function($val$$) {
    return Math.pow($val$$ - $mean$$, 2)
  })) / ($sampleSize_variance$$ - 1);
  return Math.sqrt($sampleSize_variance$$)
};
goog.math.isInt = function $goog$math$isInt$($num$$) {
  return isFinite($num$$) && 0 == $num$$ % 1
};
goog.math.isFiniteNumber = function $goog$math$isFiniteNumber$($num$$) {
  return isFinite($num$$) && !isNaN($num$$)
};
goog.math.Coordinate = function $goog$math$Coordinate$($opt_x$$, $opt_y$$) {
  this.x = goog.isDef($opt_x$$) ? $opt_x$$ : 0;
  this.y = goog.isDef($opt_y$$) ? $opt_y$$ : 0
};
goog.math.Coordinate.prototype.clone = function $goog$math$Coordinate$$clone$() {
  return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function $goog$math$Coordinate$$toString$() {
  return"(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function $goog$math$Coordinate$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : !$a$$ || !$b$$ ? !1 : $a$$.x == $b$$.x && $a$$.y == $b$$.y
};
goog.math.Coordinate.distance = function $goog$math$Coordinate$distance$($a$$, $b$$) {
  var $dx$$ = $a$$.x - $b$$.x, $dy$$ = $a$$.y - $b$$.y;
  return Math.sqrt($dx$$ * $dx$$ + $dy$$ * $dy$$)
};
goog.math.Coordinate.magnitude = function $goog$math$Coordinate$magnitude$($a$$) {
  return Math.sqrt($a$$.x * $a$$.x + $a$$.y * $a$$.y)
};
goog.math.Coordinate.azimuth = function $goog$math$Coordinate$azimuth$($a$$) {
  return goog.math.angle(0, 0, $a$$.x, $a$$.y)
};
goog.math.Coordinate.squaredDistance = function $goog$math$Coordinate$squaredDistance$($a$$, $b$$) {
  var $dx$$ = $a$$.x - $b$$.x, $dy$$ = $a$$.y - $b$$.y;
  return $dx$$ * $dx$$ + $dy$$ * $dy$$
};
goog.math.Coordinate.difference = function $goog$math$Coordinate$difference$($a$$, $b$$) {
  return new goog.math.Coordinate($a$$.x - $b$$.x, $a$$.y - $b$$.y)
};
goog.math.Coordinate.sum = function $goog$math$Coordinate$sum$($a$$, $b$$) {
  return new goog.math.Coordinate($a$$.x + $b$$.x, $a$$.y + $b$$.y)
};
goog.math.Size = function $goog$math$Size$($width$$, $height$$) {
  this.width = $width$$;
  this.height = $height$$
};
goog.math.Size.equals = function $goog$math$Size$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : !$a$$ || !$b$$ ? !1 : $a$$.width == $b$$.width && $a$$.height == $b$$.height
};
goog.math.Size.prototype.clone = function $goog$math$Size$$clone$() {
  return new goog.math.Size(this.width, this.height)
};
goog.DEBUG && (goog.math.Size.prototype.toString = function $goog$math$Size$$toString$() {
  return"(" + this.width + " x " + this.height + ")"
});
goog.math.Size.prototype.getLongest = function $goog$math$Size$$getLongest$() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function $goog$math$Size$$getShortest$() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function $goog$math$Size$$area$() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function $goog$math$Size$$perimeter$() {
  return 2 * (this.width + this.height)
};
goog.math.Size.prototype.aspectRatio = function $goog$math$Size$$aspectRatio$() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function $goog$math$Size$$isEmpty$() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function $goog$math$Size$$ceil$() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function $goog$math$Size$$fitsInside$($target$$) {
  return this.width <= $target$$.width && this.height <= $target$$.height
};
goog.math.Size.prototype.floor = function $goog$math$Size$$floor$() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function $goog$math$Size$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function $goog$math$Size$$scale$($s$$) {
  this.width *= $s$$;
  this.height *= $s$$;
  return this
};
goog.math.Size.prototype.scaleToFit = function $goog$math$Size$$scaleToFit$($s$$15_target$$) {
  $s$$15_target$$ = this.aspectRatio() > $s$$15_target$$.aspectRatio() ? $s$$15_target$$.width / this.width : $s$$15_target$$.height / this.height;
  return this.scale($s$$15_target$$)
};
goog.object = {};
goog.object.forEach = function $goog$object$forEach$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)
  }
};
goog.object.filter = function $goog$object$filter$($obj$$, $f$$, $opt_obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$) && ($res$$[$key$$] = $obj$$[$key$$])
  }
  return $res$$
};
goog.object.map = function $goog$object$map$($obj$$, $f$$, $opt_obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$key$$] = $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)
  }
  return $res$$
};
goog.object.some = function $goog$object$some$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    if($f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function $goog$object$every$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    if(!$f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function $goog$object$getCount$($obj$$) {
  var $rv$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $rv$$++
  }
  return $rv$$
};
goog.object.getAnyKey = function $goog$object$getAnyKey$($obj$$) {
  for(var $key$$ in $obj$$) {
    return $key$$
  }
};
goog.object.getAnyValue = function $goog$object$getAnyValue$($obj$$) {
  for(var $key$$ in $obj$$) {
    return $obj$$[$key$$]
  }
};
goog.object.contains = function $goog$object$contains$($obj$$, $val$$) {
  return goog.object.containsValue($obj$$, $val$$)
};
goog.object.getValues = function $goog$object$getValues$($obj$$) {
  var $res$$ = [], $i$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$i$$++] = $obj$$[$key$$]
  }
  return $res$$
};
goog.object.getKeys = function $goog$object$getKeys$($obj$$) {
  var $res$$ = [], $i$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$i$$++] = $key$$
  }
  return $res$$
};
goog.object.getValueByKeys = function $goog$object$getValueByKeys$($obj$$, $var_args$$) {
  for(var $i$$49_isArrayLike$$ = goog.isArrayLike($var_args$$), $keys$$ = $i$$49_isArrayLike$$ ? $var_args$$ : arguments, $i$$49_isArrayLike$$ = $i$$49_isArrayLike$$ ? 0 : 1;$i$$49_isArrayLike$$ < $keys$$.length && !($obj$$ = $obj$$[$keys$$[$i$$49_isArrayLike$$]], !goog.isDef($obj$$));$i$$49_isArrayLike$$++) {
  }
  return $obj$$
};
goog.object.containsKey = function $goog$object$containsKey$($obj$$, $key$$) {
  return $key$$ in $obj$$
};
goog.object.containsValue = function $goog$object$containsValue$($obj$$, $val$$) {
  for(var $key$$ in $obj$$) {
    if($obj$$[$key$$] == $val$$) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function $goog$object$findKey$($obj$$, $f$$, $opt_this$$) {
  for(var $key$$ in $obj$$) {
    if($f$$.call($opt_this$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return $key$$
    }
  }
};
goog.object.findValue = function $goog$object$findValue$($obj$$, $f$$24_key$$, $opt_this$$) {
  return($f$$24_key$$ = goog.object.findKey($obj$$, $f$$24_key$$, $opt_this$$)) && $obj$$[$f$$24_key$$]
};
goog.object.isEmpty = function $goog$object$isEmpty$($obj$$) {
  for(var $key$$ in $obj$$) {
    return!1
  }
  return!0
};
goog.object.clear = function $goog$object$clear$($obj$$) {
  for(var $i$$ in $obj$$) {
    delete $obj$$[$i$$]
  }
};
goog.object.remove = function $goog$object$remove$($obj$$, $key$$) {
  var $rv$$;
  ($rv$$ = $key$$ in $obj$$) && delete $obj$$[$key$$];
  return $rv$$
};
goog.object.add = function $goog$object$add$($obj$$, $key$$, $val$$) {
  if($key$$ in $obj$$) {
    throw Error('The object already contains the key "' + $key$$ + '"');
  }
  goog.object.set($obj$$, $key$$, $val$$)
};
goog.object.get = function $goog$object$get$($obj$$, $key$$, $opt_val$$) {
  return $key$$ in $obj$$ ? $obj$$[$key$$] : $opt_val$$
};
goog.object.set = function $goog$object$set$($obj$$, $key$$, $value$$) {
  $obj$$[$key$$] = $value$$
};
goog.object.setIfUndefined = function $goog$object$setIfUndefined$($obj$$, $key$$, $value$$) {
  return $key$$ in $obj$$ ? $obj$$[$key$$] : $obj$$[$key$$] = $value$$
};
goog.object.clone = function $goog$object$clone$($obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$key$$] = $obj$$[$key$$]
  }
  return $res$$
};
goog.object.unsafeClone = function $goog$object$unsafeClone$($obj$$) {
  var $clone$$1_type$$ = goog.typeOf($obj$$);
  if("object" == $clone$$1_type$$ || "array" == $clone$$1_type$$) {
    if($obj$$.clone) {
      return $obj$$.clone()
    }
    var $clone$$1_type$$ = "array" == $clone$$1_type$$ ? [] : {}, $key$$;
    for($key$$ in $obj$$) {
      $clone$$1_type$$[$key$$] = goog.object.unsafeClone($obj$$[$key$$])
    }
    return $clone$$1_type$$
  }
  return $obj$$
};
goog.object.transpose = function $goog$object$transpose$($obj$$) {
  var $transposed$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $transposed$$[$obj$$[$key$$]] = $key$$
  }
  return $transposed$$
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function $goog$object$extend$($target$$, $var_args$$) {
  for(var $key$$, $source$$, $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    $source$$ = arguments[$i$$];
    for($key$$ in $source$$) {
      $target$$[$key$$] = $source$$[$key$$]
    }
    for(var $j$$ = 0;$j$$ < goog.object.PROTOTYPE_FIELDS_.length;$j$$++) {
      $key$$ = goog.object.PROTOTYPE_FIELDS_[$j$$], Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$])
    }
  }
};
goog.object.create = function $goog$object$create$($var_args$$) {
  var $argLength$$ = arguments.length;
  if(1 == $argLength$$ && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if($argLength$$ % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $argLength$$;$i$$ += 2) {
    $rv$$[arguments[$i$$]] = arguments[$i$$ + 1]
  }
  return $rv$$
};
goog.object.createSet = function $goog$object$createSet$($var_args$$) {
  var $argLength$$ = arguments.length;
  if(1 == $argLength$$ && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $argLength$$;$i$$++) {
    $rv$$[arguments[$i$$]] = !0
  }
  return $rv$$
};
goog.object.createImmutableView = function $goog$object$createImmutableView$($obj$$) {
  var $result$$ = $obj$$;
  Object.isFrozen && !Object.isFrozen($obj$$) && ($result$$ = Object.create($obj$$), Object.freeze($result$$));
  return $result$$
};
goog.object.isImmutableView = function $goog$object$isImmutableView$($obj$$) {
  return!!Object.isFrozen && Object.isFrozen($obj$$)
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function $goog$dom$getDomHelper$($opt_element$$) {
  return $opt_element$$ ? new goog.dom.DomHelper(goog.dom.getOwnerDocument($opt_element$$)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function $goog$dom$getDocument$() {
  return document
};
goog.dom.getElement = function $goog$dom$getElement$($element$$) {
  return goog.isString($element$$) ? document.getElementById($element$$) : $element$$
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function $goog$dom$getElementsByTagNameAndClass$($opt_tag$$, $opt_class$$, $opt_el$$) {
  return goog.dom.getElementsByTagNameAndClass_(document, $opt_tag$$, $opt_class$$, $opt_el$$)
};
goog.dom.getElementsByClass = function $goog$dom$getElementsByClass$($className$$, $opt_el$$) {
  var $parent$$ = $opt_el$$ || document;
  return goog.dom.canUseQuerySelector_($parent$$) ? $parent$$.querySelectorAll("." + $className$$) : $parent$$.getElementsByClassName ? $parent$$.getElementsByClassName($className$$) : goog.dom.getElementsByTagNameAndClass_(document, "*", $className$$, $opt_el$$)
};
goog.dom.getElementByClass = function $goog$dom$getElementByClass$($className$$, $opt_el$$) {
  var $parent$$ = $opt_el$$ || document, $retVal$$ = null;
  return($retVal$$ = goog.dom.canUseQuerySelector_($parent$$) ? $parent$$.querySelector("." + $className$$) : goog.dom.getElementsByClass($className$$, $opt_el$$)[0]) || null
};
goog.dom.canUseQuerySelector_ = function $goog$dom$canUseQuerySelector_$($parent$$) {
  return!(!$parent$$.querySelectorAll || !$parent$$.querySelector)
};
goog.dom.getElementsByTagNameAndClass_ = function $goog$dom$getElementsByTagNameAndClass_$($doc$$5_els_parent$$, $className$$10_opt_tag$$1_tagName$$, $opt_class$$, $arrayLike_opt_el$$) {
  $doc$$5_els_parent$$ = $arrayLike_opt_el$$ || $doc$$5_els_parent$$;
  $className$$10_opt_tag$$1_tagName$$ = $className$$10_opt_tag$$1_tagName$$ && "*" != $className$$10_opt_tag$$1_tagName$$ ? $className$$10_opt_tag$$1_tagName$$.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_($doc$$5_els_parent$$) && ($className$$10_opt_tag$$1_tagName$$ || $opt_class$$)) {
    return $doc$$5_els_parent$$.querySelectorAll($className$$10_opt_tag$$1_tagName$$ + ($opt_class$$ ? "." + $opt_class$$ : ""))
  }
  if($opt_class$$ && $doc$$5_els_parent$$.getElementsByClassName) {
    $doc$$5_els_parent$$ = $doc$$5_els_parent$$.getElementsByClassName($opt_class$$);
    if($className$$10_opt_tag$$1_tagName$$) {
      for(var $arrayLike_opt_el$$ = {}, $len$$ = 0, $i$$ = 0, $el$$;$el$$ = $doc$$5_els_parent$$[$i$$];$i$$++) {
        $className$$10_opt_tag$$1_tagName$$ == $el$$.nodeName && ($arrayLike_opt_el$$[$len$$++] = $el$$)
      }
      $arrayLike_opt_el$$.length = $len$$;
      return $arrayLike_opt_el$$
    }
    return $doc$$5_els_parent$$
  }
  $doc$$5_els_parent$$ = $doc$$5_els_parent$$.getElementsByTagName($className$$10_opt_tag$$1_tagName$$ || "*");
  if($opt_class$$) {
    $arrayLike_opt_el$$ = {};
    for($i$$ = $len$$ = 0;$el$$ = $doc$$5_els_parent$$[$i$$];$i$$++) {
      $className$$10_opt_tag$$1_tagName$$ = $el$$.className, "function" == typeof $className$$10_opt_tag$$1_tagName$$.split && goog.array.contains($className$$10_opt_tag$$1_tagName$$.split(/\s+/), $opt_class$$) && ($arrayLike_opt_el$$[$len$$++] = $el$$)
    }
    $arrayLike_opt_el$$.length = $len$$;
    return $arrayLike_opt_el$$
  }
  return $doc$$5_els_parent$$
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function $goog$dom$setProperties$($element$$, $properties$$) {
  goog.object.forEach($properties$$, function($val$$, $key$$) {
    "style" == $key$$ ? $element$$.style.cssText = $val$$ : "class" == $key$$ ? $element$$.className = $val$$ : "for" == $key$$ ? $element$$.htmlFor = $val$$ : $key$$ in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? $element$$.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[$key$$], $val$$) : goog.string.startsWith($key$$, "aria-") || goog.string.startsWith($key$$, "data-") ? $element$$.setAttribute($key$$, $val$$) : $element$$[$key$$] = $val$$
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function $goog$dom$getViewportSize$($opt_window$$) {
  return goog.dom.getViewportSize_($opt_window$$ || window)
};
goog.dom.getViewportSize_ = function $goog$dom$getViewportSize_$($doc$$6_el$$) {
  $doc$$6_el$$ = $doc$$6_el$$.document;
  $doc$$6_el$$ = goog.dom.isCss1CompatMode_($doc$$6_el$$) ? $doc$$6_el$$.documentElement : $doc$$6_el$$.body;
  return new goog.math.Size($doc$$6_el$$.clientWidth, $doc$$6_el$$.clientHeight)
};
goog.dom.getDocumentHeight = function $goog$dom$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function $goog$dom$getDocumentHeight_$($vh_win$$) {
  var $doc$$7_sh$$ = $vh_win$$.document, $body$$1_height$$ = 0;
  if($doc$$7_sh$$) {
    var $vh_win$$ = goog.dom.getViewportSize_($vh_win$$).height, $body$$1_height$$ = $doc$$7_sh$$.body, $docEl$$ = $doc$$7_sh$$.documentElement;
    if(goog.dom.isCss1CompatMode_($doc$$7_sh$$) && $docEl$$.scrollHeight) {
      $body$$1_height$$ = $docEl$$.scrollHeight != $vh_win$$ ? $docEl$$.scrollHeight : $docEl$$.offsetHeight
    }else {
      var $doc$$7_sh$$ = $docEl$$.scrollHeight, $oh$$ = $docEl$$.offsetHeight;
      $docEl$$.clientHeight != $oh$$ && ($doc$$7_sh$$ = $body$$1_height$$.scrollHeight, $oh$$ = $body$$1_height$$.offsetHeight);
      $body$$1_height$$ = $doc$$7_sh$$ > $vh_win$$ ? $doc$$7_sh$$ > $oh$$ ? $doc$$7_sh$$ : $oh$$ : $doc$$7_sh$$ < $oh$$ ? $doc$$7_sh$$ : $oh$$
    }
  }
  return $body$$1_height$$
};
goog.dom.getPageScroll = function $goog$dom$getPageScroll$($opt_window$$) {
  return goog.dom.getDomHelper(($opt_window$$ || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function $goog$dom$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function $goog$dom$getDocumentScroll_$($doc$$8_win$$) {
  var $el$$ = goog.dom.getDocumentScrollElement_($doc$$8_win$$), $doc$$8_win$$ = goog.dom.getWindow_($doc$$8_win$$);
  return new goog.math.Coordinate($doc$$8_win$$.pageXOffset || $el$$.scrollLeft, $doc$$8_win$$.pageYOffset || $el$$.scrollTop)
};
goog.dom.getDocumentScrollElement = function $goog$dom$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function $goog$dom$getDocumentScrollElement_$($doc$$) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_($doc$$) ? $doc$$.documentElement : $doc$$.body
};
goog.dom.getWindow = function $goog$dom$getWindow$($opt_doc$$) {
  return $opt_doc$$ ? goog.dom.getWindow_($opt_doc$$) : window
};
goog.dom.getWindow_ = function $goog$dom$getWindow_$($doc$$) {
  return $doc$$.parentWindow || $doc$$.defaultView
};
goog.dom.createDom = function $goog$dom$createDom$($tagName$$, $opt_attributes$$, $var_args$$) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function $goog$dom$createDom_$($doc$$, $args$$) {
  var $element$$17_tagName$$ = $args$$[0], $attributes$$ = $args$$[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && $attributes$$ && ($attributes$$.name || $attributes$$.type)) {
    $element$$17_tagName$$ = ["<", $element$$17_tagName$$];
    $attributes$$.name && $element$$17_tagName$$.push(' name="', goog.string.htmlEscape($attributes$$.name), '"');
    if($attributes$$.type) {
      $element$$17_tagName$$.push(' type="', goog.string.htmlEscape($attributes$$.type), '"');
      var $clone$$ = {};
      goog.object.extend($clone$$, $attributes$$);
      delete $clone$$.type;
      $attributes$$ = $clone$$
    }
    $element$$17_tagName$$.push(">");
    $element$$17_tagName$$ = $element$$17_tagName$$.join("")
  }
  $element$$17_tagName$$ = $doc$$.createElement($element$$17_tagName$$);
  $attributes$$ && (goog.isString($attributes$$) ? $element$$17_tagName$$.className = $attributes$$ : goog.isArray($attributes$$) ? goog.dom.classes.add.apply(null, [$element$$17_tagName$$].concat($attributes$$)) : goog.dom.setProperties($element$$17_tagName$$, $attributes$$));
  2 < $args$$.length && goog.dom.append_($doc$$, $element$$17_tagName$$, $args$$, 2);
  return $element$$17_tagName$$
};
goog.dom.append_ = function $goog$dom$append_$($doc$$, $parent$$, $args$$, $i$$) {
  function $childHandler$$($child$$) {
    $child$$ && $parent$$.appendChild(goog.isString($child$$) ? $doc$$.createTextNode($child$$) : $child$$)
  }
  for(;$i$$ < $args$$.length;$i$$++) {
    var $arg$$ = $args$$[$i$$];
    goog.isArrayLike($arg$$) && !goog.dom.isNodeLike($arg$$) ? goog.array.forEach(goog.dom.isNodeList($arg$$) ? goog.array.toArray($arg$$) : $arg$$, $childHandler$$) : $childHandler$$($arg$$)
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function $goog$dom$createElement$($name$$) {
  return document.createElement($name$$)
};
goog.dom.createTextNode = function $goog$dom$createTextNode$($content$$) {
  return document.createTextNode($content$$)
};
goog.dom.createTable = function $goog$dom$createTable$($rows$$, $columns$$, $opt_fillWithNbsp$$) {
  return goog.dom.createTable_(document, $rows$$, $columns$$, !!$opt_fillWithNbsp$$)
};
goog.dom.createTable_ = function $goog$dom$createTable_$($doc$$13_elem$$, $rows$$, $columns$$, $fillWithNbsp$$) {
  for(var $rowHtml$$ = ["<tr>"], $i$$ = 0;$i$$ < $columns$$;$i$$++) {
    $rowHtml$$.push($fillWithNbsp$$ ? "<td>&nbsp;</td>" : "<td></td>")
  }
  $rowHtml$$.push("</tr>");
  $rowHtml$$ = $rowHtml$$.join("");
  $columns$$ = ["<table>"];
  for($i$$ = 0;$i$$ < $rows$$;$i$$++) {
    $columns$$.push($rowHtml$$)
  }
  $columns$$.push("</table>");
  $doc$$13_elem$$ = $doc$$13_elem$$.createElement(goog.dom.TagName.DIV);
  $doc$$13_elem$$.innerHTML = $columns$$.join("");
  return $doc$$13_elem$$.removeChild($doc$$13_elem$$.firstChild)
};
goog.dom.htmlToDocumentFragment = function $goog$dom$htmlToDocumentFragment$($htmlString$$) {
  return goog.dom.htmlToDocumentFragment_(document, $htmlString$$)
};
goog.dom.htmlToDocumentFragment_ = function $goog$dom$htmlToDocumentFragment_$($doc$$, $htmlString$$) {
  var $tempDiv$$ = $doc$$.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? ($tempDiv$$.innerHTML = "<br>" + $htmlString$$, $tempDiv$$.removeChild($tempDiv$$.firstChild)) : $tempDiv$$.innerHTML = $htmlString$$;
  if(1 == $tempDiv$$.childNodes.length) {
    return $tempDiv$$.removeChild($tempDiv$$.firstChild)
  }
  for(var $fragment$$ = $doc$$.createDocumentFragment();$tempDiv$$.firstChild;) {
    $fragment$$.appendChild($tempDiv$$.firstChild)
  }
  return $fragment$$
};
goog.dom.getCompatMode = function $goog$dom$getCompatMode$() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function $goog$dom$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function $goog$dom$isCss1CompatMode_$($doc$$) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == $doc$$.compatMode
};
goog.dom.canHaveChildren = function $goog$dom$canHaveChildren$($node$$) {
  if($node$$.nodeType != goog.dom.NodeType.ELEMENT) {
    return!1
  }
  switch($node$$.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.COMMAND:
    ;
    case goog.dom.TagName.EMBED:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.KEYGEN:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.SOURCE:
    ;
    case goog.dom.TagName.STYLE:
    ;
    case goog.dom.TagName.TRACK:
    ;
    case goog.dom.TagName.WBR:
      return!1
  }
  return!0
};
goog.dom.appendChild = function $goog$dom$appendChild$($parent$$, $child$$) {
  $parent$$.appendChild($child$$)
};
goog.dom.append = function $goog$dom$append$($parent$$, $var_args$$) {
  goog.dom.append_(goog.dom.getOwnerDocument($parent$$), $parent$$, arguments, 1)
};
goog.dom.removeChildren = function $goog$dom$removeChildren$($node$$) {
  for(var $child$$;$child$$ = $node$$.firstChild;) {
    $node$$.removeChild($child$$)
  }
};
goog.dom.insertSiblingBefore = function $goog$dom$insertSiblingBefore$($newNode$$, $refNode$$) {
  $refNode$$.parentNode && $refNode$$.parentNode.insertBefore($newNode$$, $refNode$$)
};
goog.dom.insertSiblingAfter = function $goog$dom$insertSiblingAfter$($newNode$$, $refNode$$) {
  $refNode$$.parentNode && $refNode$$.parentNode.insertBefore($newNode$$, $refNode$$.nextSibling)
};
goog.dom.insertChildAt = function $goog$dom$insertChildAt$($parent$$, $child$$, $index$$) {
  $parent$$.insertBefore($child$$, $parent$$.childNodes[$index$$] || null)
};
goog.dom.removeNode = function $goog$dom$removeNode$($node$$) {
  return $node$$ && $node$$.parentNode ? $node$$.parentNode.removeChild($node$$) : null
};
goog.dom.replaceNode = function $goog$dom$replaceNode$($newNode$$, $oldNode$$) {
  var $parent$$ = $oldNode$$.parentNode;
  $parent$$ && $parent$$.replaceChild($newNode$$, $oldNode$$)
};
goog.dom.flattenElement = function $goog$dom$flattenElement$($element$$) {
  var $child$$, $parent$$ = $element$$.parentNode;
  if($parent$$ && $parent$$.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if($element$$.removeNode) {
      return $element$$.removeNode(!1)
    }
    for(;$child$$ = $element$$.firstChild;) {
      $parent$$.insertBefore($child$$, $element$$)
    }
    return goog.dom.removeNode($element$$)
  }
};
goog.dom.getChildren = function $goog$dom$getChildren$($element$$) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != $element$$.children ? $element$$.children : goog.array.filter($element$$.childNodes, function($node$$) {
    return $node$$.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function $goog$dom$getFirstElementChild$($node$$) {
  return void 0 != $node$$.firstElementChild ? $node$$.firstElementChild : goog.dom.getNextElementNode_($node$$.firstChild, !0)
};
goog.dom.getLastElementChild = function $goog$dom$getLastElementChild$($node$$) {
  return void 0 != $node$$.lastElementChild ? $node$$.lastElementChild : goog.dom.getNextElementNode_($node$$.lastChild, !1)
};
goog.dom.getNextElementSibling = function $goog$dom$getNextElementSibling$($node$$) {
  return void 0 != $node$$.nextElementSibling ? $node$$.nextElementSibling : goog.dom.getNextElementNode_($node$$.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function $goog$dom$getPreviousElementSibling$($node$$) {
  return void 0 != $node$$.previousElementSibling ? $node$$.previousElementSibling : goog.dom.getNextElementNode_($node$$.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function $goog$dom$getNextElementNode_$($node$$, $forward$$) {
  for(;$node$$ && $node$$.nodeType != goog.dom.NodeType.ELEMENT;) {
    $node$$ = $forward$$ ? $node$$.nextSibling : $node$$.previousSibling
  }
  return $node$$
};
goog.dom.getNextNode = function $goog$dom$getNextNode$($node$$) {
  if(!$node$$) {
    return null
  }
  if($node$$.firstChild) {
    return $node$$.firstChild
  }
  for(;$node$$ && !$node$$.nextSibling;) {
    $node$$ = $node$$.parentNode
  }
  return $node$$ ? $node$$.nextSibling : null
};
goog.dom.getPreviousNode = function $goog$dom$getPreviousNode$($node$$) {
  if(!$node$$) {
    return null
  }
  if(!$node$$.previousSibling) {
    return $node$$.parentNode
  }
  for($node$$ = $node$$.previousSibling;$node$$ && $node$$.lastChild;) {
    $node$$ = $node$$.lastChild
  }
  return $node$$
};
goog.dom.isNodeLike = function $goog$dom$isNodeLike$($obj$$) {
  return goog.isObject($obj$$) && 0 < $obj$$.nodeType
};
goog.dom.isElement = function $goog$dom$isElement$($obj$$) {
  return goog.isObject($obj$$) && $obj$$.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function $goog$dom$isWindow$($obj$$) {
  return goog.isObject($obj$$) && $obj$$.window == $obj$$
};
goog.dom.getParentElement = function $goog$dom$getParentElement$($element$$20_parent$$) {
  if(goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY) {
    return $element$$20_parent$$.parentElement
  }
  $element$$20_parent$$ = $element$$20_parent$$.parentNode;
  return goog.dom.isElement($element$$20_parent$$) ? $element$$20_parent$$ : null
};
goog.dom.contains = function $goog$dom$contains$($parent$$, $descendant$$) {
  if($parent$$.contains && $descendant$$.nodeType == goog.dom.NodeType.ELEMENT) {
    return $parent$$ == $descendant$$ || $parent$$.contains($descendant$$)
  }
  if("undefined" != typeof $parent$$.compareDocumentPosition) {
    return $parent$$ == $descendant$$ || Boolean($parent$$.compareDocumentPosition($descendant$$) & 16)
  }
  for(;$descendant$$ && $parent$$ != $descendant$$;) {
    $descendant$$ = $descendant$$.parentNode
  }
  return $descendant$$ == $parent$$
};
goog.dom.compareNodeOrder = function $goog$dom$compareNodeOrder$($node1$$, $node2$$) {
  if($node1$$ == $node2$$) {
    return 0
  }
  if($node1$$.compareDocumentPosition) {
    return $node1$$.compareDocumentPosition($node2$$) & 2 ? 1 : -1
  }
  if(($node1$$.nodeType == goog.dom.NodeType.DOCUMENT || $node2$$.nodeType == goog.dom.NodeType.DOCUMENT) && goog.userAgent.IE && !goog.userAgent.isVersion(9)) {
    if($node1$$.nodeType == goog.dom.NodeType.DOCUMENT) {
      return-1
    }
    if($node2$$.nodeType == goog.dom.NodeType.DOCUMENT) {
      return 1
    }
  }
  if("sourceIndex" in $node1$$ || $node1$$.parentNode && "sourceIndex" in $node1$$.parentNode) {
    var $isElement1_range1$$ = $node1$$.nodeType == goog.dom.NodeType.ELEMENT, $doc$$ = $node2$$.nodeType == goog.dom.NodeType.ELEMENT;
    if($isElement1_range1$$ && $doc$$) {
      return $node1$$.sourceIndex - $node2$$.sourceIndex
    }
    var $parent1$$ = $node1$$.parentNode, $parent2$$ = $node2$$.parentNode;
    return $parent1$$ == $parent2$$ ? goog.dom.compareSiblingOrder_($node1$$, $node2$$) : !$isElement1_range1$$ && goog.dom.contains($parent1$$, $node2$$) ? -1 * goog.dom.compareParentsDescendantNodeIe_($node1$$, $node2$$) : !$doc$$ && goog.dom.contains($parent2$$, $node1$$) ? goog.dom.compareParentsDescendantNodeIe_($node2$$, $node1$$) : ($isElement1_range1$$ ? $node1$$.sourceIndex : $parent1$$.sourceIndex) - ($doc$$ ? $node2$$.sourceIndex : $parent2$$.sourceIndex)
  }
  $doc$$ = goog.dom.getOwnerDocument($node1$$);
  $isElement1_range1$$ = $doc$$.createRange();
  $isElement1_range1$$.selectNode($node1$$);
  $isElement1_range1$$.collapse(!0);
  $doc$$ = $doc$$.createRange();
  $doc$$.selectNode($node2$$);
  $doc$$.collapse(!0);
  return $isElement1_range1$$.compareBoundaryPoints(goog.global.Range.START_TO_END, $doc$$)
};
goog.dom.compareParentsDescendantNodeIe_ = function $goog$dom$compareParentsDescendantNodeIe_$($textNode$$, $node$$) {
  var $parent$$ = $textNode$$.parentNode;
  if($parent$$ == $node$$) {
    return-1
  }
  for(var $sibling$$ = $node$$;$sibling$$.parentNode != $parent$$;) {
    $sibling$$ = $sibling$$.parentNode
  }
  return goog.dom.compareSiblingOrder_($sibling$$, $textNode$$)
};
goog.dom.compareSiblingOrder_ = function $goog$dom$compareSiblingOrder_$($node1$$, $node2$$) {
  for(var $s$$ = $node2$$;$s$$ = $s$$.previousSibling;) {
    if($s$$ == $node1$$) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function $goog$dom$findCommonAncestor$($var_args$$) {
  var $i$$, $count$$ = arguments.length;
  if($count$$) {
    if(1 == $count$$) {
      return arguments[0]
    }
  }else {
    return null
  }
  var $paths$$ = [], $minLength$$ = Infinity;
  for($i$$ = 0;$i$$ < $count$$;$i$$++) {
    for(var $ancestors_output$$ = [], $first$$1_node$$ = arguments[$i$$];$first$$1_node$$;) {
      $ancestors_output$$.unshift($first$$1_node$$), $first$$1_node$$ = $first$$1_node$$.parentNode
    }
    $paths$$.push($ancestors_output$$);
    $minLength$$ = Math.min($minLength$$, $ancestors_output$$.length)
  }
  $ancestors_output$$ = null;
  for($i$$ = 0;$i$$ < $minLength$$;$i$$++) {
    for(var $first$$1_node$$ = $paths$$[0][$i$$], $j$$ = 1;$j$$ < $count$$;$j$$++) {
      if($first$$1_node$$ != $paths$$[$j$$][$i$$]) {
        return $ancestors_output$$
      }
    }
    $ancestors_output$$ = $first$$1_node$$
  }
  return $ancestors_output$$
};
goog.dom.getOwnerDocument = function $goog$dom$getOwnerDocument$($node$$) {
  return $node$$.nodeType == goog.dom.NodeType.DOCUMENT ? $node$$ : $node$$.ownerDocument || $node$$.document
};
goog.dom.getFrameContentDocument = function $goog$dom$getFrameContentDocument$($frame$$) {
  return $frame$$.contentDocument || $frame$$.contentWindow.document
};
goog.dom.getFrameContentWindow = function $goog$dom$getFrameContentWindow$($frame$$) {
  return $frame$$.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument($frame$$))
};
goog.dom.setTextContent = function $goog$dom$setTextContent$($element$$, $text$$) {
  if("textContent" in $element$$) {
    $element$$.textContent = $text$$
  }else {
    if($element$$.firstChild && $element$$.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      for(;$element$$.lastChild != $element$$.firstChild;) {
        $element$$.removeChild($element$$.lastChild)
      }
      $element$$.firstChild.data = $text$$
    }else {
      goog.dom.removeChildren($element$$);
      var $doc$$ = goog.dom.getOwnerDocument($element$$);
      $element$$.appendChild($doc$$.createTextNode($text$$))
    }
  }
};
goog.dom.getOuterHtml = function $goog$dom$getOuterHtml$($element$$) {
  if("outerHTML" in $element$$) {
    return $element$$.outerHTML
  }
  var $div$$ = goog.dom.getOwnerDocument($element$$).createElement("div");
  $div$$.appendChild($element$$.cloneNode(!0));
  return $div$$.innerHTML
};
goog.dom.findNode = function $goog$dom$findNode$($root$$, $p$$) {
  var $rv$$ = [];
  return goog.dom.findNodes_($root$$, $p$$, $rv$$, !0) ? $rv$$[0] : void 0
};
goog.dom.findNodes = function $goog$dom$findNodes$($root$$, $p$$) {
  var $rv$$ = [];
  goog.dom.findNodes_($root$$, $p$$, $rv$$, !1);
  return $rv$$
};
goog.dom.findNodes_ = function $goog$dom$findNodes_$($child$$6_root$$, $p$$, $rv$$, $findOne$$) {
  if(null != $child$$6_root$$) {
    for($child$$6_root$$ = $child$$6_root$$.firstChild;$child$$6_root$$;) {
      if($p$$($child$$6_root$$) && ($rv$$.push($child$$6_root$$), $findOne$$) || goog.dom.findNodes_($child$$6_root$$, $p$$, $rv$$, $findOne$$)) {
        return!0
      }
      $child$$6_root$$ = $child$$6_root$$.nextSibling
    }
  }
  return!1
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function $goog$dom$isFocusableTabIndex$($element$$23_index$$) {
  var $attrNode$$ = $element$$23_index$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$23_index$$ = $element$$23_index$$.tabIndex, goog.isNumber($element$$23_index$$) && 0 <= $element$$23_index$$ && 32768 > $element$$23_index$$) : !1
};
goog.dom.setFocusableTabIndex = function $goog$dom$setFocusableTabIndex$($element$$, $enable$$) {
  $enable$$ ? $element$$.tabIndex = 0 : ($element$$.tabIndex = -1, $element$$.removeAttribute("tabIndex"))
};
goog.dom.getTextContent = function $goog$dom$getTextContent$($node$$) {
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in $node$$) {
    $node$$ = goog.string.canonicalizeNewlines($node$$.innerText)
  }else {
    var $buf$$ = [];
    goog.dom.getTextContent_($node$$, $buf$$, !0);
    $node$$ = $buf$$.join("")
  }
  $node$$ = $node$$.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  $node$$ = $node$$.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || ($node$$ = $node$$.replace(/ +/g, " "));
  " " != $node$$ && ($node$$ = $node$$.replace(/^\s*/, ""));
  return $node$$
};
goog.dom.getRawTextContent = function $goog$dom$getRawTextContent$($node$$) {
  var $buf$$ = [];
  goog.dom.getTextContent_($node$$, $buf$$, !1);
  return $buf$$.join("")
};
goog.dom.getTextContent_ = function $goog$dom$getTextContent_$($child$$7_node$$, $buf$$, $normalizeWhitespace$$) {
  if(!($child$$7_node$$.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if($child$$7_node$$.nodeType == goog.dom.NodeType.TEXT) {
      $normalizeWhitespace$$ ? $buf$$.push(String($child$$7_node$$.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : $buf$$.push($child$$7_node$$.nodeValue)
    }else {
      if($child$$7_node$$.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        $buf$$.push(goog.dom.PREDEFINED_TAG_VALUES_[$child$$7_node$$.nodeName])
      }else {
        for($child$$7_node$$ = $child$$7_node$$.firstChild;$child$$7_node$$;) {
          goog.dom.getTextContent_($child$$7_node$$, $buf$$, $normalizeWhitespace$$), $child$$7_node$$ = $child$$7_node$$.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function $goog$dom$getNodeTextLength$($node$$) {
  return goog.dom.getTextContent($node$$).length
};
goog.dom.getNodeTextOffset = function $goog$dom$getNodeTextOffset$($node$$, $opt_offsetParent$$) {
  for(var $root$$ = $opt_offsetParent$$ || goog.dom.getOwnerDocument($node$$).body, $buf$$ = [];$node$$ && $node$$ != $root$$;) {
    for(var $cur$$ = $node$$;$cur$$ = $cur$$.previousSibling;) {
      $buf$$.unshift(goog.dom.getTextContent($cur$$))
    }
    $node$$ = $node$$.parentNode
  }
  return goog.string.trimLeft($buf$$.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function $goog$dom$getNodeAtOffset$($parent$$, $offset$$, $opt_result$$) {
  for(var $parent$$ = [$parent$$], $pos$$ = 0, $cur$$;0 < $parent$$.length && $pos$$ < $offset$$;) {
    if($cur$$ = $parent$$.pop(), !($cur$$.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if($cur$$.nodeType == goog.dom.NodeType.TEXT) {
        var $i$$58_text$$ = $cur$$.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), $pos$$ = $pos$$ + $i$$58_text$$.length
      }else {
        if($cur$$.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          $pos$$ += goog.dom.PREDEFINED_TAG_VALUES_[$cur$$.nodeName].length
        }else {
          for($i$$58_text$$ = $cur$$.childNodes.length - 1;0 <= $i$$58_text$$;$i$$58_text$$--) {
            $parent$$.push($cur$$.childNodes[$i$$58_text$$])
          }
        }
      }
    }
  }
  goog.isObject($opt_result$$) && ($opt_result$$.remainder = $cur$$ ? $cur$$.nodeValue.length + $offset$$ - $pos$$ - 1 : 0, $opt_result$$.node = $cur$$);
  return $cur$$
};
goog.dom.isNodeList = function $goog$dom$isNodeList$($val$$) {
  if($val$$ && "number" == typeof $val$$.length) {
    if(goog.isObject($val$$)) {
      return"function" == typeof $val$$.item || "string" == typeof $val$$.item
    }
    if(goog.isFunction($val$$)) {
      return"function" == typeof $val$$.item
    }
  }
  return!1
};
goog.dom.getAncestorByTagNameAndClass = function $goog$dom$getAncestorByTagNameAndClass$($element$$, $opt_tag$$, $opt_class$$) {
  if(!$opt_tag$$ && !$opt_class$$) {
    return null
  }
  var $tagName$$ = $opt_tag$$ ? $opt_tag$$.toUpperCase() : null;
  return goog.dom.getAncestor($element$$, function($node$$) {
    return(!$tagName$$ || $node$$.nodeName == $tagName$$) && (!$opt_class$$ || goog.dom.classes.has($node$$, $opt_class$$))
  }, !0)
};
goog.dom.getAncestorByClass = function $goog$dom$getAncestorByClass$($element$$, $className$$) {
  return goog.dom.getAncestorByTagNameAndClass($element$$, null, $className$$)
};
goog.dom.getAncestor = function $goog$dom$getAncestor$($element$$, $matcher$$, $ignoreSearchSteps_opt_includeNode$$, $opt_maxSearchSteps$$) {
  $ignoreSearchSteps_opt_includeNode$$ || ($element$$ = $element$$.parentNode);
  for(var $ignoreSearchSteps_opt_includeNode$$ = null == $opt_maxSearchSteps$$, $steps$$ = 0;$element$$ && ($ignoreSearchSteps_opt_includeNode$$ || $steps$$ <= $opt_maxSearchSteps$$);) {
    if($matcher$$($element$$)) {
      return $element$$
    }
    $element$$ = $element$$.parentNode;
    $steps$$++
  }
  return null
};
goog.dom.getActiveElement = function $goog$dom$getActiveElement$($doc$$) {
  try {
    return $doc$$ && $doc$$.activeElement
  }catch($e$$) {
  }
  return null
};
goog.dom.DomHelper = function $goog$dom$DomHelper$($opt_document$$) {
  this.document_ = $opt_document$$ || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function $goog$dom$DomHelper$$setDocument$($document$$) {
  this.document_ = $document$$
};
goog.dom.DomHelper.prototype.getDocument = function $goog$dom$DomHelper$$getDocument$() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function $goog$dom$DomHelper$$getElement$($element$$) {
  return goog.isString($element$$) ? this.document_.getElementById($element$$) : $element$$
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function $goog$dom$DomHelper$$getElementsByTagNameAndClass$($opt_tag$$, $opt_class$$, $opt_el$$) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, $opt_tag$$, $opt_class$$, $opt_el$$)
};
goog.dom.DomHelper.prototype.getElementsByClass = function $goog$dom$DomHelper$$getElementsByClass$($className$$, $opt_el$$) {
  return goog.dom.getElementsByClass($className$$, $opt_el$$ || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function $goog$dom$DomHelper$$getElementByClass$($className$$, $opt_el$$) {
  return goog.dom.getElementByClass($className$$, $opt_el$$ || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function $goog$dom$DomHelper$$getViewportSize$($opt_window$$) {
  return goog.dom.getViewportSize($opt_window$$ || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function $goog$dom$DomHelper$$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function $goog$dom$DomHelper$$createDom$($tagName$$, $opt_attributes$$, $var_args$$) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function $goog$dom$DomHelper$$createElement$($name$$) {
  return this.document_.createElement($name$$)
};
goog.dom.DomHelper.prototype.createTextNode = function $goog$dom$DomHelper$$createTextNode$($content$$) {
  return this.document_.createTextNode($content$$)
};
goog.dom.DomHelper.prototype.createTable = function $goog$dom$DomHelper$$createTable$($rows$$, $columns$$, $opt_fillWithNbsp$$) {
  return goog.dom.createTable_(this.document_, $rows$$, $columns$$, !!$opt_fillWithNbsp$$)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function $goog$dom$DomHelper$$htmlToDocumentFragment$($htmlString$$) {
  return goog.dom.htmlToDocumentFragment_(this.document_, $htmlString$$)
};
goog.dom.DomHelper.prototype.getCompatMode = function $goog$dom$DomHelper$$getCompatMode$() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function $goog$dom$DomHelper$$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function $goog$dom$DomHelper$$getWindow$() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function $goog$dom$DomHelper$$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function $goog$dom$DomHelper$$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.getActiveElement = function $goog$dom$DomHelper$$getActiveElement$($opt_doc$$) {
  return goog.dom.getActiveElement($opt_doc$$ || this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.structs = {};
goog.structs.InversionMap = function $goog$structs$InversionMap$($rangeArray$$, $valueArray$$, $opt_delta$$) {
  if($rangeArray$$.length != $valueArray$$.length) {
    return null
  }
  this.storeInversion_($rangeArray$$, $opt_delta$$);
  this.values = $valueArray$$
};
goog.structs.InversionMap.prototype.storeInversion_ = function $goog$structs$InversionMap$$storeInversion_$($rangeArray$$, $opt_delta$$) {
  this.rangeArray = $rangeArray$$;
  for(var $i$$ = 1;$i$$ < $rangeArray$$.length;$i$$++) {
    null == $rangeArray$$[$i$$] ? $rangeArray$$[$i$$] = $rangeArray$$[$i$$ - 1] + 1 : $opt_delta$$ && ($rangeArray$$[$i$$] += $rangeArray$$[$i$$ - 1])
  }
};
goog.structs.InversionMap.prototype.spliceInversion = function $goog$structs$InversionMap$$spliceInversion$($otherMap_rangeArray$$, $startSplice_valueArray$$, $opt_delta$$) {
  var $otherMap_rangeArray$$ = new goog.structs.InversionMap($otherMap_rangeArray$$, $startSplice_valueArray$$, $opt_delta$$), $opt_delta$$ = $otherMap_rangeArray$$.rangeArray[0], $endRange_endSplice$$ = goog.array.peek($otherMap_rangeArray$$.rangeArray), $startSplice_valueArray$$ = this.getLeast($opt_delta$$), $endRange_endSplice$$ = this.getLeast($endRange_endSplice$$);
  $opt_delta$$ != this.rangeArray[$startSplice_valueArray$$] && $startSplice_valueArray$$++;
  $opt_delta$$ = $endRange_endSplice$$ - $startSplice_valueArray$$ + 1;
  goog.partial(goog.array.splice, this.rangeArray, $startSplice_valueArray$$, $opt_delta$$).apply(null, $otherMap_rangeArray$$.rangeArray);
  goog.partial(goog.array.splice, this.values, $startSplice_valueArray$$, $opt_delta$$).apply(null, $otherMap_rangeArray$$.values)
};
goog.structs.InversionMap.prototype.at = function $goog$structs$InversionMap$$at$($index$$) {
  $index$$ = this.getLeast($index$$);
  return 0 > $index$$ ? null : this.values[$index$$]
};
goog.structs.InversionMap.prototype.getLeast = function $goog$structs$InversionMap$$getLeast$($intKey$$) {
  for(var $arr$$ = this.rangeArray, $low$$ = 0, $high$$ = $arr$$.length;8 < $high$$ - $low$$;) {
    var $mid$$ = $high$$ + $low$$ >> 1;
    $arr$$[$mid$$] <= $intKey$$ ? $low$$ = $mid$$ : $high$$ = $mid$$
  }
  for(;$low$$ < $high$$ && !($intKey$$ < $arr$$[$low$$]);++$low$$) {
  }
  return $low$$ - 1
};
goog.i18n = {};
goog.i18n.GraphemeBreak = {};
goog.i18n.GraphemeBreak.property = {ANY:0, CONTROL:1, EXTEND:2, PREPEND:3, SPACING_MARK:4, L:5, V:6, T:7, LV:8, LVT:9, CR:10, LF:11};
goog.i18n.GraphemeBreak.inversions_ = null;
goog.i18n.GraphemeBreak.applyLegacyBreakRules_ = function $goog$i18n$GraphemeBreak$applyLegacyBreakRules_$($prop_a$$, $prop_b$$) {
  var $prop$$ = goog.i18n.GraphemeBreak.property;
  return $prop_a$$ == $prop$$.CR && $prop_b$$ == $prop$$.LF ? !1 : $prop_a$$ == $prop$$.CONTROL || $prop_a$$ == $prop$$.CR || $prop_a$$ == $prop$$.LF || $prop_b$$ == $prop$$.CONTROL || $prop_b$$ == $prop$$.CR || $prop_b$$ == $prop$$.LF ? !0 : $prop_a$$ == $prop$$.L && ($prop_b$$ == $prop$$.L || $prop_b$$ == $prop$$.V || $prop_b$$ == $prop$$.LV || $prop_b$$ == $prop$$.LVT) || ($prop_a$$ == $prop$$.LV || $prop_a$$ == $prop$$.V) && ($prop_b$$ == $prop$$.V || $prop_b$$ == $prop$$.T) || ($prop_a$$ == 
  $prop$$.LVT || $prop_a$$ == $prop$$.T) && $prop_b$$ == $prop$$.T || $prop_b$$ == $prop$$.EXTEND ? !1 : !0
};
goog.i18n.GraphemeBreak.getBreakProp_ = function $goog$i18n$GraphemeBreak$getBreakProp_$($acode$$) {
  if(44032 <= $acode$$ && 55203 >= $acode$$) {
    var $prop$$ = goog.i18n.GraphemeBreak.property;
    return 16 == $acode$$ % 28 ? $prop$$.LV : $prop$$.LVT
  }
  goog.i18n.GraphemeBreak.inversions_ || (goog.i18n.GraphemeBreak.inversions_ = new goog.structs.InversionMap([0, 10, 1, 2, 1, 18, 95, 33, 13, 1, 594, 112, 275, 7, 263, 45, 1, 1, 1, 2, 1, 2, 1, 1, 56, 4, 12, 11, 48, 20, 17, 1, 101, 7, 1, 7, 2, 2, 1, 4, 33, 1, 1, 1, 30, 27, 91, 11, 58, 9, 269, 2, 1, 56, 1, 1, 3, 8, 4, 1, 3, 4, 13, 2, 29, 1, 2, 56, 1, 1, 1, 2, 6, 6, 1, 9, 1, 10, 2, 29, 2, 1, 56, 2, 3, 17, 30, 2, 3, 14, 1, 56, 1, 1, 3, 8, 4, 1, 20, 2, 29, 1, 2, 56, 1, 1, 2, 1, 6, 6, 11, 10, 2, 30, 1, 
  59, 1, 1, 1, 12, 1, 9, 1, 41, 3, 58, 3, 5, 17, 11, 2, 30, 2, 56, 1, 1, 1, 1, 2, 1, 3, 1, 5, 11, 11, 2, 30, 2, 58, 1, 2, 5, 7, 11, 10, 2, 30, 2, 70, 6, 2, 6, 7, 19, 2, 60, 11, 5, 5, 1, 1, 8, 97, 13, 3, 5, 3, 6, 74, 2, 27, 1, 1, 1, 1, 1, 4, 2, 49, 14, 1, 5, 1, 2, 8, 45, 9, 1, 100, 2, 4, 1, 6, 1, 2, 2, 2, 23, 2, 2, 4, 3, 1, 3, 2, 7, 3, 4, 13, 1, 2, 2, 6, 1, 1, 1, 112, 96, 72, 82, 357, 1, 946, 3, 29, 3, 29, 2, 30, 2, 64, 2, 1, 7, 8, 1, 2, 11, 9, 1, 45, 3, 155, 1, 118, 3, 4, 2, 9, 1, 6, 3, 116, 17, 
  7, 2, 77, 2, 3, 228, 4, 1, 47, 1, 1, 5, 1, 1, 5, 1, 2, 38, 9, 12, 2, 1, 30, 1, 4, 2, 2, 1, 121, 8, 8, 2, 2, 392, 64, 523, 1, 2, 2, 24, 7, 49, 16, 96, 33, 3311, 32, 554, 6, 105, 2, 30164, 4, 9, 2, 388, 1, 3, 1, 4, 1, 23, 2, 2, 1, 88, 2, 50, 16, 1, 97, 8, 25, 11, 2, 213, 6, 2, 2, 2, 2, 12, 1, 8, 1, 1, 434, 11172, 1116, 1024, 6942, 1, 737, 16, 16, 7, 216, 1, 158, 2, 89, 3, 513, 1, 2051, 15, 40, 8, 50981, 1, 1, 3, 3, 1, 5, 8, 8, 2, 7, 30, 4, 148, 3, 798140, 255], [1, 11, 1, 10, 1, 0, 1, 0, 1, 0, 2, 
  0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 4, 0, 2, 0, 4, 2, 4, 2, 0, 2, 0, 2, 0, 2, 4, 0, 2, 0, 2, 4, 2, 4, 2, 0, 2, 0, 2, 0, 2, 4, 0, 2, 4, 2, 0, 2, 0, 2, 4, 0, 2, 0, 4, 2, 4, 2, 0, 2, 0, 2, 4, 0, 2, 0, 2, 4, 2, 4, 2, 0, 2, 0, 2, 0, 2, 4, 2, 4, 2, 0, 2, 0, 4, 0, 2, 4, 2, 0, 2, 0, 4, 0, 2, 0, 4, 2, 4, 2, 4, 2, 4, 2, 0, 2, 0, 4, 0, 2, 4, 2, 4, 2, 0, 2, 0, 4, 0, 2, 4, 2, 4, 2, 4, 0, 2, 0, 3, 2, 0, 2, 0, 2, 0, 3, 0, 2, 0, 
  2, 0, 2, 0, 2, 0, 2, 0, 4, 0, 2, 4, 2, 0, 2, 0, 2, 0, 2, 0, 4, 2, 4, 2, 4, 2, 4, 2, 0, 4, 2, 0, 2, 0, 4, 0, 4, 0, 2, 0, 2, 4, 2, 4, 2, 0, 4, 0, 5, 6, 7, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 4, 2, 4, 2, 4, 2, 0, 2, 0, 2, 0, 2, 0, 2, 4, 2, 4, 2, 4, 2, 0, 4, 0, 4, 0, 2, 4, 0, 2, 4, 0, 2, 4, 2, 4, 2, 4, 2, 4, 0, 2, 0, 2, 4, 0, 4, 2, 4, 2, 4, 0, 4, 2, 4, 2, 0, 2, 0, 1, 2, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 4, 2, 4, 0, 4, 0, 4, 2, 0, 2, 0, 2, 4, 0, 2, 4, 2, 4, 2, 0, 
  2, 0, 2, 4, 0, 9, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 4, 2, 0, 4, 2, 1, 2, 0, 2, 0, 2, 0, 2, 0, 1, 2], !0));
  return goog.i18n.GraphemeBreak.inversions_.at($acode$$)
};
goog.i18n.GraphemeBreak.hasGraphemeBreak = function $goog$i18n$GraphemeBreak$hasGraphemeBreak$($a$$19_prop_a$$, $b$$15_prop_b$$, $opt_extended$$) {
  var $a$$19_prop_a$$ = goog.i18n.GraphemeBreak.getBreakProp_($a$$19_prop_a$$), $b$$15_prop_b$$ = goog.i18n.GraphemeBreak.getBreakProp_($b$$15_prop_b$$), $prop$$ = goog.i18n.GraphemeBreak.property;
  return goog.i18n.GraphemeBreak.applyLegacyBreakRules_($a$$19_prop_a$$, $b$$15_prop_b$$) && !($opt_extended$$ && ($a$$19_prop_a$$ == $prop$$.PREPEND || $b$$15_prop_b$$ == $prop$$.SPACING_MARK))
};
goog.format = {};
goog.format.fileSize = function $goog$format$fileSize$($bytes$$, $opt_decimals$$) {
  return goog.format.numBytesToString($bytes$$, $opt_decimals$$, !1)
};
goog.format.isConvertableScaledNumber = function $goog$format$isConvertableScaledNumber$($val$$) {
  return goog.format.SCALED_NUMERIC_RE_.test($val$$)
};
goog.format.stringToNumericValue = function $goog$format$stringToNumericValue$($stringValue$$) {
  return goog.string.endsWith($stringValue$$, "B") ? goog.format.stringToNumericValue_($stringValue$$, goog.format.NUMERIC_SCALES_BINARY_) : goog.format.stringToNumericValue_($stringValue$$, goog.format.NUMERIC_SCALES_SI_)
};
goog.format.stringToNumBytes = function $goog$format$stringToNumBytes$($stringValue$$) {
  return goog.format.stringToNumericValue_($stringValue$$, goog.format.NUMERIC_SCALES_BINARY_)
};
goog.format.numericValueToString = function $goog$format$numericValueToString$($val$$, $opt_decimals$$) {
  return goog.format.numericValueToString_($val$$, goog.format.NUMERIC_SCALES_SI_, $opt_decimals$$)
};
goog.format.numBytesToString = function $goog$format$numBytesToString$($val$$, $opt_decimals$$, $opt_suffix$$) {
  var $suffix$$ = "";
  if(!goog.isDef($opt_suffix$$) || $opt_suffix$$) {
    $suffix$$ = "B"
  }
  return goog.format.numericValueToString_($val$$, goog.format.NUMERIC_SCALES_BINARY_, $opt_decimals$$, $suffix$$)
};
goog.format.stringToNumericValue_ = function $goog$format$stringToNumericValue_$($stringValue$$, $conversion$$) {
  var $match$$ = $stringValue$$.match(goog.format.SCALED_NUMERIC_RE_);
  return!$match$$ ? NaN : $match$$[1] * $conversion$$[$match$$[2]]
};
goog.format.numericValueToString_ = function $goog$format$numericValueToString_$($ex$$1_val$$, $conversion$$, $opt_decimals$$, $opt_suffix$$) {
  var $prefixes$$ = goog.format.NUMERIC_SCALE_PREFIXES_, $orig_val$$ = $ex$$1_val$$, $symbol$$ = "", $scale$$ = 1;
  0 > $ex$$1_val$$ && ($ex$$1_val$$ = -$ex$$1_val$$);
  for(var $i$$ = 0;$i$$ < $prefixes$$.length;$i$$++) {
    var $unit$$ = $prefixes$$[$i$$], $scale$$ = $conversion$$[$unit$$];
    if($ex$$1_val$$ >= $scale$$ || 1 >= $scale$$ && $ex$$1_val$$ > 0.1 * $scale$$) {
      $symbol$$ = $unit$$;
      break
    }
  }
  $symbol$$ ? $opt_suffix$$ && ($symbol$$ += $opt_suffix$$) : $scale$$ = 1;
  $ex$$1_val$$ = Math.pow(10, goog.isDef($opt_decimals$$) ? $opt_decimals$$ : 2);
  return Math.round($orig_val$$ / $scale$$ * $ex$$1_val$$) / $ex$$1_val$$ + $symbol$$
};
goog.format.SCALED_NUMERIC_RE_ = /^([-]?\d+\.?\d*)([K,M,G,T,P,k,m,u,n]?)[B]?$/;
goog.format.NUMERIC_SCALE_PREFIXES_ = "P T G M K  m u n".split(" ");
goog.format.NUMERIC_SCALES_SI_ = {"":1, n:1E-9, u:1E-6, m:0.001, k:1E3, K:1E3, M:1E6, G:1E9, T:1E12, P:1E15};
goog.format.NUMERIC_SCALES_BINARY_ = {"":1, n:Math.pow(1024, -3), u:Math.pow(1024, -2), m:1 / 1024, k:1024, K:1024, M:Math.pow(1024, 2), G:Math.pow(1024, 3), T:Math.pow(1024, 4), P:Math.pow(1024, 5)};
goog.format.FIRST_GRAPHEME_EXTEND_ = 768;
goog.format.isTreatedAsBreakingSpace_ = function $goog$format$isTreatedAsBreakingSpace_$($charCode$$) {
  return $charCode$$ <= goog.format.WbrToken_.SPACE || 4096 <= $charCode$$ && (8192 <= $charCode$$ && 8198 >= $charCode$$ || 8200 <= $charCode$$ && 8203 >= $charCode$$ || 5760 == $charCode$$ || 6158 == $charCode$$ || 8232 == $charCode$$ || 8233 == $charCode$$ || 8287 == $charCode$$ || 12288 == $charCode$$)
};
goog.format.isInvisibleFormattingCharacter_ = function $goog$format$isInvisibleFormattingCharacter_$($charCode$$) {
  return 8204 <= $charCode$$ && 8207 >= $charCode$$ || 8234 <= $charCode$$ && 8238 >= $charCode$$
};
goog.format.insertWordBreaksGeneric_ = function $goog$format$insertWordBreaksGeneric_$($str$$, $hasGraphemeBreak$$, $maxlen_opt_maxlen$$) {
  $maxlen_opt_maxlen$$ = $maxlen_opt_maxlen$$ || 10;
  if($maxlen_opt_maxlen$$ > $str$$.length) {
    return $str$$
  }
  for(var $rv$$ = [], $n$$ = 0, $nestingCharCode$$ = 0, $lastDumpPosition$$ = 0, $charCode$$ = 0, $i$$ = 0;$i$$ < $str$$.length;$i$$++) {
    var $isPotentiallyGraphemeExtending_lastCharCode$$ = $charCode$$, $charCode$$ = $str$$.charCodeAt($i$$), $isPotentiallyGraphemeExtending_lastCharCode$$ = $charCode$$ >= goog.format.FIRST_GRAPHEME_EXTEND_ && !$hasGraphemeBreak$$($isPotentiallyGraphemeExtending_lastCharCode$$, $charCode$$, !0);
    $n$$ >= $maxlen_opt_maxlen$$ && (!goog.format.isTreatedAsBreakingSpace_($charCode$$) && !$isPotentiallyGraphemeExtending_lastCharCode$$) && ($rv$$.push($str$$.substring($lastDumpPosition$$, $i$$), goog.format.WORD_BREAK_HTML), $lastDumpPosition$$ = $i$$, $n$$ = 0);
    $nestingCharCode$$ ? $charCode$$ == goog.format.WbrToken_.GT && $nestingCharCode$$ == goog.format.WbrToken_.LT ? $nestingCharCode$$ = 0 : $charCode$$ == goog.format.WbrToken_.SEMI_COLON && $nestingCharCode$$ == goog.format.WbrToken_.AMP && ($nestingCharCode$$ = 0, $n$$++) : $charCode$$ == goog.format.WbrToken_.LT || $charCode$$ == goog.format.WbrToken_.AMP ? $nestingCharCode$$ = $charCode$$ : goog.format.isTreatedAsBreakingSpace_($charCode$$) ? $n$$ = 0 : goog.format.isInvisibleFormattingCharacter_($charCode$$) || 
    $n$$++
  }
  $rv$$.push($str$$.substr($lastDumpPosition$$));
  return $rv$$.join("")
};
goog.format.insertWordBreaks = function $goog$format$insertWordBreaks$($str$$, $opt_maxlen$$) {
  return goog.format.insertWordBreaksGeneric_($str$$, goog.i18n.GraphemeBreak.hasGraphemeBreak, $opt_maxlen$$)
};
goog.format.conservativelyHasGraphemeBreak_ = function $goog$format$conservativelyHasGraphemeBreak_$($lastCharCode$$, $charCode$$) {
  return 1024 <= $charCode$$ && 1315 > $charCode$$
};
goog.format.insertWordBreaksBasic = function $goog$format$insertWordBreaksBasic$($str$$, $opt_maxlen$$) {
  return goog.format.insertWordBreaksGeneric_($str$$, goog.format.conservativelyHasGraphemeBreak_, $opt_maxlen$$)
};
goog.format.IS_IE8_OR_ABOVE_ = goog.userAgent.IE && goog.userAgent.isVersion(8);
goog.format.WORD_BREAK_HTML = goog.userAgent.WEBKIT ? "<wbr></wbr>" : goog.userAgent.OPERA ? "&shy;" : goog.format.IS_IE8_OR_ABOVE_ ? "&#8203;" : "<wbr>";
goog.format.WbrToken_ = {LT:60, GT:62, AMP:38, SEMI_COLON:59, SPACE:32};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3));
goog.i18n.bidi.Format = {LRE:"\u202a", RLE:"\u202b", PDF:"\u202c", LRM:"\u200e", RLM:"\u200f"};
goog.i18n.bidi.Dir = {RTL:-1, UNKNOWN:0, LTR:1};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function $goog$i18n$bidi$toDir$($givenDir$$) {
  return"number" == typeof $givenDir$$ ? 0 < $givenDir$$ ? goog.i18n.bidi.Dir.LTR : 0 > $givenDir$$ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.UNKNOWN : $givenDir$$ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u07ff\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function $goog$i18n$bidi$stripHtmlIfNeeded_$($str$$, $opt_isStripNeeded$$) {
  return $opt_isStripNeeded$$ ? $str$$.replace(goog.i18n.bidi.htmlSkipReg_, " ") : $str$$
};
goog.i18n.bidi.rtlCharReg_ = RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function $goog$i18n$bidi$hasAnyRtl$($str$$, $opt_isHtml$$) {
  return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_($str$$, $opt_isHtml$$))
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function $goog$i18n$bidi$hasAnyLtr$($str$$, $opt_isHtml$$) {
  return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_($str$$, $opt_isHtml$$))
};
goog.i18n.bidi.ltrRe_ = RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function $goog$i18n$bidi$isRtlChar$($str$$) {
  return goog.i18n.bidi.rtlRe_.test($str$$)
};
goog.i18n.bidi.isLtrChar = function $goog$i18n$bidi$isLtrChar$($str$$) {
  return goog.i18n.bidi.ltrRe_.test($str$$)
};
goog.i18n.bidi.isNeutralChar = function $goog$i18n$bidi$isNeutralChar$($str$$) {
  return!goog.i18n.bidi.isLtrChar($str$$) && !goog.i18n.bidi.isRtlChar($str$$)
};
goog.i18n.bidi.ltrDirCheckRe_ = RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function $goog$i18n$bidi$startsWithRtl$($str$$, $opt_isHtml$$) {
  return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_($str$$, $opt_isHtml$$))
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function $goog$i18n$bidi$startsWithLtr$($str$$, $opt_isHtml$$) {
  return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_($str$$, $opt_isHtml$$))
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function $goog$i18n$bidi$isNeutralText$($str$$, $opt_isHtml$$) {
  $str$$ = goog.i18n.bidi.stripHtmlIfNeeded_($str$$, $opt_isHtml$$);
  return goog.i18n.bidi.isRequiredLtrRe_.test($str$$) || !goog.i18n.bidi.hasAnyLtr($str$$) && !goog.i18n.bidi.hasAnyRtl($str$$)
};
goog.i18n.bidi.ltrExitDirCheckRe_ = RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function $goog$i18n$bidi$endsWithLtr$($str$$, $opt_isHtml$$) {
  return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_($str$$, $opt_isHtml$$))
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function $goog$i18n$bidi$endsWithRtl$($str$$, $opt_isHtml$$) {
  return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_($str$$, $opt_isHtml$$))
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = RegExp("^(ar|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)", "i");
goog.i18n.bidi.isRtlLanguage = function $goog$i18n$bidi$isRtlLanguage$($lang$$) {
  return goog.i18n.bidi.rtlLocalesRe_.test($lang$$)
};
goog.i18n.bidi.bracketGuardHtmlRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)/g;
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInHtml = function $goog$i18n$bidi$guardBracketInHtml$($s$$, $opt_isRtlContext$$) {
  return(void 0 === $opt_isRtlContext$$ ? goog.i18n.bidi.hasAnyRtl($s$$) : $opt_isRtlContext$$) ? $s$$.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=rtl>$&</span>") : $s$$.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=ltr>$&</span>")
};
goog.i18n.bidi.guardBracketInText = function $goog$i18n$bidi$guardBracketInText$($s$$, $opt_isRtlContext$$) {
  var $mark$$ = (void 0 === $opt_isRtlContext$$ ? goog.i18n.bidi.hasAnyRtl($s$$) : $opt_isRtlContext$$) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
  return $s$$.replace(goog.i18n.bidi.bracketGuardTextRe_, $mark$$ + "$&" + $mark$$)
};
goog.i18n.bidi.enforceRtlInHtml = function $goog$i18n$bidi$enforceRtlInHtml$($html$$) {
  return"<" == $html$$.charAt(0) ? $html$$.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + $html$$ + "</span>"
};
goog.i18n.bidi.enforceRtlInText = function $goog$i18n$bidi$enforceRtlInText$($text$$) {
  return goog.i18n.bidi.Format.RLE + $text$$ + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.enforceLtrInHtml = function $goog$i18n$bidi$enforceLtrInHtml$($html$$) {
  return"<" == $html$$.charAt(0) ? $html$$.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + $html$$ + "</span>"
};
goog.i18n.bidi.enforceLtrInText = function $goog$i18n$bidi$enforceLtrInText$($text$$) {
  return goog.i18n.bidi.Format.LRE + $text$$ + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function $goog$i18n$bidi$mirrorCSS$($cssStr$$) {
  return $cssStr$$.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function $goog$i18n$bidi$normalizeHebrewQuote$($str$$) {
  return $str$$.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /\d/;
goog.i18n.bidi.rtlDetectionThreshold_ = 0.4;
goog.i18n.bidi.estimateDirection = function $goog$i18n$bidi$estimateDirection$($str$$, $opt_isHtml$$) {
  for(var $rtlCount$$ = 0, $totalCount$$ = 0, $hasWeaklyLtr$$ = !1, $tokens$$ = goog.i18n.bidi.stripHtmlIfNeeded_($str$$, $opt_isHtml$$).split(goog.i18n.bidi.wordSeparatorRe_), $i$$ = 0;$i$$ < $tokens$$.length;$i$$++) {
    var $token$$ = $tokens$$[$i$$];
    goog.i18n.bidi.startsWithRtl($token$$) ? ($rtlCount$$++, $totalCount$$++) : goog.i18n.bidi.isRequiredLtrRe_.test($token$$) ? $hasWeaklyLtr$$ = !0 : goog.i18n.bidi.hasAnyLtr($token$$) ? $totalCount$$++ : goog.i18n.bidi.hasNumeralsRe_.test($token$$) && ($hasWeaklyLtr$$ = !0)
  }
  return 0 == $totalCount$$ ? $hasWeaklyLtr$$ ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.UNKNOWN : $rtlCount$$ / $totalCount$$ > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.detectRtlDirectionality = function $goog$i18n$bidi$detectRtlDirectionality$($str$$, $opt_isHtml$$) {
  return goog.i18n.bidi.estimateDirection($str$$, $opt_isHtml$$) == goog.i18n.bidi.Dir.RTL
};
goog.i18n.bidi.setElementDirAndAlign = function $goog$i18n$bidi$setElementDirAndAlign$($element$$, $dir$$) {
  if($element$$ && ($dir$$ = goog.i18n.bidi.toDir($dir$$)) != goog.i18n.bidi.Dir.UNKNOWN) {
    $element$$.style.textAlign = $dir$$ == goog.i18n.bidi.Dir.RTL ? "right" : "left", $element$$.dir = $dir$$ == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr"
  }
};
goog.i18n.BidiFormatter = function $goog$i18n$BidiFormatter$($contextDir$$, $opt_alwaysSpan$$) {
  this.contextDir_ = goog.i18n.bidi.toDir($contextDir$$);
  this.alwaysSpan_ = !!$opt_alwaysSpan$$
};
goog.i18n.BidiFormatter.prototype.getContextDir = function $goog$i18n$BidiFormatter$$getContextDir$() {
  return this.contextDir_
};
goog.i18n.BidiFormatter.prototype.getAlwaysSpan = function $goog$i18n$BidiFormatter$$getAlwaysSpan$() {
  return this.alwaysSpan_
};
goog.i18n.BidiFormatter.prototype.setContextDir = function $goog$i18n$BidiFormatter$$setContextDir$($contextDir$$) {
  this.contextDir_ = goog.i18n.bidi.toDir($contextDir$$)
};
goog.i18n.BidiFormatter.prototype.setAlwaysSpan = function $goog$i18n$BidiFormatter$$setAlwaysSpan$($alwaysSpan$$) {
  this.alwaysSpan_ = $alwaysSpan$$
};
goog.i18n.BidiFormatter.prototype.estimateDirection = goog.i18n.bidi.estimateDirection;
goog.i18n.BidiFormatter.prototype.areDirectionalitiesOpposite_ = function $goog$i18n$BidiFormatter$$areDirectionalitiesOpposite_$($dir1$$, $dir2$$) {
  return 0 > $dir1$$ * $dir2$$
};
goog.i18n.BidiFormatter.prototype.dirResetIfNeeded_ = function $goog$i18n$BidiFormatter$$dirResetIfNeeded_$($str$$, $dir$$, $opt_isHtml$$, $opt_dirReset$$) {
  return $opt_dirReset$$ && (this.areDirectionalitiesOpposite_($dir$$, this.contextDir_) || this.contextDir_ == goog.i18n.bidi.Dir.LTR && goog.i18n.bidi.endsWithRtl($str$$, $opt_isHtml$$) || this.contextDir_ == goog.i18n.bidi.Dir.RTL && goog.i18n.bidi.endsWithLtr($str$$, $opt_isHtml$$)) ? this.contextDir_ == goog.i18n.bidi.Dir.LTR ? goog.i18n.bidi.Format.LRM : goog.i18n.bidi.Format.RLM : ""
};
goog.i18n.BidiFormatter.prototype.dirAttrValue = function $goog$i18n$BidiFormatter$$dirAttrValue$($str$$, $opt_isHtml$$) {
  return this.knownDirAttrValue(this.estimateDirection($str$$, $opt_isHtml$$))
};
goog.i18n.BidiFormatter.prototype.knownDirAttrValue = function $goog$i18n$BidiFormatter$$knownDirAttrValue$($dir$$) {
  $dir$$ == goog.i18n.bidi.Dir.UNKNOWN && ($dir$$ = this.contextDir_);
  return $dir$$ == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr"
};
goog.i18n.BidiFormatter.prototype.dirAttr = function $goog$i18n$BidiFormatter$$dirAttr$($str$$, $opt_isHtml$$) {
  return this.knownDirAttr(this.estimateDirection($str$$, $opt_isHtml$$))
};
goog.i18n.BidiFormatter.prototype.knownDirAttr = function $goog$i18n$BidiFormatter$$knownDirAttr$($dir$$) {
  return $dir$$ != this.contextDir_ ? $dir$$ == goog.i18n.bidi.Dir.RTL ? 'dir="rtl"' : $dir$$ == goog.i18n.bidi.Dir.LTR ? 'dir="ltr"' : "" : ""
};
goog.i18n.BidiFormatter.prototype.spanWrap = function $goog$i18n$BidiFormatter$$spanWrap$($str$$, $opt_isHtml$$, $opt_dirReset$$) {
  var $dir$$ = this.estimateDirection($str$$, $opt_isHtml$$);
  return this.spanWrapWithKnownDir($dir$$, $str$$, $opt_isHtml$$, $opt_dirReset$$)
};
goog.i18n.BidiFormatter.prototype.spanWrapWithKnownDir = function $goog$i18n$BidiFormatter$$spanWrapWithKnownDir$($dir$$, $str$$, $opt_isHtml$$13_result$$, $opt_dirReset$$) {
  var $opt_dirReset$$ = $opt_dirReset$$ || void 0 == $opt_dirReset$$, $dirCondition$$ = $dir$$ != goog.i18n.bidi.Dir.UNKNOWN && $dir$$ != this.contextDir_;
  $opt_isHtml$$13_result$$ || ($str$$ = goog.string.htmlEscape($str$$));
  $opt_isHtml$$13_result$$ = [];
  this.alwaysSpan_ || $dirCondition$$ ? ($opt_isHtml$$13_result$$.push("<span"), $dirCondition$$ && $opt_isHtml$$13_result$$.push($dir$$ == goog.i18n.bidi.Dir.RTL ? ' dir="rtl"' : ' dir="ltr"'), $opt_isHtml$$13_result$$.push(">" + $str$$ + "</span>")) : $opt_isHtml$$13_result$$.push($str$$);
  $opt_isHtml$$13_result$$.push(this.dirResetIfNeeded_($str$$, $dir$$, !0, $opt_dirReset$$));
  return $opt_isHtml$$13_result$$.join("")
};
goog.i18n.BidiFormatter.prototype.unicodeWrap = function $goog$i18n$BidiFormatter$$unicodeWrap$($str$$, $opt_isHtml$$, $opt_dirReset$$) {
  var $dir$$ = this.estimateDirection($str$$, $opt_isHtml$$);
  return this.unicodeWrapWithKnownDir($dir$$, $str$$, $opt_isHtml$$, $opt_dirReset$$)
};
goog.i18n.BidiFormatter.prototype.unicodeWrapWithKnownDir = function $goog$i18n$BidiFormatter$$unicodeWrapWithKnownDir$($dir$$, $str$$, $opt_isHtml$$, $opt_dirReset$$) {
  var $opt_dirReset$$ = $opt_dirReset$$ || void 0 == $opt_dirReset$$, $result$$ = [];
  $dir$$ != goog.i18n.bidi.Dir.UNKNOWN && $dir$$ != this.contextDir_ ? ($result$$.push($dir$$ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.Format.RLE : goog.i18n.bidi.Format.LRE), $result$$.push($str$$), $result$$.push(goog.i18n.bidi.Format.PDF)) : $result$$.push($str$$);
  $result$$.push(this.dirResetIfNeeded_($str$$, $dir$$, $opt_isHtml$$, $opt_dirReset$$));
  return $result$$.join("")
};
goog.i18n.BidiFormatter.prototype.markAfter = function $goog$i18n$BidiFormatter$$markAfter$($str$$, $opt_isHtml$$) {
  return this.dirResetIfNeeded_($str$$, this.estimateDirection($str$$, $opt_isHtml$$), $opt_isHtml$$, !0)
};
goog.i18n.BidiFormatter.prototype.mark = function $goog$i18n$BidiFormatter$$mark$() {
  switch(this.contextDir_) {
    case goog.i18n.bidi.Dir.LTR:
      return goog.i18n.bidi.Format.LRM;
    case goog.i18n.bidi.Dir.RTL:
      return goog.i18n.bidi.Format.RLM;
    default:
      return""
  }
};
goog.i18n.BidiFormatter.prototype.startEdge = function $goog$i18n$BidiFormatter$$startEdge$() {
  return this.contextDir_ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT
};
goog.i18n.BidiFormatter.prototype.endEdge = function $goog$i18n$BidiFormatter$$endEdge$() {
  return this.contextDir_ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT
};
goog.soy = {};
goog.soy.renderElement = function $goog$soy$renderElement$($element$$, $template$$, $opt_templateData$$, $opt_injectedData$$) {
  $element$$.innerHTML = $template$$($opt_templateData$$ || goog.soy.defaultTemplateData_, void 0, $opt_injectedData$$)
};
goog.soy.renderAsFragment = function $goog$soy$renderAsFragment$($template$$, $opt_templateData$$, $opt_injectedData$$, $opt_domHelper$$) {
  return($opt_domHelper$$ || goog.dom.getDomHelper()).htmlToDocumentFragment($template$$($opt_templateData$$ || goog.soy.defaultTemplateData_, void 0, $opt_injectedData$$))
};
goog.soy.renderAsElement = function $goog$soy$renderAsElement$($firstChild_template$$, $opt_templateData$$, $opt_injectedData$$, $opt_domHelper$$) {
  $opt_domHelper$$ = ($opt_domHelper$$ || goog.dom.getDomHelper()).createElement(goog.dom.TagName.DIV);
  $opt_domHelper$$.innerHTML = $firstChild_template$$($opt_templateData$$ || goog.soy.defaultTemplateData_, void 0, $opt_injectedData$$);
  return 1 == $opt_domHelper$$.childNodes.length && ($firstChild_template$$ = $opt_domHelper$$.firstChild, $firstChild_template$$.nodeType == goog.dom.NodeType.ELEMENT) ? $firstChild_template$$ : $opt_domHelper$$
};
goog.soy.defaultTemplateData_ = {};
goog.string.StringBuffer = function $goog$string$StringBuffer$($opt_a1$$, $var_args$$) {
  null != $opt_a1$$ && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function $goog$string$StringBuffer$$set$($s$$) {
  this.buffer_ = "" + $s$$
};
goog.string.StringBuffer.prototype.append = function $goog$string$StringBuffer$$append$($a1$$, $opt_a2$$, $var_args$$) {
  this.buffer_ += $a1$$;
  if(null != $opt_a2$$) {
    for(var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
      this.buffer_ += arguments[$i$$]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function $goog$string$StringBuffer$$clear$() {
  this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function $goog$string$StringBuffer$$getLength$() {
  return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function $goog$string$StringBuffer$$toString$() {
  return this.buffer_
};
var soy = {esc:{}}, soydata = {};
soy.StringBuilder = goog.string.StringBuffer;
soydata.SanitizedContentKind = {HTML:0, JS_STR_CHARS:1, URI:2, HTML_ATTRIBUTE:3};
soydata.SanitizedContent = function $soydata$SanitizedContent$($content$$) {
  this.content = $content$$
};
soydata.SanitizedContent.prototype.toString = function $soydata$SanitizedContent$$toString$() {
  return this.content
};
soydata.SanitizedHtml = function $soydata$SanitizedHtml$($content$$) {
  soydata.SanitizedContent.call(this, $content$$)
};
goog.inherits(soydata.SanitizedHtml, soydata.SanitizedContent);
soydata.SanitizedHtml.prototype.contentKind = soydata.SanitizedContentKind.HTML;
soydata.SanitizedJsStrChars = function $soydata$SanitizedJsStrChars$($content$$) {
  soydata.SanitizedContent.call(this, $content$$)
};
goog.inherits(soydata.SanitizedJsStrChars, soydata.SanitizedContent);
soydata.SanitizedJsStrChars.prototype.contentKind = soydata.SanitizedContentKind.JS_STR_CHARS;
soydata.SanitizedUri = function $soydata$SanitizedUri$($content$$) {
  soydata.SanitizedContent.call(this, $content$$)
};
goog.inherits(soydata.SanitizedUri, soydata.SanitizedContent);
soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;
soydata.SanitizedHtmlAttribute = function $soydata$SanitizedHtmlAttribute$($content$$) {
  soydata.SanitizedContent.call(this, $content$$)
};
goog.inherits(soydata.SanitizedHtmlAttribute, soydata.SanitizedContent);
soydata.SanitizedHtmlAttribute.prototype.contentKind = soydata.SanitizedContentKind.HTML_ATTRIBUTE;
soy.renderElement = goog.soy.renderElement;
soy.renderAsFragment = function $soy$renderAsFragment$($template$$, $opt_templateData$$, $opt_document$$, $opt_injectedData$$) {
  return goog.soy.renderAsFragment($template$$, $opt_templateData$$, $opt_injectedData$$, new goog.dom.DomHelper($opt_document$$))
};
soy.renderAsElement = function $soy$renderAsElement$($template$$, $opt_templateData$$, $opt_document$$, $opt_injectedData$$) {
  return goog.soy.renderAsElement($template$$, $opt_templateData$$, $opt_injectedData$$, new goog.dom.DomHelper($opt_document$$))
};
soy.$$augmentData = function $soy$$$augmentData$($origData$$, $additionalParams$$) {
  function $TempCtor$$() {
  }
  $TempCtor$$.prototype = $origData$$;
  var $newData$$ = new $TempCtor$$, $key$$;
  for($key$$ in $additionalParams$$) {
    $newData$$[$key$$] = $additionalParams$$[$key$$]
  }
  return $newData$$
};
soy.$$getMapKeys = function $soy$$$getMapKeys$($map$$) {
  var $mapKeys$$ = [], $key$$;
  for($key$$ in $map$$) {
    $mapKeys$$.push($key$$)
  }
  return $mapKeys$$
};
soy.$$getDelegateId = function $soy$$$getDelegateId$($delTemplateName$$) {
  return $delTemplateName$$
};
soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};
soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};
soy.$$registerDelegateFn = function $soy$$$registerDelegateFn$($delTemplateId$$, $delPriority$$, $delFn$$) {
  var $mapKey$$ = "key_" + $delTemplateId$$, $currPriority$$ = soy.$$DELEGATE_REGISTRY_PRIORITIES_[$mapKey$$];
  if(void 0 === $currPriority$$ || $delPriority$$ > $currPriority$$) {
    soy.$$DELEGATE_REGISTRY_PRIORITIES_[$mapKey$$] = $delPriority$$, soy.$$DELEGATE_REGISTRY_FUNCTIONS_[$mapKey$$] = $delFn$$
  }else {
    if($delPriority$$ == $currPriority$$) {
      throw Error('Encountered two active delegates with same priority (id/name "' + $delTemplateId$$ + '").');
    }
  }
};
soy.$$getDelegateFn = function $soy$$$getDelegateFn$($delFn$$1_delTemplateId$$) {
  return($delFn$$1_delTemplateId$$ = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + $delFn$$1_delTemplateId$$]) ? $delFn$$1_delTemplateId$$ : soy.$$EMPTY_TEMPLATE_FN_
};
soy.$$EMPTY_TEMPLATE_FN_ = function $soy$$$EMPTY_TEMPLATE_FN_$() {
  return""
};
soy.$$escapeHtml = function $soy$$$escapeHtml$($value$$) {
  return"object" === typeof $value$$ && $value$$ && $value$$.contentKind === soydata.SanitizedContentKind.HTML ? $value$$.content : soy.esc.$$escapeHtmlHelper($value$$)
};
soy.$$escapeHtmlRcdata = function $soy$$$escapeHtmlRcdata$($value$$) {
  return"object" === typeof $value$$ && $value$$ && $value$$.contentKind === soydata.SanitizedContentKind.HTML ? soy.esc.$$normalizeHtmlHelper($value$$.content) : soy.esc.$$escapeHtmlHelper($value$$)
};
soy.$$stripHtmlTags = function $soy$$$stripHtmlTags$($value$$) {
  return String($value$$).replace(soy.esc.$$HTML_TAG_REGEX_, "")
};
soy.$$escapeHtmlAttribute = function $soy$$$escapeHtmlAttribute$($value$$) {
  return"object" === typeof $value$$ && $value$$ && $value$$.contentKind === soydata.SanitizedContentKind.HTML ? soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags($value$$.content)) : soy.esc.$$escapeHtmlHelper($value$$)
};
soy.$$escapeHtmlAttributeNospace = function $soy$$$escapeHtmlAttributeNospace$($value$$) {
  return"object" === typeof $value$$ && $value$$ && $value$$.contentKind === soydata.SanitizedContentKind.HTML ? soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags($value$$.content)) : soy.esc.$$escapeHtmlNospaceHelper($value$$)
};
soy.$$filterHtmlAttribute = function $soy$$$filterHtmlAttribute$($value$$) {
  return"object" === typeof $value$$ && $value$$ && $value$$.contentKind === soydata.SanitizedContentKind.HTML_ATTRIBUTE ? $value$$.content.replace(/=([^"']*)$/, '="$1"') : soy.esc.$$filterHtmlAttributeHelper($value$$)
};
soy.$$filterHtmlElementName = function $soy$$$filterHtmlElementName$($value$$) {
  return soy.esc.$$filterHtmlElementNameHelper($value$$)
};
soy.$$escapeJs = function $soy$$$escapeJs$($value$$) {
  return soy.$$escapeJsString($value$$)
};
soy.$$escapeJsString = function $soy$$$escapeJsString$($value$$) {
  return"object" === typeof $value$$ && $value$$.contentKind === soydata.SanitizedContentKind.JS_STR_CHARS ? $value$$.content : soy.esc.$$escapeJsStringHelper($value$$)
};
soy.$$escapeJsValue = function $soy$$$escapeJsValue$($value$$) {
  if(null == $value$$) {
    return" null "
  }
  switch(typeof $value$$) {
    case "boolean":
    ;
    case "number":
      return" " + $value$$ + " ";
    default:
      return"'" + soy.esc.$$escapeJsStringHelper(String($value$$)) + "'"
  }
};
soy.$$escapeJsRegex = function $soy$$$escapeJsRegex$($value$$) {
  return soy.esc.$$escapeJsRegexHelper($value$$)
};
soy.$$problematicUriMarks_ = /['()]/g;
soy.$$pctEncode_ = function $soy$$$pctEncode_$($ch$$) {
  return"%" + $ch$$.charCodeAt(0).toString(16)
};
soy.$$escapeUri = function $soy$$$escapeUri$($encoded_value$$) {
  if("object" === typeof $encoded_value$$ && $encoded_value$$.contentKind === soydata.SanitizedContentKind.URI) {
    return soy.$$normalizeUri($encoded_value$$)
  }
  $encoded_value$$ = soy.esc.$$escapeUriHelper($encoded_value$$);
  soy.$$problematicUriMarks_.lastIndex = 0;
  return soy.$$problematicUriMarks_.test($encoded_value$$) ? $encoded_value$$.replace(soy.$$problematicUriMarks_, soy.$$pctEncode_) : $encoded_value$$
};
soy.$$normalizeUri = function $soy$$$normalizeUri$($value$$) {
  return soy.esc.$$normalizeUriHelper($value$$)
};
soy.$$filterNormalizeUri = function $soy$$$filterNormalizeUri$($value$$) {
  return soy.esc.$$filterNormalizeUriHelper($value$$)
};
soy.$$escapeCssString = function $soy$$$escapeCssString$($value$$) {
  return soy.esc.$$escapeCssStringHelper($value$$)
};
soy.$$filterCssValue = function $soy$$$filterCssValue$($value$$) {
  return null == $value$$ ? "" : soy.esc.$$filterCssValueHelper($value$$)
};
soy.$$changeNewlineToBr = function $soy$$$changeNewlineToBr$($str$$) {
  return goog.string.newLineToBr(String($str$$), !1)
};
soy.$$insertWordBreaks = function $soy$$$insertWordBreaks$($str$$, $maxCharsBetweenWordBreaks$$) {
  return goog.format.insertWordBreaks(String($str$$), $maxCharsBetweenWordBreaks$$)
};
soy.$$truncate = function $soy$$$truncate$($str$$, $maxLen$$, $doAddEllipsis$$) {
  $str$$ = String($str$$);
  if($str$$.length <= $maxLen$$) {
    return $str$$
  }
  $doAddEllipsis$$ && (3 < $maxLen$$ ? $maxLen$$ -= 3 : $doAddEllipsis$$ = !1);
  soy.$$isHighSurrogate_($str$$.charAt($maxLen$$ - 1)) && soy.$$isLowSurrogate_($str$$.charAt($maxLen$$)) && ($maxLen$$ -= 1);
  $str$$ = $str$$.substring(0, $maxLen$$);
  $doAddEllipsis$$ && ($str$$ += "...");
  return $str$$
};
soy.$$isHighSurrogate_ = function $soy$$$isHighSurrogate_$($ch$$) {
  return 55296 <= $ch$$ && 56319 >= $ch$$
};
soy.$$isLowSurrogate_ = function $soy$$$isLowSurrogate_$($ch$$) {
  return 56320 <= $ch$$ && 57343 >= $ch$$
};
soy.$$bidiFormatterCache_ = {};
soy.$$getBidiFormatterInstance_ = function $soy$$$getBidiFormatterInstance_$($bidiGlobalDir$$) {
  return soy.$$bidiFormatterCache_[$bidiGlobalDir$$] || (soy.$$bidiFormatterCache_[$bidiGlobalDir$$] = new goog.i18n.BidiFormatter($bidiGlobalDir$$))
};
soy.$$bidiTextDir = function $soy$$$bidiTextDir$($text$$, $opt_isHtml$$) {
  return!$text$$ ? 0 : goog.i18n.bidi.detectRtlDirectionality($text$$, $opt_isHtml$$) ? -1 : 1
};
soy.$$bidiDirAttr = function $soy$$$bidiDirAttr$($bidiGlobalDir$$, $text$$, $opt_isHtml$$) {
  return new soydata.SanitizedHtmlAttribute(soy.$$getBidiFormatterInstance_($bidiGlobalDir$$).dirAttr($text$$, $opt_isHtml$$))
};
soy.$$bidiMarkAfter = function $soy$$$bidiMarkAfter$($bidiGlobalDir$$, $text$$, $opt_isHtml$$) {
  return soy.$$getBidiFormatterInstance_($bidiGlobalDir$$).markAfter($text$$, $opt_isHtml$$)
};
soy.$$bidiSpanWrap = function $soy$$$bidiSpanWrap$($bidiGlobalDir$$, $str$$) {
  return soy.$$getBidiFormatterInstance_($bidiGlobalDir$$).spanWrap($str$$ + "", !0)
};
soy.$$bidiUnicodeWrap = function $soy$$$bidiUnicodeWrap$($bidiGlobalDir$$, $str$$) {
  return soy.$$getBidiFormatterInstance_($bidiGlobalDir$$).unicodeWrap($str$$ + "", !0)
};
soy.esc.$$escapeUriHelper = function $soy$esc$$$escapeUriHelper$($v$$) {
  return goog.string.urlEncode(String($v$$))
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = {"\x00":"&#0;", '"':"&quot;", "&":"&amp;", "'":"&#39;", "<":"&lt;", ">":"&gt;", "\t":"&#9;", "\n":"&#10;", "\x0B":"&#11;", "\f":"&#12;", "\r":"&#13;", " ":"&#32;", "-":"&#45;", "/":"&#47;", "=":"&#61;", "`":"&#96;", "\u0085":"&#133;", "\u00a0":"&#160;", "\u2028":"&#8232;", "\u2029":"&#8233;"};
soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = function $soy$esc$$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$($ch$$) {
  return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[$ch$$]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = {"\x00":"\\x00", "\b":"\\x08", "\t":"\\t", "\n":"\\n", "\x0B":"\\x0b", "\f":"\\f", "\r":"\\r", '"':"\\x22", "&":"\\x26", "'":"\\x27", "/":"\\/", "<":"\\x3c", "=":"\\x3d", ">":"\\x3e", "\\":"\\\\", "\u0085":"\\x85", "\u2028":"\\u2028", "\u2029":"\\u2029", $:"\\x24", "(":"\\x28", ")":"\\x29", "*":"\\x2a", "+":"\\x2b", ",":"\\x2c", "-":"\\x2d", ".":"\\x2e", ":":"\\x3a", "?":"\\x3f", "[":"\\x5b", "]":"\\x5d", "^":"\\x5e", "{":"\\x7b", 
"|":"\\x7c", "}":"\\x7d"};
soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = function $soy$esc$$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_$($ch$$) {
  return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[$ch$$]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_ = {"\x00":"\\0 ", "\b":"\\8 ", "\t":"\\9 ", "\n":"\\a ", "\x0B":"\\b ", "\f":"\\c ", "\r":"\\d ", '"':"\\22 ", "&":"\\26 ", "'":"\\27 ", "(":"\\28 ", ")":"\\29 ", "*":"\\2a ", "/":"\\2f ", ":":"\\3a ", ";":"\\3b ", "<":"\\3c ", "=":"\\3d ", ">":"\\3e ", "@":"\\40 ", "\\":"\\5c ", "{":"\\7b ", "}":"\\7d ", "\u0085":"\\85 ", "\u00a0":"\\a0 ", "\u2028":"\\2028 ", "\u2029":"\\2029 "};
soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_ = function $soy$esc$$$REPLACER_FOR_ESCAPE_CSS_STRING_$($ch$$) {
  return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[$ch$$]
};
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = {"\x00":"%00", "\u0001":"%01", "\u0002":"%02", "\u0003":"%03", "\u0004":"%04", "\u0005":"%05", "\u0006":"%06", "\u0007":"%07", "\b":"%08", "\t":"%09", "\n":"%0A", "\x0B":"%0B", "\f":"%0C", "\r":"%0D", "\u000e":"%0E", "\u000f":"%0F", "\u0010":"%10", "\u0011":"%11", "\u0012":"%12", "\u0013":"%13", "\u0014":"%14", "\u0015":"%15", "\u0016":"%16", "\u0017":"%17", "\u0018":"%18", "\u0019":"%19", "\u001a":"%1A", "\u001b":"%1B", "\u001c":"%1C", 
"\u001d":"%1D", "\u001e":"%1E", "\u001f":"%1F", " ":"%20", '"':"%22", "'":"%27", "(":"%28", ")":"%29", "<":"%3C", ">":"%3E", "\\":"%5C", "{":"%7B", "}":"%7D", "\u007f":"%7F", "\u0085":"%C2%85", "\u00a0":"%C2%A0", "\u2028":"%E2%80%A8", "\u2029":"%E2%80%A9", "\uff01":"%EF%BC%81", "\uff03":"%EF%BC%83", "\uff04":"%EF%BC%84", "\uff06":"%EF%BC%86", "\uff07":"%EF%BC%87", "\uff08":"%EF%BC%88", "\uff09":"%EF%BC%89", "\uff0a":"%EF%BC%8A", "\uff0b":"%EF%BC%8B", "\uff0c":"%EF%BC%8C", "\uff0f":"%EF%BC%8F", "\uff1a":"%EF%BC%9A", 
"\uff1b":"%EF%BC%9B", "\uff1d":"%EF%BC%9D", "\uff1f":"%EF%BC%9F", "\uff20":"%EF%BC%A0", "\uff3b":"%EF%BC%BB", "\uff3d":"%EF%BC%BD"};
soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = function $soy$esc$$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_$($ch$$) {
  return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[$ch$$]
};
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_ = /[\x00\x22\x26\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_ = /[\x00\x22\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_ = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_ = /[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_ = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;
soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_ = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_ = /^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTE_ = /^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_ = /^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i;
soy.esc.$$escapeHtmlHelper = function $soy$esc$$$escapeHtmlHelper$($value$$) {
  return String($value$$).replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$normalizeHtmlHelper = function $soy$esc$$$normalizeHtmlHelper$($value$$) {
  return String($value$$).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeHtmlNospaceHelper = function $soy$esc$$$escapeHtmlNospaceHelper$($value$$) {
  return String($value$$).replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$normalizeHtmlNospaceHelper = function $soy$esc$$$normalizeHtmlNospaceHelper$($value$$) {
  return String($value$$).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeJsStringHelper = function $soy$esc$$$escapeJsStringHelper$($value$$) {
  return String($value$$).replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeJsRegexHelper = function $soy$esc$$$escapeJsRegexHelper$($value$$) {
  return String($value$$).replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeCssStringHelper = function $soy$esc$$$escapeCssStringHelper$($value$$) {
  return String($value$$).replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_)
};
soy.esc.$$filterCssValueHelper = function $soy$esc$$$filterCssValueHelper$($str$$82_value$$) {
  $str$$82_value$$ = String($str$$82_value$$);
  return!soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test($str$$82_value$$) ? (goog.asserts.fail("Bad value `%s` for |filterCssValue", [$str$$82_value$$]), "zSoyz") : $str$$82_value$$
};
soy.esc.$$normalizeUriHelper = function $soy$esc$$$normalizeUriHelper$($value$$) {
  return String($value$$).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_)
};
soy.esc.$$filterNormalizeUriHelper = function $soy$esc$$$filterNormalizeUriHelper$($str$$84_value$$) {
  $str$$84_value$$ = String($str$$84_value$$);
  return!soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test($str$$84_value$$) ? (goog.asserts.fail("Bad value `%s` for |filterNormalizeUri", [$str$$84_value$$]), "zSoyz") : $str$$84_value$$.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_)
};
soy.esc.$$filterHtmlAttributeHelper = function $soy$esc$$$filterHtmlAttributeHelper$($str$$85_value$$) {
  $str$$85_value$$ = String($str$$85_value$$);
  return!soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTE_.test($str$$85_value$$) ? (goog.asserts.fail("Bad value `%s` for |filterHtmlAttribute", [$str$$85_value$$]), "zSoyz") : $str$$85_value$$
};
soy.esc.$$filterHtmlElementNameHelper = function $soy$esc$$$filterHtmlElementNameHelper$($str$$86_value$$) {
  $str$$86_value$$ = String($str$$86_value$$);
  return!soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test($str$$86_value$$) ? (goog.asserts.fail("Bad value `%s` for |filterHtmlElementName", [$str$$86_value$$]), "zSoyz") : $str$$86_value$$
};
soy.esc.$$HTML_TAG_REGEX_ = /<(?:!|\/?[a-zA-Z])(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
var vgps3 = {templates:{}};
vgps3.templates.about = function $vgps3$templates$about$() {
  return"<p>VisuGps v" + vgps3.VERSION + ' \u00a9 2012 Victor Berchet</p><ul id="about-social"><li class="icon-twitter-sign icon-large"><a href="http://twitter.com/vberchet">@vberchet</a></li><li class="icon-github-sign icon-large"><a href="http://github.com/vicb">vicb</a></li></ul><p>Propuls\u00e9 par <a href="https://developers.google.com/maps/documentation/javascript/">Google Maps</a> et <a href="https://developers.google.com/chart/">Google Chart Tools</a></p><p>Utiliser <a href="https://github.com/vicb/VisuGps3">github</a> pour les bugs et suggestions</p>'
};
goog.disposable = {};
goog.disposable.IDisposable = function $goog$disposable$IDisposable$() {
};
goog.Disposable = function $goog$Disposable$() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (this.creationStack = Error().stack, goog.Disposable.instances_[goog.getUid(this)] = this)
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function $goog$Disposable$getUndisposedObjects$() {
  var $ret$$ = [], $id$$;
  for($id$$ in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty($id$$) && $ret$$.push(goog.Disposable.instances_[Number($id$$)])
  }
  return $ret$$
};
goog.Disposable.clearUndisposedObjects = function $goog$Disposable$clearUndisposedObjects$() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function $goog$Disposable$$isDisposed$() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function $goog$Disposable$$dispose$() {
  if(!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var $uid$$ = goog.getUid(this);
    if(goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty($uid$$)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[$uid$$]
  }
};
goog.Disposable.prototype.registerDisposable = function $goog$Disposable$$registerDisposable$($disposable$$) {
  this.dependentDisposables_ || (this.dependentDisposables_ = []);
  this.dependentDisposables_.push($disposable$$)
};
goog.Disposable.prototype.addOnDisposeCallback = function $goog$Disposable$$addOnDisposeCallback$($callback$$, $opt_scope$$) {
  this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []);
  this.onDisposeCallbacks_.push(goog.bind($callback$$, $opt_scope$$))
};
goog.Disposable.prototype.disposeInternal = function $goog$Disposable$$disposeInternal$() {
  this.dependentDisposables_ && goog.disposeAll.apply(null, this.dependentDisposables_);
  if(this.onDisposeCallbacks_) {
    for(;this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()()
    }
  }
};
goog.Disposable.isDisposed = function $goog$Disposable$isDisposed$($obj$$) {
  return $obj$$ && "function" == typeof $obj$$.isDisposed ? $obj$$.isDisposed() : !1
};
goog.dispose = function $goog$dispose$($obj$$) {
  $obj$$ && "function" == typeof $obj$$.dispose && $obj$$.dispose()
};
goog.disposeAll = function $goog$disposeAll$($var_args$$) {
  for(var $i$$ = 0, $len$$ = arguments.length;$i$$ < $len$$;++$i$$) {
    var $disposable$$ = arguments[$i$$];
    goog.isArrayLike($disposable$$) ? goog.disposeAll.apply(null, $disposable$$) : goog.dispose($disposable$$)
  }
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function $goog$debug$EntryPointMonitor$() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function $goog$debug$entryPointRegistry$register$($callback$$) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = $callback$$;
  if(goog.debug.entryPointRegistry.monitorsMayExist_) {
    for(var $monitors$$ = goog.debug.entryPointRegistry.monitors_, $i$$ = 0;$i$$ < $monitors$$.length;$i$$++) {
      $callback$$(goog.bind($monitors$$[$i$$].wrap, $monitors$$[$i$$]))
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function $goog$debug$entryPointRegistry$monitorAll$($monitor$$) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for(var $transformer$$ = goog.bind($monitor$$.wrap, $monitor$$), $i$$ = 0;$i$$ < goog.debug.entryPointRegistry.refList_.length;$i$$++) {
    goog.debug.entryPointRegistry.refList_[$i$$]($transformer$$)
  }
  goog.debug.entryPointRegistry.monitors_.push($monitor$$)
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function $goog$debug$entryPointRegistry$unmonitorAllIfPossible$($monitor$$1_transformer$$) {
  var $monitors$$ = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert($monitor$$1_transformer$$ == $monitors$$[$monitors$$.length - 1], "Only the most recent monitor can be unwrapped.");
  for(var $monitor$$1_transformer$$ = goog.bind($monitor$$1_transformer$$.unwrap, $monitor$$1_transformer$$), $i$$ = 0;$i$$ < goog.debug.entryPointRegistry.refList_.length;$i$$++) {
    goog.debug.entryPointRegistry.refList_[$i$$]($monitor$$1_transformer$$)
  }
  $monitors$$.length--
};
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function $goog$debug$errorHandlerWeakDep$protectEntryPoint$($fn$$) {
  return $fn$$
}};
goog.events = {};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT || goog.userAgent.isVersion("528"), HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO && goog.userAgent.isVersion("1.9b") || goog.userAgent.IE && goog.userAgent.isVersion("8") || goog.userAgent.OPERA && 
goog.userAgent.isVersion("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersion("528"), HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO && !goog.userAgent.isVersion("8") || goog.userAgent.IE && !goog.userAgent.isVersion("9")};
goog.events.Event = function $goog$events$Event$($type$$, $opt_target$$) {
  this.type = $type$$;
  this.currentTarget = this.target = $opt_target$$
};
goog.events.Event.prototype.disposeInternal = function $goog$events$Event$$disposeInternal$() {
};
goog.events.Event.prototype.dispose = function $goog$events$Event$$dispose$() {
};
goog.events.Event.prototype.propagationStopped_ = !1;
goog.events.Event.prototype.defaultPrevented = !1;
goog.events.Event.prototype.returnValue_ = !0;
goog.events.Event.prototype.stopPropagation = function $goog$events$Event$$stopPropagation$() {
  this.propagationStopped_ = !0
};
goog.events.Event.prototype.preventDefault = function $goog$events$Event$$preventDefault$() {
  this.defaultPrevented = !0;
  this.returnValue_ = !1
};
goog.events.Event.stopPropagation = function $goog$events$Event$stopPropagation$($e$$) {
  $e$$.stopPropagation()
};
goog.events.Event.preventDefault = function $goog$events$Event$preventDefault$($e$$) {
  $e$$.preventDefault()
};
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", 
DRAGSTART:"dragstart", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", CONTEXTMENU:"contextmenu", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", 
BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", ONLINE:"online", OFFLINE:"offline", MESSAGE:"message", CONNECT:"connect", TRANSITIONEND:goog.userAgent.WEBKIT ? "webkitTransitionEnd" : goog.userAgent.OPERA ? "oTransitionEnd" : "transitionend"};
goog.reflect = {};
goog.reflect.object = function $goog$reflect$object$($type$$, $object$$) {
  return $object$$
};
goog.reflect.sinkValue = function $goog$reflect$sinkValue$($x$$) {
  goog.reflect.sinkValue[" "]($x$$);
  return $x$$
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function $goog$reflect$canAccessProperty$($obj$$, $prop$$) {
  try {
    return goog.reflect.sinkValue($obj$$[$prop$$]), !0
  }catch($e$$) {
  }
  return!1
};
goog.events.BrowserEvent = function $goog$events$BrowserEvent$($opt_e$$, $opt_currentTarget$$) {
  $opt_e$$ && this.init($opt_e$$, $opt_currentTarget$$)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = !1;
goog.events.BrowserEvent.prototype.altKey = !1;
goog.events.BrowserEvent.prototype.shiftKey = !1;
goog.events.BrowserEvent.prototype.metaKey = !1;
goog.events.BrowserEvent.prototype.platformModifierKey = !1;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function $goog$events$BrowserEvent$$init$($e$$, $opt_currentTarget$$) {
  var $type$$ = this.type = $e$$.type;
  goog.events.Event.call(this, $type$$);
  this.target = $e$$.target || $e$$.srcElement;
  this.currentTarget = $opt_currentTarget$$;
  var $relatedTarget$$ = $e$$.relatedTarget;
  $relatedTarget$$ ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty($relatedTarget$$, "nodeName") || ($relatedTarget$$ = null)) : $type$$ == goog.events.EventType.MOUSEOVER ? $relatedTarget$$ = $e$$.fromElement : $type$$ == goog.events.EventType.MOUSEOUT && ($relatedTarget$$ = $e$$.toElement);
  this.relatedTarget = $relatedTarget$$;
  this.offsetX = goog.userAgent.WEBKIT || void 0 !== $e$$.offsetX ? $e$$.offsetX : $e$$.layerX;
  this.offsetY = goog.userAgent.WEBKIT || void 0 !== $e$$.offsetY ? $e$$.offsetY : $e$$.layerY;
  this.clientX = void 0 !== $e$$.clientX ? $e$$.clientX : $e$$.pageX;
  this.clientY = void 0 !== $e$$.clientY ? $e$$.clientY : $e$$.pageY;
  this.screenX = $e$$.screenX || 0;
  this.screenY = $e$$.screenY || 0;
  this.button = $e$$.button;
  this.keyCode = $e$$.keyCode || 0;
  this.charCode = $e$$.charCode || ("keypress" == $type$$ ? $e$$.keyCode : 0);
  this.ctrlKey = $e$$.ctrlKey;
  this.altKey = $e$$.altKey;
  this.shiftKey = $e$$.shiftKey;
  this.metaKey = $e$$.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? $e$$.metaKey : $e$$.ctrlKey;
  this.state = $e$$.state;
  this.event_ = $e$$;
  $e$$.defaultPrevented && this.preventDefault();
  delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function $goog$events$BrowserEvent$$isButton$($button$$) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == $button$$ : "click" == this.type ? $button$$ == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[$button$$])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function $goog$events$BrowserEvent$$isMouseActionButton$() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function $goog$events$BrowserEvent$$stopPropagation$() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog.events.BrowserEvent.prototype.preventDefault = function $goog$events$BrowserEvent$$preventDefault$() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var $be$$ = this.event_;
  if($be$$.preventDefault) {
    $be$$.preventDefault()
  }else {
    if($be$$.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if($be$$.ctrlKey || 112 <= $be$$.keyCode && 123 >= $be$$.keyCode) {
          $be$$.keyCode = -1
        }
      }catch($ex$$) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function $goog$events$BrowserEvent$$getBrowserEvent$() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function $goog$events$BrowserEvent$$disposeInternal$() {
};
goog.events.EventWrapper = function $goog$events$EventWrapper$() {
};
goog.events.EventWrapper.prototype.listen = function $goog$events$EventWrapper$$listen$() {
};
goog.events.EventWrapper.prototype.unlisten = function $goog$events$EventWrapper$$unlisten$() {
};
goog.events.Listener = function $goog$events$Listener$() {
  goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack)
};
goog.events.Listener.counter_ = 0;
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = !1;
goog.events.Listener.prototype.callOnce = !1;
goog.events.Listener.prototype.init = function $goog$events$Listener$$init$($listener$$, $proxy$$, $src$$, $type$$, $capture$$, $opt_handler$$) {
  if(goog.isFunction($listener$$)) {
    this.isFunctionListener_ = !0
  }else {
    if($listener$$ && $listener$$.handleEvent && goog.isFunction($listener$$.handleEvent)) {
      this.isFunctionListener_ = !1
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = $listener$$;
  this.proxy = $proxy$$;
  this.src = $src$$;
  this.type = $type$$;
  this.capture = !!$capture$$;
  this.handler = $opt_handler$$;
  this.callOnce = !1;
  this.key = ++goog.events.Listener.counter_;
  this.removed = !1
};
goog.events.Listener.prototype.handleEvent = function $goog$events$Listener$$handleEvent$($eventObject$$) {
  return this.isFunctionListener_ ? this.listener.call(this.handler || this.src, $eventObject$$) : this.listener.handleEvent.call(this.listener, $eventObject$$)
};
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function $goog$events$listen$($src$$, $type$$, $key$$55_listener$$, $capture$$1_opt_capt$$, $opt_handler$$) {
  if($type$$) {
    if(goog.isArray($type$$)) {
      for(var $i$$68_proxy$$ = 0;$i$$68_proxy$$ < $type$$.length;$i$$68_proxy$$++) {
        goog.events.listen($src$$, $type$$[$i$$68_proxy$$], $key$$55_listener$$, $capture$$1_opt_capt$$, $opt_handler$$)
      }
      return null
    }
    var $capture$$1_opt_capt$$ = !!$capture$$1_opt_capt$$, $listenerObj_map$$ = goog.events.listenerTree_;
    $type$$ in $listenerObj_map$$ || ($listenerObj_map$$[$type$$] = {count_:0, remaining_:0});
    $listenerObj_map$$ = $listenerObj_map$$[$type$$];
    $capture$$1_opt_capt$$ in $listenerObj_map$$ || ($listenerObj_map$$[$capture$$1_opt_capt$$] = {count_:0, remaining_:0}, $listenerObj_map$$.count_++);
    var $listenerObj_map$$ = $listenerObj_map$$[$capture$$1_opt_capt$$], $srcUid$$ = goog.getUid($src$$), $listenerArray$$;
    $listenerObj_map$$.remaining_++;
    if($listenerObj_map$$[$srcUid$$]) {
      $listenerArray$$ = $listenerObj_map$$[$srcUid$$];
      for($i$$68_proxy$$ = 0;$i$$68_proxy$$ < $listenerArray$$.length;$i$$68_proxy$$++) {
        if($listenerObj_map$$ = $listenerArray$$[$i$$68_proxy$$], $listenerObj_map$$.listener == $key$$55_listener$$ && $listenerObj_map$$.handler == $opt_handler$$) {
          if($listenerObj_map$$.removed) {
            break
          }
          return $listenerArray$$[$i$$68_proxy$$].key
        }
      }
    }else {
      $listenerArray$$ = $listenerObj_map$$[$srcUid$$] = [], $listenerObj_map$$.count_++
    }
    $i$$68_proxy$$ = goog.events.getProxy();
    $i$$68_proxy$$.src = $src$$;
    $listenerObj_map$$ = new goog.events.Listener;
    $listenerObj_map$$.init($key$$55_listener$$, $i$$68_proxy$$, $src$$, $type$$, $capture$$1_opt_capt$$, $opt_handler$$);
    $key$$55_listener$$ = $listenerObj_map$$.key;
    $i$$68_proxy$$.key = $key$$55_listener$$;
    $listenerArray$$.push($listenerObj_map$$);
    goog.events.listeners_[$key$$55_listener$$] = $listenerObj_map$$;
    goog.events.sources_[$srcUid$$] || (goog.events.sources_[$srcUid$$] = []);
    goog.events.sources_[$srcUid$$].push($listenerObj_map$$);
    $src$$.addEventListener ? ($src$$ == goog.global || !$src$$.customEvent_) && $src$$.addEventListener($type$$, $i$$68_proxy$$, $capture$$1_opt_capt$$) : $src$$.attachEvent(goog.events.getOnString_($type$$), $i$$68_proxy$$);
    return $key$$55_listener$$
  }
  throw Error("Invalid event type");
};
goog.events.getProxy = function $goog$events$getProxy$() {
  var $proxyCallbackFunction$$ = goog.events.handleBrowserEvent_, $f$$ = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function($eventObject$$) {
    return $proxyCallbackFunction$$.call($f$$.src, $f$$.key, $eventObject$$)
  } : function($eventObject$$2_v$$) {
    $eventObject$$2_v$$ = $proxyCallbackFunction$$.call($f$$.src, $f$$.key, $eventObject$$2_v$$);
    if(!$eventObject$$2_v$$) {
      return $eventObject$$2_v$$
    }
  };
  return $f$$
};
goog.events.listenOnce = function $goog$events$listenOnce$($key$$56_src$$, $type$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  if(goog.isArray($type$$)) {
    for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
      goog.events.listenOnce($key$$56_src$$, $type$$[$i$$], $listener$$, $opt_capt$$, $opt_handler$$)
    }
    return null
  }
  $key$$56_src$$ = goog.events.listen($key$$56_src$$, $type$$, $listener$$, $opt_capt$$, $opt_handler$$);
  goog.events.listeners_[$key$$56_src$$].callOnce = !0;
  return $key$$56_src$$
};
goog.events.listenWithWrapper = function $goog$events$listenWithWrapper$($src$$, $wrapper$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  $wrapper$$.listen($src$$, $listener$$, $opt_capt$$, $opt_handler$$)
};
goog.events.unlisten = function $goog$events$unlisten$($listenerArray$$1_src$$, $type$$, $listener$$, $capture$$2_opt_capt$$, $opt_handler$$) {
  if(goog.isArray($type$$)) {
    for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
      goog.events.unlisten($listenerArray$$1_src$$, $type$$[$i$$], $listener$$, $capture$$2_opt_capt$$, $opt_handler$$)
    }
    return null
  }
  $capture$$2_opt_capt$$ = !!$capture$$2_opt_capt$$;
  $listenerArray$$1_src$$ = goog.events.getListeners_($listenerArray$$1_src$$, $type$$, $capture$$2_opt_capt$$);
  if(!$listenerArray$$1_src$$) {
    return!1
  }
  for($i$$ = 0;$i$$ < $listenerArray$$1_src$$.length;$i$$++) {
    if($listenerArray$$1_src$$[$i$$].listener == $listener$$ && $listenerArray$$1_src$$[$i$$].capture == $capture$$2_opt_capt$$ && $listenerArray$$1_src$$[$i$$].handler == $opt_handler$$) {
      return goog.events.unlistenByKey($listenerArray$$1_src$$[$i$$].key)
    }
  }
  return!1
};
goog.events.unlistenByKey = function $goog$events$unlistenByKey$($key$$) {
  if(!goog.events.listeners_[$key$$]) {
    return!1
  }
  var $listener$$39_listenerArray$$ = goog.events.listeners_[$key$$];
  if($listener$$39_listenerArray$$.removed) {
    return!1
  }
  var $src$$11_srcUid$$ = $listener$$39_listenerArray$$.src, $type$$ = $listener$$39_listenerArray$$.type, $proxy$$ = $listener$$39_listenerArray$$.proxy, $capture$$ = $listener$$39_listenerArray$$.capture;
  $src$$11_srcUid$$.removeEventListener ? ($src$$11_srcUid$$ == goog.global || !$src$$11_srcUid$$.customEvent_) && $src$$11_srcUid$$.removeEventListener($type$$, $proxy$$, $capture$$) : $src$$11_srcUid$$.detachEvent && $src$$11_srcUid$$.detachEvent(goog.events.getOnString_($type$$), $proxy$$);
  $src$$11_srcUid$$ = goog.getUid($src$$11_srcUid$$);
  goog.events.sources_[$src$$11_srcUid$$] && ($proxy$$ = goog.events.sources_[$src$$11_srcUid$$], goog.array.remove($proxy$$, $listener$$39_listenerArray$$), 0 == $proxy$$.length && delete goog.events.sources_[$src$$11_srcUid$$]);
  $listener$$39_listenerArray$$.removed = !0;
  if($listener$$39_listenerArray$$ = goog.events.listenerTree_[$type$$][$capture$$][$src$$11_srcUid$$]) {
    $listener$$39_listenerArray$$.needsCleanup_ = !0, goog.events.cleanUp_($type$$, $capture$$, $src$$11_srcUid$$, $listener$$39_listenerArray$$)
  }
  delete goog.events.listeners_[$key$$];
  return!0
};
goog.events.unlistenWithWrapper = function $goog$events$unlistenWithWrapper$($src$$, $wrapper$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  $wrapper$$.unlisten($src$$, $listener$$, $opt_capt$$, $opt_handler$$)
};
goog.events.cleanUp_ = function $goog$events$cleanUp_$($type$$, $capture$$, $srcUid$$, $listenerArray$$) {
  if(!$listenerArray$$.locked_ && $listenerArray$$.needsCleanup_) {
    for(var $oldIndex$$ = 0, $newIndex$$ = 0;$oldIndex$$ < $listenerArray$$.length;$oldIndex$$++) {
      $listenerArray$$[$oldIndex$$].removed ? $listenerArray$$[$oldIndex$$].proxy.src = null : ($oldIndex$$ != $newIndex$$ && ($listenerArray$$[$newIndex$$] = $listenerArray$$[$oldIndex$$]), $newIndex$$++)
    }
    $listenerArray$$.length = $newIndex$$;
    $listenerArray$$.needsCleanup_ = !1;
    0 == $newIndex$$ && (delete goog.events.listenerTree_[$type$$][$capture$$][$srcUid$$], goog.events.listenerTree_[$type$$][$capture$$].count_--, 0 == goog.events.listenerTree_[$type$$][$capture$$].count_ && (delete goog.events.listenerTree_[$type$$][$capture$$], goog.events.listenerTree_[$type$$].count_--), 0 == goog.events.listenerTree_[$type$$].count_ && delete goog.events.listenerTree_[$type$$])
  }
};
goog.events.removeAll = function $goog$events$removeAll$($opt_obj$$26_sourcesArray$$1_srcUid$$, $opt_type$$, $opt_capt$$) {
  var $count$$ = 0, $noType$$ = null == $opt_type$$, $noCapt$$ = null == $opt_capt$$, $opt_capt$$ = !!$opt_capt$$;
  if(null == $opt_obj$$26_sourcesArray$$1_srcUid$$) {
    goog.object.forEach(goog.events.sources_, function($listeners$$) {
      for(var $i$$ = $listeners$$.length - 1;0 <= $i$$;$i$$--) {
        var $listener$$ = $listeners$$[$i$$];
        if(($noType$$ || $opt_type$$ == $listener$$.type) && ($noCapt$$ || $opt_capt$$ == $listener$$.capture)) {
          goog.events.unlistenByKey($listener$$.key), $count$$++
        }
      }
    })
  }else {
    if($opt_obj$$26_sourcesArray$$1_srcUid$$ = goog.getUid($opt_obj$$26_sourcesArray$$1_srcUid$$), goog.events.sources_[$opt_obj$$26_sourcesArray$$1_srcUid$$]) {
      for(var $opt_obj$$26_sourcesArray$$1_srcUid$$ = goog.events.sources_[$opt_obj$$26_sourcesArray$$1_srcUid$$], $i$$0$$ = $opt_obj$$26_sourcesArray$$1_srcUid$$.length - 1;0 <= $i$$0$$;$i$$0$$--) {
        var $listener$$0$$ = $opt_obj$$26_sourcesArray$$1_srcUid$$[$i$$0$$];
        if(($noType$$ || $opt_type$$ == $listener$$0$$.type) && ($noCapt$$ || $opt_capt$$ == $listener$$0$$.capture)) {
          goog.events.unlistenByKey($listener$$0$$.key), $count$$++
        }
      }
    }
  }
  return $count$$
};
goog.events.getListeners = function $goog$events$getListeners$($obj$$, $type$$, $capture$$) {
  return goog.events.getListeners_($obj$$, $type$$, $capture$$) || []
};
goog.events.getListeners_ = function $goog$events$getListeners_$($obj$$, $type$$, $capture$$) {
  var $map$$ = goog.events.listenerTree_;
  return $type$$ in $map$$ && ($map$$ = $map$$[$type$$], $capture$$ in $map$$ && ($map$$ = $map$$[$capture$$], $obj$$ = goog.getUid($obj$$), $map$$[$obj$$])) ? $map$$[$obj$$] : null
};
goog.events.getListener = function $goog$events$getListener$($listenerArray$$4_src$$, $i$$73_type$$, $listener$$, $capture$$7_opt_capt$$, $opt_handler$$) {
  $capture$$7_opt_capt$$ = !!$capture$$7_opt_capt$$;
  if($listenerArray$$4_src$$ = goog.events.getListeners_($listenerArray$$4_src$$, $i$$73_type$$, $capture$$7_opt_capt$$)) {
    for($i$$73_type$$ = 0;$i$$73_type$$ < $listenerArray$$4_src$$.length;$i$$73_type$$++) {
      if(!$listenerArray$$4_src$$[$i$$73_type$$].removed && $listenerArray$$4_src$$[$i$$73_type$$].listener == $listener$$ && $listenerArray$$4_src$$[$i$$73_type$$].capture == $capture$$7_opt_capt$$ && $listenerArray$$4_src$$[$i$$73_type$$].handler == $opt_handler$$) {
        return $listenerArray$$4_src$$[$i$$73_type$$]
      }
    }
  }
  return null
};
goog.events.hasListener = function $goog$events$hasListener$($obj$$66_objUid$$, $opt_type$$, $opt_capture$$) {
  var $obj$$66_objUid$$ = goog.getUid($obj$$66_objUid$$), $listeners$$1_map$$ = goog.events.sources_[$obj$$66_objUid$$];
  if($listeners$$1_map$$) {
    var $hasType$$ = goog.isDef($opt_type$$), $hasCapture$$ = goog.isDef($opt_capture$$);
    return $hasType$$ && $hasCapture$$ ? ($listeners$$1_map$$ = goog.events.listenerTree_[$opt_type$$], !!$listeners$$1_map$$ && !!$listeners$$1_map$$[$opt_capture$$] && $obj$$66_objUid$$ in $listeners$$1_map$$[$opt_capture$$]) : !$hasType$$ && !$hasCapture$$ ? !0 : goog.array.some($listeners$$1_map$$, function($listener$$) {
      return $hasType$$ && $listener$$.type == $opt_type$$ || $hasCapture$$ && $listener$$.capture == $opt_capture$$
    })
  }
  return!1
};
goog.events.expose = function $goog$events$expose$($e$$) {
  var $str$$ = [], $key$$;
  for($key$$ in $e$$) {
    $e$$[$key$$] && $e$$[$key$$].id ? $str$$.push($key$$ + " = " + $e$$[$key$$] + " (" + $e$$[$key$$].id + ")") : $str$$.push($key$$ + " = " + $e$$[$key$$])
  }
  return $str$$.join("\n")
};
goog.events.getOnString_ = function $goog$events$getOnString_$($type$$) {
  return $type$$ in goog.events.onStringMap_ ? goog.events.onStringMap_[$type$$] : goog.events.onStringMap_[$type$$] = goog.events.onString_ + $type$$
};
goog.events.fireListeners = function $goog$events$fireListeners$($obj$$, $type$$, $capture$$, $eventObject$$) {
  var $map$$ = goog.events.listenerTree_;
  return $type$$ in $map$$ && ($map$$ = $map$$[$type$$], $capture$$ in $map$$) ? goog.events.fireListeners_($map$$[$capture$$], $obj$$, $type$$, $capture$$, $eventObject$$) : !0
};
goog.events.fireListeners_ = function $goog$events$fireListeners_$($listenerArray$$5_map$$, $obj$$68_objUid$$, $type$$, $capture$$, $eventObject$$) {
  var $retval$$ = 1, $obj$$68_objUid$$ = goog.getUid($obj$$68_objUid$$);
  if($listenerArray$$5_map$$[$obj$$68_objUid$$]) {
    $listenerArray$$5_map$$.remaining_--;
    $listenerArray$$5_map$$ = $listenerArray$$5_map$$[$obj$$68_objUid$$];
    $listenerArray$$5_map$$.locked_ ? $listenerArray$$5_map$$.locked_++ : $listenerArray$$5_map$$.locked_ = 1;
    try {
      for(var $length$$ = $listenerArray$$5_map$$.length, $i$$ = 0;$i$$ < $length$$;$i$$++) {
        var $listener$$ = $listenerArray$$5_map$$[$i$$];
        $listener$$ && !$listener$$.removed && ($retval$$ &= !1 !== goog.events.fireListener($listener$$, $eventObject$$))
      }
    }finally {
      $listenerArray$$5_map$$.locked_--, goog.events.cleanUp_($type$$, $capture$$, $obj$$68_objUid$$, $listenerArray$$5_map$$)
    }
  }
  return Boolean($retval$$)
};
goog.events.fireListener = function $goog$events$fireListener$($listener$$, $eventObject$$) {
  $listener$$.callOnce && goog.events.unlistenByKey($listener$$.key);
  return $listener$$.handleEvent($eventObject$$)
};
goog.events.getTotalListenerCount = function $goog$events$getTotalListenerCount$() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function $goog$events$dispatchEvent$($src$$, $e$$) {
  var $hasCapture$$1_type$$ = $e$$.type || $e$$, $current$$1_map$$ = goog.events.listenerTree_;
  if(!($hasCapture$$1_type$$ in $current$$1_map$$)) {
    return!0
  }
  if(goog.isString($e$$)) {
    $e$$ = new goog.events.Event($e$$, $src$$)
  }else {
    if($e$$ instanceof goog.events.Event) {
      $e$$.target = $e$$.target || $src$$
    }else {
      var $oldEvent_rv$$ = $e$$, $e$$ = new goog.events.Event($hasCapture$$1_type$$, $src$$);
      goog.object.extend($e$$, $oldEvent_rv$$)
    }
  }
  var $oldEvent_rv$$ = 1, $ancestors$$, $current$$1_map$$ = $current$$1_map$$[$hasCapture$$1_type$$], $hasCapture$$1_type$$ = !0 in $current$$1_map$$, $parent$$;
  if($hasCapture$$1_type$$) {
    $ancestors$$ = [];
    for($parent$$ = $src$$;$parent$$;$parent$$ = $parent$$.getParentEventTarget()) {
      $ancestors$$.push($parent$$)
    }
    $parent$$ = $current$$1_map$$[!0];
    $parent$$.remaining_ = $parent$$.count_;
    for(var $i$$ = $ancestors$$.length - 1;!$e$$.propagationStopped_ && 0 <= $i$$ && $parent$$.remaining_;$i$$--) {
      $e$$.currentTarget = $ancestors$$[$i$$], $oldEvent_rv$$ &= goog.events.fireListeners_($parent$$, $ancestors$$[$i$$], $e$$.type, !0, $e$$) && !1 != $e$$.returnValue_
    }
  }
  if(!1 in $current$$1_map$$) {
    if($parent$$ = $current$$1_map$$[!1], $parent$$.remaining_ = $parent$$.count_, $hasCapture$$1_type$$) {
      for($i$$ = 0;!$e$$.propagationStopped_ && $i$$ < $ancestors$$.length && $parent$$.remaining_;$i$$++) {
        $e$$.currentTarget = $ancestors$$[$i$$], $oldEvent_rv$$ &= goog.events.fireListeners_($parent$$, $ancestors$$[$i$$], $e$$.type, !1, $e$$) && !1 != $e$$.returnValue_
      }
    }else {
      for($current$$1_map$$ = $src$$;!$e$$.propagationStopped_ && $current$$1_map$$ && $parent$$.remaining_;$current$$1_map$$ = $current$$1_map$$.getParentEventTarget()) {
        $e$$.currentTarget = $current$$1_map$$, $oldEvent_rv$$ &= goog.events.fireListeners_($parent$$, $current$$1_map$$, $e$$.type, !1, $e$$) && !1 != $e$$.returnValue_
      }
    }
  }
  return Boolean($oldEvent_rv$$)
};
goog.events.protectBrowserEventEntryPoint = function $goog$events$protectBrowserEventEntryPoint$($errorHandler$$) {
  goog.events.handleBrowserEvent_ = $errorHandler$$.protectEntryPoint(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function $goog$events$handleBrowserEvent_$($key$$, $opt_evt$$) {
  if(!goog.events.listeners_[$key$$]) {
    return!0
  }
  var $listener$$ = goog.events.listeners_[$key$$], $be$$1_type$$ = $listener$$.type, $map$$ = goog.events.listenerTree_;
  if(!($be$$1_type$$ in $map$$)) {
    return!0
  }
  var $map$$ = $map$$[$be$$1_type$$], $ieEvent_retval$$, $targetsMap$$;
  if(!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    $ieEvent_retval$$ = $opt_evt$$ || goog.getObjectByName("window.event");
    var $hasCapture$$ = !0 in $map$$, $hasBubble$$ = !1 in $map$$;
    if($hasCapture$$) {
      if(goog.events.isMarkedIeEvent_($ieEvent_retval$$)) {
        return!0
      }
      goog.events.markIeEvent_($ieEvent_retval$$)
    }
    var $evt$$ = new goog.events.BrowserEvent;
    $evt$$.init($ieEvent_retval$$, this);
    $ieEvent_retval$$ = !0;
    try {
      if($hasCapture$$) {
        for(var $ancestors$$ = [], $parent$$ = $evt$$.currentTarget;$parent$$;$parent$$ = $parent$$.parentNode) {
          $ancestors$$.push($parent$$)
        }
        $targetsMap$$ = $map$$[!0];
        $targetsMap$$.remaining_ = $targetsMap$$.count_;
        for(var $i$$ = $ancestors$$.length - 1;!$evt$$.propagationStopped_ && 0 <= $i$$ && $targetsMap$$.remaining_;$i$$--) {
          $evt$$.currentTarget = $ancestors$$[$i$$], $ieEvent_retval$$ &= goog.events.fireListeners_($targetsMap$$, $ancestors$$[$i$$], $be$$1_type$$, !0, $evt$$)
        }
        if($hasBubble$$) {
          $targetsMap$$ = $map$$[!1];
          $targetsMap$$.remaining_ = $targetsMap$$.count_;
          for($i$$ = 0;!$evt$$.propagationStopped_ && $i$$ < $ancestors$$.length && $targetsMap$$.remaining_;$i$$++) {
            $evt$$.currentTarget = $ancestors$$[$i$$], $ieEvent_retval$$ &= goog.events.fireListeners_($targetsMap$$, $ancestors$$[$i$$], $be$$1_type$$, !1, $evt$$)
          }
        }
      }else {
        $ieEvent_retval$$ = goog.events.fireListener($listener$$, $evt$$)
      }
    }finally {
      $ancestors$$ && ($ancestors$$.length = 0)
    }
    return $ieEvent_retval$$
  }
  $be$$1_type$$ = new goog.events.BrowserEvent($opt_evt$$, this);
  return $ieEvent_retval$$ = goog.events.fireListener($listener$$, $be$$1_type$$)
};
goog.events.markIeEvent_ = function $goog$events$markIeEvent_$($e$$) {
  var $useReturnValue$$ = !1;
  if(0 == $e$$.keyCode) {
    try {
      $e$$.keyCode = -1;
      return
    }catch($ex$$) {
      $useReturnValue$$ = !0
    }
  }
  if($useReturnValue$$ || void 0 == $e$$.returnValue) {
    $e$$.returnValue = !0
  }
};
goog.events.isMarkedIeEvent_ = function $goog$events$isMarkedIeEvent_$($e$$) {
  return 0 > $e$$.keyCode || void 0 != $e$$.returnValue
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function $goog$events$getUniqueId$($identifier$$) {
  return $identifier$$ + "_" + goog.events.uniqueIdCounter_++
};
goog.debug.entryPointRegistry.register(function($transformer$$) {
  goog.events.handleBrowserEvent_ = $transformer$$(goog.events.handleBrowserEvent_)
});
goog.events.EventTarget = function $goog$events$EventTarget$() {
  goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.EventTarget.prototype.customEvent_ = !0;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function $goog$events$EventTarget$$getParentEventTarget$() {
  return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function $goog$events$EventTarget$$setParentEventTarget$($parent$$) {
  this.parentEventTarget_ = $parent$$
};
goog.events.EventTarget.prototype.addEventListener = function $goog$events$EventTarget$$addEventListener$($type$$, $handler$$, $opt_capture$$, $opt_handlerScope$$) {
  goog.events.listen(this, $type$$, $handler$$, $opt_capture$$, $opt_handlerScope$$)
};
goog.events.EventTarget.prototype.removeEventListener = function $goog$events$EventTarget$$removeEventListener$($type$$, $handler$$, $opt_capture$$, $opt_handlerScope$$) {
  goog.events.unlisten(this, $type$$, $handler$$, $opt_capture$$, $opt_handlerScope$$)
};
goog.events.EventTarget.prototype.dispatchEvent = function $goog$events$EventTarget$$dispatchEvent$($e$$) {
  return goog.events.dispatchEvent(this, $e$$)
};
goog.events.EventTarget.prototype.disposeInternal = function $goog$events$EventTarget$$disposeInternal$() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.removeAll(this);
  this.parentEventTarget_ = null
};
goog.events.EventHandler = function $goog$events$EventHandler$($opt_handler$$) {
  goog.Disposable.call(this);
  this.handler_ = $opt_handler$$;
  this.keys_ = []
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function $goog$events$EventHandler$$listen$($src$$, $type$$, $opt_fn$$, $opt_capture$$, $opt_handler$$) {
  goog.isArray($type$$) || (goog.events.EventHandler.typeArray_[0] = $type$$, $type$$ = goog.events.EventHandler.typeArray_);
  for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
    var $key$$ = goog.events.listen($src$$, $type$$[$i$$], $opt_fn$$ || this, $opt_capture$$ || !1, $opt_handler$$ || this.handler_ || this);
    this.keys_.push($key$$)
  }
  return this
};
goog.events.EventHandler.prototype.listenOnce = function $goog$events$EventHandler$$listenOnce$($key$$61_src$$, $type$$, $opt_fn$$, $opt_capture$$, $opt_handler$$) {
  if(goog.isArray($type$$)) {
    for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
      this.listenOnce($key$$61_src$$, $type$$[$i$$], $opt_fn$$, $opt_capture$$, $opt_handler$$)
    }
  }else {
    $key$$61_src$$ = goog.events.listenOnce($key$$61_src$$, $type$$, $opt_fn$$ || this, $opt_capture$$, $opt_handler$$ || this.handler_ || this), this.keys_.push($key$$61_src$$)
  }
  return this
};
goog.events.EventHandler.prototype.listenWithWrapper = function $goog$events$EventHandler$$listenWithWrapper$($src$$, $wrapper$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  $wrapper$$.listen($src$$, $listener$$, $opt_capt$$, $opt_handler$$ || this.handler_ || this, this);
  return this
};
goog.events.EventHandler.prototype.getListenerCount = function $goog$events$EventHandler$$getListenerCount$() {
  return this.keys_.length
};
goog.events.EventHandler.prototype.unlisten = function $goog$events$EventHandler$$unlisten$($key$$62_listener$$49_src$$, $type$$, $opt_fn$$, $opt_capture$$, $opt_handler$$) {
  if(goog.isArray($type$$)) {
    for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
      this.unlisten($key$$62_listener$$49_src$$, $type$$[$i$$], $opt_fn$$, $opt_capture$$, $opt_handler$$)
    }
  }else {
    if($key$$62_listener$$49_src$$ = goog.events.getListener($key$$62_listener$$49_src$$, $type$$, $opt_fn$$ || this, $opt_capture$$, $opt_handler$$ || this.handler_ || this)) {
      $key$$62_listener$$49_src$$ = $key$$62_listener$$49_src$$.key, goog.events.unlistenByKey($key$$62_listener$$49_src$$), goog.array.remove(this.keys_, $key$$62_listener$$49_src$$)
    }
  }
  return this
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function $goog$events$EventHandler$$unlistenWithWrapper$($src$$, $wrapper$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  $wrapper$$.unlisten($src$$, $listener$$, $opt_capt$$, $opt_handler$$ || this.handler_ || this, this);
  return this
};
goog.events.EventHandler.prototype.removeAll = function $goog$events$EventHandler$$removeAll$() {
  goog.array.forEach(this.keys_, goog.events.unlistenByKey);
  this.keys_.length = 0
};
goog.events.EventHandler.prototype.disposeInternal = function $goog$events$EventHandler$$disposeInternal$() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll()
};
goog.events.EventHandler.prototype.handleEvent = function $goog$events$EventHandler$$handleEvent$() {
  throw Error("EventHandler.handleEvent not implemented");
};
goog.dom.a11y = {};
goog.dom.a11y.State = {ACTIVEDESCENDANT:"activedescendant", ATOMIC:"atomic", AUTOCOMPLETE:"autocomplete", BUSY:"busy", CHECKED:"checked", CONTROLS:"controls", DESCRIBEDBY:"describedby", DISABLED:"disabled", DROPEFFECT:"dropeffect", EXPANDED:"expanded", FLOWTO:"flowto", GRABBED:"grabbed", HASPOPUP:"haspopup", HIDDEN:"hidden", INVALID:"invalid", LABEL:"label", LABELLEDBY:"labelledby", LEVEL:"level", LIVE:"live", MULTILINE:"multiline", MULTISELECTABLE:"multiselectable", ORIENTATION:"orientation", OWNS:"owns", 
POSINSET:"posinset", PRESSED:"pressed", READONLY:"readonly", RELEVANT:"relevant", REQUIRED:"required", SELECTED:"selected", SETSIZE:"setsize", SORT:"sort", VALUEMAX:"valuemax", VALUEMIN:"valuemin", VALUENOW:"valuenow", VALUETEXT:"valuetext"};
goog.dom.a11y.Role = {ALERT:"alert", ALERTDIALOG:"alertdialog", APPLICATION:"application", ARTICLE:"article", BANNER:"banner", BUTTON:"button", CHECKBOX:"checkbox", COLUMNHEADER:"columnheader", COMBOBOX:"combobox", COMPLEMENTARY:"complementary", DIALOG:"dialog", DIRECTORY:"directory", DOCUMENT:"document", FORM:"form", GRID:"grid", GRIDCELL:"gridcell", GROUP:"group", HEADING:"heading", IMG:"img", LINK:"link", LIST:"list", LISTBOX:"listbox", LISTITEM:"listitem", LOG:"log", MAIN:"main", MARQUEE:"marquee", 
MATH:"math", MENU:"menu", MENUBAR:"menubar", MENU_ITEM:"menuitem", MENU_ITEM_CHECKBOX:"menuitemcheckbox", MENU_ITEM_RADIO:"menuitemradio", NAVIGATION:"navigation", NOTE:"note", OPTION:"option", PRESENTATION:"presentation", PROGRESSBAR:"progressbar", RADIO:"radio", RADIOGROUP:"radiogroup", REGION:"region", ROW:"row", ROWGROUP:"rowgroup", ROWHEADER:"rowheader", SCROLLBAR:"scrollbar", SEARCH:"search", SEPARATOR:"separator", SLIDER:"slider", SPINBUTTON:"spinbutton", STATUS:"status", TAB:"tab", TAB_LIST:"tablist", 
TAB_PANEL:"tabpanel", TEXTBOX:"textbox", TIMER:"timer", TOOLBAR:"toolbar", TOOLTIP:"tooltip", TREE:"tree", TREEGRID:"treegrid", TREEITEM:"treeitem"};
goog.dom.a11y.LivePriority = {OFF:"off", POLITE:"polite", ASSERTIVE:"assertive"};
goog.dom.a11y.setRole = function $goog$dom$a11y$setRole$($element$$, $roleName$$) {
  $element$$.setAttribute("role", $roleName$$)
};
goog.dom.a11y.getRole = function $goog$dom$a11y$getRole$($element$$) {
  return $element$$.getAttribute("role") || ""
};
goog.dom.a11y.setState = function $goog$dom$a11y$setState$($element$$, $state$$, $value$$) {
  $element$$.setAttribute("aria-" + $state$$, $value$$)
};
goog.dom.a11y.getState = function $goog$dom$a11y$getState$($element$$, $stateName$$) {
  var $attrb$$ = $element$$.getAttribute("aria-" + $stateName$$);
  return!0 === $attrb$$ || !1 === $attrb$$ ? $attrb$$ ? "true" : "false" : $attrb$$ ? String($attrb$$) : ""
};
goog.dom.a11y.getActiveDescendant = function $goog$dom$a11y$getActiveDescendant$($element$$) {
  var $id$$ = goog.dom.a11y.getState($element$$, goog.dom.a11y.State.ACTIVEDESCENDANT);
  return goog.dom.getOwnerDocument($element$$).getElementById($id$$)
};
goog.dom.a11y.setActiveDescendant = function $goog$dom$a11y$setActiveDescendant$($element$$, $activeElement$$) {
  goog.dom.a11y.setState($element$$, goog.dom.a11y.State.ACTIVEDESCENDANT, $activeElement$$ ? $activeElement$$.id : "")
};
goog.dom.a11y.Announcer = function $goog$dom$a11y$Announcer$($domHelper$$) {
  goog.Disposable.call(this);
  this.domHelper_ = $domHelper$$;
  this.liveRegions_ = {}
};
goog.inherits(goog.dom.a11y.Announcer, goog.Disposable);
goog.dom.a11y.Announcer.prototype.disposeInternal = function $goog$dom$a11y$Announcer$$disposeInternal$() {
  goog.object.forEach(this.liveRegions_, this.domHelper_.removeNode, this.domHelper_);
  this.domHelper_ = this.liveRegions_ = null;
  goog.dom.a11y.Announcer.superClass_.disposeInternal.call(this)
};
goog.dom.a11y.Announcer.prototype.say = function $goog$dom$a11y$Announcer$$say$($message$$, $opt_priority$$) {
  goog.dom.setTextContent(this.getLiveRegion_($opt_priority$$ || goog.dom.a11y.LivePriority.POLITE), $message$$)
};
goog.dom.a11y.Announcer.prototype.getLiveRegion_ = function $goog$dom$a11y$Announcer$$getLiveRegion_$($priority$$) {
  if(this.liveRegions_[$priority$$]) {
    return this.liveRegions_[$priority$$]
  }
  var $liveRegion$$;
  $liveRegion$$ = this.domHelper_.createElement("div");
  $liveRegion$$.style.position = "absolute";
  $liveRegion$$.style.top = "-1000px";
  goog.dom.a11y.setState($liveRegion$$, "live", $priority$$);
  goog.dom.a11y.setState($liveRegion$$, "atomic", "true");
  this.domHelper_.getDocument().body.appendChild($liveRegion$$);
  return this.liveRegions_[$priority$$] = $liveRegion$$
};
goog.events.KeyCodes = {WIN_KEY_FF_LINUX:0, MAC_ENTER:3, BACKSPACE:8, TAB:9, NUM_CENTER:12, ENTER:13, SHIFT:16, CTRL:17, ALT:18, PAUSE:19, CAPS_LOCK:20, ESC:27, SPACE:32, PAGE_UP:33, PAGE_DOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, PRINT_SCREEN:44, INSERT:45, DELETE:46, ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52, FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57, FF_SEMICOLON:59, FF_EQUALS:61, QUESTION_MARK:63, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, 
N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, V:86, W:87, X:88, Y:89, Z:90, META:91, WIN_KEY_RIGHT:92, CONTEXT_MENU:93, NUM_ZERO:96, NUM_ONE:97, NUM_TWO:98, NUM_THREE:99, NUM_FOUR:100, NUM_FIVE:101, NUM_SIX:102, NUM_SEVEN:103, NUM_EIGHT:104, NUM_NINE:105, NUM_MULTIPLY:106, NUM_PLUS:107, NUM_MINUS:109, NUM_PERIOD:110, NUM_DIVISION:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, NUMLOCK:144, SCROLL_LOCK:145, FIRST_MEDIA_KEY:166, LAST_MEDIA_KEY:183, 
SEMICOLON:186, DASH:189, EQUALS:187, COMMA:188, PERIOD:190, SLASH:191, APOSTROPHE:192, TILDE:192, SINGLE_QUOTE:222, OPEN_SQUARE_BRACKET:219, BACKSLASH:220, CLOSE_SQUARE_BRACKET:221, WIN_KEY:224, MAC_FF_META:224, WIN_IME:229, PHANTOM:255};
goog.events.KeyCodes.isTextModifyingKeyEvent = function $goog$events$KeyCodes$isTextModifyingKeyEvent$($e$$) {
  if($e$$.altKey && !$e$$.ctrlKey || $e$$.metaKey || $e$$.keyCode >= goog.events.KeyCodes.F1 && $e$$.keyCode <= goog.events.KeyCodes.F12) {
    return!1
  }
  switch($e$$.keyCode) {
    case goog.events.KeyCodes.ALT:
    ;
    case goog.events.KeyCodes.CAPS_LOCK:
    ;
    case goog.events.KeyCodes.CONTEXT_MENU:
    ;
    case goog.events.KeyCodes.CTRL:
    ;
    case goog.events.KeyCodes.DOWN:
    ;
    case goog.events.KeyCodes.END:
    ;
    case goog.events.KeyCodes.ESC:
    ;
    case goog.events.KeyCodes.HOME:
    ;
    case goog.events.KeyCodes.INSERT:
    ;
    case goog.events.KeyCodes.LEFT:
    ;
    case goog.events.KeyCodes.MAC_FF_META:
    ;
    case goog.events.KeyCodes.META:
    ;
    case goog.events.KeyCodes.NUMLOCK:
    ;
    case goog.events.KeyCodes.NUM_CENTER:
    ;
    case goog.events.KeyCodes.PAGE_DOWN:
    ;
    case goog.events.KeyCodes.PAGE_UP:
    ;
    case goog.events.KeyCodes.PAUSE:
    ;
    case goog.events.KeyCodes.PHANTOM:
    ;
    case goog.events.KeyCodes.PRINT_SCREEN:
    ;
    case goog.events.KeyCodes.RIGHT:
    ;
    case goog.events.KeyCodes.SCROLL_LOCK:
    ;
    case goog.events.KeyCodes.SHIFT:
    ;
    case goog.events.KeyCodes.UP:
    ;
    case goog.events.KeyCodes.WIN_KEY:
    ;
    case goog.events.KeyCodes.WIN_KEY_RIGHT:
      return!1;
    case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
      return!goog.userAgent.GECKO;
    default:
      return $e$$.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || $e$$.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
  }
};
goog.events.KeyCodes.firesKeyPressEvent = function $goog$events$KeyCodes$firesKeyPressEvent$($keyCode$$, $opt_heldKeyCode$$, $opt_shiftKey$$, $opt_ctrlKey$$, $opt_altKey$$) {
  if(!goog.userAgent.IE && (!goog.userAgent.WEBKIT || !goog.userAgent.isVersion("525"))) {
    return!0
  }
  if(goog.userAgent.MAC && $opt_altKey$$) {
    return goog.events.KeyCodes.isCharacterKey($keyCode$$)
  }
  if($opt_altKey$$ && !$opt_ctrlKey$$ || !$opt_shiftKey$$ && ($opt_heldKeyCode$$ == goog.events.KeyCodes.CTRL || $opt_heldKeyCode$$ == goog.events.KeyCodes.ALT) || goog.userAgent.IE && $opt_ctrlKey$$ && $opt_heldKeyCode$$ == $keyCode$$) {
    return!1
  }
  switch($keyCode$$) {
    case goog.events.KeyCodes.ENTER:
      return!(goog.userAgent.IE && goog.userAgent.isDocumentMode(9));
    case goog.events.KeyCodes.ESC:
      return!goog.userAgent.WEBKIT
  }
  return goog.events.KeyCodes.isCharacterKey($keyCode$$)
};
goog.events.KeyCodes.isCharacterKey = function $goog$events$KeyCodes$isCharacterKey$($keyCode$$) {
  if($keyCode$$ >= goog.events.KeyCodes.ZERO && $keyCode$$ <= goog.events.KeyCodes.NINE || $keyCode$$ >= goog.events.KeyCodes.NUM_ZERO && $keyCode$$ <= goog.events.KeyCodes.NUM_MULTIPLY || $keyCode$$ >= goog.events.KeyCodes.A && $keyCode$$ <= goog.events.KeyCodes.Z || goog.userAgent.WEBKIT && 0 == $keyCode$$) {
    return!0
  }
  switch($keyCode$$) {
    case goog.events.KeyCodes.SPACE:
    ;
    case goog.events.KeyCodes.QUESTION_MARK:
    ;
    case goog.events.KeyCodes.NUM_PLUS:
    ;
    case goog.events.KeyCodes.NUM_MINUS:
    ;
    case goog.events.KeyCodes.NUM_PERIOD:
    ;
    case goog.events.KeyCodes.NUM_DIVISION:
    ;
    case goog.events.KeyCodes.SEMICOLON:
    ;
    case goog.events.KeyCodes.FF_SEMICOLON:
    ;
    case goog.events.KeyCodes.DASH:
    ;
    case goog.events.KeyCodes.EQUALS:
    ;
    case goog.events.KeyCodes.FF_EQUALS:
    ;
    case goog.events.KeyCodes.COMMA:
    ;
    case goog.events.KeyCodes.PERIOD:
    ;
    case goog.events.KeyCodes.SLASH:
    ;
    case goog.events.KeyCodes.APOSTROPHE:
    ;
    case goog.events.KeyCodes.SINGLE_QUOTE:
    ;
    case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
    ;
    case goog.events.KeyCodes.BACKSLASH:
    ;
    case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
      return!0;
    default:
      return!1
  }
};
goog.events.KeyCodes.normalizeGeckoKeyCode = function $goog$events$KeyCodes$normalizeGeckoKeyCode$($keyCode$$) {
  switch($keyCode$$) {
    case goog.events.KeyCodes.FF_EQUALS:
      return goog.events.KeyCodes.EQUALS;
    case goog.events.KeyCodes.FF_SEMICOLON:
      return goog.events.KeyCodes.SEMICOLON;
    case goog.events.KeyCodes.MAC_FF_META:
      return goog.events.KeyCodes.META;
    case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
      return goog.events.KeyCodes.WIN_KEY;
    default:
      return $keyCode$$
  }
};
goog.math.Box = function $goog$math$Box$($top$$, $right$$, $bottom$$, $left$$) {
  this.top = $top$$;
  this.right = $right$$;
  this.bottom = $bottom$$;
  this.left = $left$$
};
goog.math.Box.boundingBox = function $goog$math$Box$boundingBox$($var_args$$) {
  for(var $box$$ = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    var $coord$$ = arguments[$i$$];
    $box$$.top = Math.min($box$$.top, $coord$$.y);
    $box$$.right = Math.max($box$$.right, $coord$$.x);
    $box$$.bottom = Math.max($box$$.bottom, $coord$$.y);
    $box$$.left = Math.min($box$$.left, $coord$$.x)
  }
  return $box$$
};
goog.math.Box.prototype.clone = function $goog$math$Box$$clone$() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
goog.DEBUG && (goog.math.Box.prototype.toString = function $goog$math$Box$$toString$() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
});
goog.math.Box.prototype.contains = function $goog$math$Box$$contains$($other$$) {
  return goog.math.Box.contains(this, $other$$)
};
goog.math.Box.prototype.expand = function $goog$math$Box$$expand$($top$$, $opt_right$$, $opt_bottom$$, $opt_left$$) {
  goog.isObject($top$$) ? (this.top -= $top$$.top, this.right += $top$$.right, this.bottom += $top$$.bottom, this.left -= $top$$.left) : (this.top -= $top$$, this.right += $opt_right$$, this.bottom += $opt_bottom$$, this.left -= $opt_left$$);
  return this
};
goog.math.Box.prototype.expandToInclude = function $goog$math$Box$$expandToInclude$($box$$) {
  this.left = Math.min(this.left, $box$$.left);
  this.top = Math.min(this.top, $box$$.top);
  this.right = Math.max(this.right, $box$$.right);
  this.bottom = Math.max(this.bottom, $box$$.bottom)
};
goog.math.Box.equals = function $goog$math$Box$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : !$a$$ || !$b$$ ? !1 : $a$$.top == $b$$.top && $a$$.right == $b$$.right && $a$$.bottom == $b$$.bottom && $a$$.left == $b$$.left
};
goog.math.Box.contains = function $goog$math$Box$contains$($box$$, $other$$) {
  return!$box$$ || !$other$$ ? !1 : $other$$ instanceof goog.math.Box ? $other$$.left >= $box$$.left && $other$$.right <= $box$$.right && $other$$.top >= $box$$.top && $other$$.bottom <= $box$$.bottom : $other$$.x >= $box$$.left && $other$$.x <= $box$$.right && $other$$.y >= $box$$.top && $other$$.y <= $box$$.bottom
};
goog.math.Box.relativePositionX = function $goog$math$Box$relativePositionX$($box$$, $coord$$) {
  return $coord$$.x < $box$$.left ? $coord$$.x - $box$$.left : $coord$$.x > $box$$.right ? $coord$$.x - $box$$.right : 0
};
goog.math.Box.relativePositionY = function $goog$math$Box$relativePositionY$($box$$, $coord$$) {
  return $coord$$.y < $box$$.top ? $coord$$.y - $box$$.top : $coord$$.y > $box$$.bottom ? $coord$$.y - $box$$.bottom : 0
};
goog.math.Box.distance = function $goog$math$Box$distance$($box$$, $coord$$) {
  var $x$$ = goog.math.Box.relativePositionX($box$$, $coord$$), $y$$ = goog.math.Box.relativePositionY($box$$, $coord$$);
  return Math.sqrt($x$$ * $x$$ + $y$$ * $y$$)
};
goog.math.Box.intersects = function $goog$math$Box$intersects$($a$$, $b$$) {
  return $a$$.left <= $b$$.right && $b$$.left <= $a$$.right && $a$$.top <= $b$$.bottom && $b$$.top <= $a$$.bottom
};
goog.math.Box.intersectsWithPadding = function $goog$math$Box$intersectsWithPadding$($a$$, $b$$, $padding$$) {
  return $a$$.left <= $b$$.right + $padding$$ && $b$$.left <= $a$$.right + $padding$$ && $a$$.top <= $b$$.bottom + $padding$$ && $b$$.top <= $a$$.bottom + $padding$$
};
goog.math.Rect = function $goog$math$Rect$($x$$, $y$$, $w$$, $h$$) {
  this.left = $x$$;
  this.top = $y$$;
  this.width = $w$$;
  this.height = $h$$
};
goog.math.Rect.prototype.clone = function $goog$math$Rect$$clone$() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function $goog$math$Rect$$toBox$() {
  return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromBox = function $goog$math$Rect$createFromBox$($box$$) {
  return new goog.math.Rect($box$$.left, $box$$.top, $box$$.right - $box$$.left, $box$$.bottom - $box$$.top)
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function $goog$math$Rect$$toString$() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
});
goog.math.Rect.equals = function $goog$math$Rect$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : !$a$$ || !$b$$ ? !1 : $a$$.left == $b$$.left && $a$$.width == $b$$.width && $a$$.top == $b$$.top && $a$$.height == $b$$.height
};
goog.math.Rect.prototype.intersection = function $goog$math$Rect$$intersection$($rect_y1$$) {
  var $x0$$ = Math.max(this.left, $rect_y1$$.left), $x1$$ = Math.min(this.left + this.width, $rect_y1$$.left + $rect_y1$$.width);
  if($x0$$ <= $x1$$) {
    var $y0$$ = Math.max(this.top, $rect_y1$$.top), $rect_y1$$ = Math.min(this.top + this.height, $rect_y1$$.top + $rect_y1$$.height);
    if($y0$$ <= $rect_y1$$) {
      return this.left = $x0$$, this.top = $y0$$, this.width = $x1$$ - $x0$$, this.height = $rect_y1$$ - $y0$$, !0
    }
  }
  return!1
};
goog.math.Rect.intersection = function $goog$math$Rect$intersection$($a$$, $b$$) {
  var $x0$$ = Math.max($a$$.left, $b$$.left), $x1$$ = Math.min($a$$.left + $a$$.width, $b$$.left + $b$$.width);
  if($x0$$ <= $x1$$) {
    var $y0$$ = Math.max($a$$.top, $b$$.top), $y1$$ = Math.min($a$$.top + $a$$.height, $b$$.top + $b$$.height);
    if($y0$$ <= $y1$$) {
      return new goog.math.Rect($x0$$, $y0$$, $x1$$ - $x0$$, $y1$$ - $y0$$)
    }
  }
  return null
};
goog.math.Rect.intersects = function $goog$math$Rect$intersects$($a$$, $b$$) {
  return $a$$.left <= $b$$.left + $b$$.width && $b$$.left <= $a$$.left + $a$$.width && $a$$.top <= $b$$.top + $b$$.height && $b$$.top <= $a$$.top + $a$$.height
};
goog.math.Rect.prototype.intersects = function $goog$math$Rect$$intersects$($rect$$) {
  return goog.math.Rect.intersects(this, $rect$$)
};
goog.math.Rect.difference = function $goog$math$Rect$difference$($a$$, $b$$) {
  var $intersection_result$$ = goog.math.Rect.intersection($a$$, $b$$);
  if(!$intersection_result$$ || !$intersection_result$$.height || !$intersection_result$$.width) {
    return[$a$$.clone()]
  }
  var $intersection_result$$ = [], $top$$ = $a$$.top, $height$$ = $a$$.height, $ar$$ = $a$$.left + $a$$.width, $ab$$ = $a$$.top + $a$$.height, $br$$ = $b$$.left + $b$$.width, $bb$$ = $b$$.top + $b$$.height;
  $b$$.top > $a$$.top && ($intersection_result$$.push(new goog.math.Rect($a$$.left, $a$$.top, $a$$.width, $b$$.top - $a$$.top)), $top$$ = $b$$.top, $height$$ -= $b$$.top - $a$$.top);
  $bb$$ < $ab$$ && ($intersection_result$$.push(new goog.math.Rect($a$$.left, $bb$$, $a$$.width, $ab$$ - $bb$$)), $height$$ = $bb$$ - $top$$);
  $b$$.left > $a$$.left && $intersection_result$$.push(new goog.math.Rect($a$$.left, $top$$, $b$$.left - $a$$.left, $height$$));
  $br$$ < $ar$$ && $intersection_result$$.push(new goog.math.Rect($br$$, $top$$, $ar$$ - $br$$, $height$$));
  return $intersection_result$$
};
goog.math.Rect.prototype.difference = function $goog$math$Rect$$difference$($rect$$) {
  return goog.math.Rect.difference(this, $rect$$)
};
goog.math.Rect.prototype.boundingRect = function $goog$math$Rect$$boundingRect$($rect$$) {
  var $right$$ = Math.max(this.left + this.width, $rect$$.left + $rect$$.width), $bottom$$ = Math.max(this.top + this.height, $rect$$.top + $rect$$.height);
  this.left = Math.min(this.left, $rect$$.left);
  this.top = Math.min(this.top, $rect$$.top);
  this.width = $right$$ - this.left;
  this.height = $bottom$$ - this.top
};
goog.math.Rect.boundingRect = function $goog$math$Rect$boundingRect$($a$$, $b$$) {
  if(!$a$$ || !$b$$) {
    return null
  }
  var $clone$$ = $a$$.clone();
  $clone$$.boundingRect($b$$);
  return $clone$$
};
goog.math.Rect.prototype.contains = function $goog$math$Rect$$contains$($another$$) {
  return $another$$ instanceof goog.math.Rect ? this.left <= $another$$.left && this.left + this.width >= $another$$.left + $another$$.width && this.top <= $another$$.top && this.top + this.height >= $another$$.top + $another$$.height : $another$$.x >= this.left && $another$$.x <= this.left + this.width && $another$$.y >= this.top && $another$$.y <= this.top + this.height
};
goog.math.Rect.prototype.getSize = function $goog$math$Rect$$getSize$() {
  return new goog.math.Size(this.width, this.height)
};
goog.style = {};
goog.style.setStyle = function $goog$style$setStyle$($element$$, $style$$, $opt_value$$) {
  goog.isString($style$$) ? goog.style.setStyle_($element$$, $opt_value$$, $style$$) : goog.object.forEach($style$$, goog.partial(goog.style.setStyle_, $element$$))
};
goog.style.setStyle_ = function $goog$style$setStyle_$($element$$, $value$$, $style$$) {
  $element$$.style[goog.string.toCamelCase($style$$)] = $value$$
};
goog.style.getStyle = function $goog$style$getStyle$($element$$, $property$$) {
  return $element$$.style[goog.string.toCamelCase($property$$)] || ""
};
goog.style.getComputedStyle = function $goog$style$getComputedStyle$($element$$, $property$$) {
  var $doc$$23_styles$$ = goog.dom.getOwnerDocument($element$$);
  return $doc$$23_styles$$.defaultView && $doc$$23_styles$$.defaultView.getComputedStyle && ($doc$$23_styles$$ = $doc$$23_styles$$.defaultView.getComputedStyle($element$$, null)) ? $doc$$23_styles$$[$property$$] || $doc$$23_styles$$.getPropertyValue($property$$) || "" : ""
};
goog.style.getCascadedStyle = function $goog$style$getCascadedStyle$($element$$, $style$$) {
  return $element$$.currentStyle ? $element$$.currentStyle[$style$$] : null
};
goog.style.getStyle_ = function $goog$style$getStyle_$($element$$, $style$$) {
  return goog.style.getComputedStyle($element$$, $style$$) || goog.style.getCascadedStyle($element$$, $style$$) || $element$$.style && $element$$.style[$style$$]
};
goog.style.getComputedPosition = function $goog$style$getComputedPosition$($element$$) {
  return goog.style.getStyle_($element$$, "position")
};
goog.style.getBackgroundColor = function $goog$style$getBackgroundColor$($element$$) {
  return goog.style.getStyle_($element$$, "backgroundColor")
};
goog.style.getComputedOverflowX = function $goog$style$getComputedOverflowX$($element$$) {
  return goog.style.getStyle_($element$$, "overflowX")
};
goog.style.getComputedOverflowY = function $goog$style$getComputedOverflowY$($element$$) {
  return goog.style.getStyle_($element$$, "overflowY")
};
goog.style.getComputedZIndex = function $goog$style$getComputedZIndex$($element$$) {
  return goog.style.getStyle_($element$$, "zIndex")
};
goog.style.getComputedTextAlign = function $goog$style$getComputedTextAlign$($element$$) {
  return goog.style.getStyle_($element$$, "textAlign")
};
goog.style.getComputedCursor = function $goog$style$getComputedCursor$($element$$) {
  return goog.style.getStyle_($element$$, "cursor")
};
goog.style.setPosition = function $goog$style$setPosition$($el$$, $arg1_y$$, $opt_arg2$$) {
  var $x$$, $buggyGeckoSubPixelPos$$ = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersion("1.9");
  $arg1_y$$ instanceof goog.math.Coordinate ? ($x$$ = $arg1_y$$.x, $arg1_y$$ = $arg1_y$$.y) : ($x$$ = $arg1_y$$, $arg1_y$$ = $opt_arg2$$);
  $el$$.style.left = goog.style.getPixelStyleValue_($x$$, $buggyGeckoSubPixelPos$$);
  $el$$.style.top = goog.style.getPixelStyleValue_($arg1_y$$, $buggyGeckoSubPixelPos$$)
};
goog.style.getPosition = function $goog$style$getPosition$($element$$) {
  return new goog.math.Coordinate($element$$.offsetLeft, $element$$.offsetTop)
};
goog.style.getClientViewportElement = function $goog$style$getClientViewportElement$($doc$$) {
  $doc$$ = $doc$$ ? goog.dom.getOwnerDocument($doc$$) : goog.dom.getDocument();
  return goog.userAgent.IE && !goog.userAgent.isDocumentMode(9) && !goog.dom.getDomHelper($doc$$).isCss1CompatMode() ? $doc$$.body : $doc$$.documentElement
};
goog.style.getViewportPageOffset = function $goog$style$getViewportPageOffset$($doc$$) {
  var $body$$ = $doc$$.body, $doc$$ = $doc$$.documentElement;
  return new goog.math.Coordinate($body$$.scrollLeft || $doc$$.scrollLeft, $body$$.scrollTop || $doc$$.scrollTop)
};
goog.style.getBoundingClientRect_ = function $goog$style$getBoundingClientRect_$($doc$$26_el$$) {
  var $rect$$ = $doc$$26_el$$.getBoundingClientRect();
  goog.userAgent.IE && ($doc$$26_el$$ = $doc$$26_el$$.ownerDocument, $rect$$.left -= $doc$$26_el$$.documentElement.clientLeft + $doc$$26_el$$.body.clientLeft, $rect$$.top -= $doc$$26_el$$.documentElement.clientTop + $doc$$26_el$$.body.clientTop);
  return $rect$$
};
goog.style.getOffsetParent = function $goog$style$getOffsetParent$($element$$51_parent$$) {
  if(goog.userAgent.IE && !goog.userAgent.isDocumentMode(8)) {
    return $element$$51_parent$$.offsetParent
  }
  for(var $doc$$ = goog.dom.getOwnerDocument($element$$51_parent$$), $positionStyle$$ = goog.style.getStyle_($element$$51_parent$$, "position"), $skipStatic$$ = "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$, $element$$51_parent$$ = $element$$51_parent$$.parentNode;$element$$51_parent$$ && $element$$51_parent$$ != $doc$$;$element$$51_parent$$ = $element$$51_parent$$.parentNode) {
    if($positionStyle$$ = goog.style.getStyle_($element$$51_parent$$, "position"), $skipStatic$$ = $skipStatic$$ && "static" == $positionStyle$$ && $element$$51_parent$$ != $doc$$.documentElement && $element$$51_parent$$ != $doc$$.body, !$skipStatic$$ && ($element$$51_parent$$.scrollWidth > $element$$51_parent$$.clientWidth || $element$$51_parent$$.scrollHeight > $element$$51_parent$$.clientHeight || "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$ || "relative" == $positionStyle$$)) {
      return $element$$51_parent$$
    }
  }
  return null
};
goog.style.getVisibleRectForElement = function $goog$style$getVisibleRectForElement$($el$$6_element$$) {
  for(var $visibleRect$$ = new goog.math.Box(0, Infinity, Infinity, 0), $dom$$ = goog.dom.getDomHelper($el$$6_element$$), $body$$ = $dom$$.getDocument().body, $documentElement$$ = $dom$$.getDocument().documentElement, $scrollEl_scrollY$$ = $dom$$.getDocumentScrollElement();$el$$6_element$$ = goog.style.getOffsetParent($el$$6_element$$);) {
    if((!goog.userAgent.IE || 0 != $el$$6_element$$.clientWidth) && (!goog.userAgent.WEBKIT || 0 != $el$$6_element$$.clientHeight || $el$$6_element$$ != $body$$) && $el$$6_element$$ != $body$$ && $el$$6_element$$ != $documentElement$$ && "visible" != goog.style.getStyle_($el$$6_element$$, "overflow")) {
      var $pos$$ = goog.style.getPageOffset($el$$6_element$$), $client$$ = goog.style.getClientLeftTop($el$$6_element$$);
      $pos$$.x += $client$$.x;
      $pos$$.y += $client$$.y;
      $visibleRect$$.top = Math.max($visibleRect$$.top, $pos$$.y);
      $visibleRect$$.right = Math.min($visibleRect$$.right, $pos$$.x + $el$$6_element$$.clientWidth);
      $visibleRect$$.bottom = Math.min($visibleRect$$.bottom, $pos$$.y + $el$$6_element$$.clientHeight);
      $visibleRect$$.left = Math.max($visibleRect$$.left, $pos$$.x)
    }
  }
  $body$$ = $scrollEl_scrollY$$.scrollLeft;
  $scrollEl_scrollY$$ = $scrollEl_scrollY$$.scrollTop;
  $visibleRect$$.left = Math.max($visibleRect$$.left, $body$$);
  $visibleRect$$.top = Math.max($visibleRect$$.top, $scrollEl_scrollY$$);
  $dom$$ = $dom$$.getViewportSize();
  $visibleRect$$.right = Math.min($visibleRect$$.right, $body$$ + $dom$$.width);
  $visibleRect$$.bottom = Math.min($visibleRect$$.bottom, $scrollEl_scrollY$$ + $dom$$.height);
  return 0 <= $visibleRect$$.top && 0 <= $visibleRect$$.left && $visibleRect$$.bottom > $visibleRect$$.top && $visibleRect$$.right > $visibleRect$$.left ? $visibleRect$$ : null
};
goog.style.getContainerOffsetToScrollInto = function $goog$style$getContainerOffsetToScrollInto$($element$$, $container$$39_scrollTop$$, $opt_center$$) {
  var $elementPos_relY$$ = goog.style.getPageOffset($element$$), $containerPos_spaceX$$ = goog.style.getPageOffset($container$$39_scrollTop$$), $containerBorder_scrollLeft$$ = goog.style.getBorderBox($container$$39_scrollTop$$), $relX$$ = $elementPos_relY$$.x - $containerPos_spaceX$$.x - $containerBorder_scrollLeft$$.left, $elementPos_relY$$ = $elementPos_relY$$.y - $containerPos_spaceX$$.y - $containerBorder_scrollLeft$$.top, $containerPos_spaceX$$ = $container$$39_scrollTop$$.clientWidth - $element$$.offsetWidth, 
  $element$$ = $container$$39_scrollTop$$.clientHeight - $element$$.offsetHeight, $containerBorder_scrollLeft$$ = $container$$39_scrollTop$$.scrollLeft, $container$$39_scrollTop$$ = $container$$39_scrollTop$$.scrollTop;
  $opt_center$$ ? ($containerBorder_scrollLeft$$ += $relX$$ - $containerPos_spaceX$$ / 2, $container$$39_scrollTop$$ += $elementPos_relY$$ - $element$$ / 2) : ($containerBorder_scrollLeft$$ += Math.min($relX$$, Math.max($relX$$ - $containerPos_spaceX$$, 0)), $container$$39_scrollTop$$ += Math.min($elementPos_relY$$, Math.max($elementPos_relY$$ - $element$$, 0)));
  return new goog.math.Coordinate($containerBorder_scrollLeft$$, $container$$39_scrollTop$$)
};
goog.style.scrollIntoContainerView = function $goog$style$scrollIntoContainerView$($element$$54_offset$$, $container$$, $opt_center$$) {
  $element$$54_offset$$ = goog.style.getContainerOffsetToScrollInto($element$$54_offset$$, $container$$, $opt_center$$);
  $container$$.scrollLeft = $element$$54_offset$$.x;
  $container$$.scrollTop = $element$$54_offset$$.y
};
goog.style.getClientLeftTop = function $goog$style$getClientLeftTop$($el$$) {
  if(goog.userAgent.GECKO && !goog.userAgent.isVersion("1.9")) {
    var $left$$ = parseFloat(goog.style.getComputedStyle($el$$, "borderLeftWidth"));
    if(goog.style.isRightToLeft($el$$)) {
      var $scrollbarWidth$$ = $el$$.offsetWidth - $el$$.clientWidth - $left$$ - parseFloat(goog.style.getComputedStyle($el$$, "borderRightWidth")), $left$$ = $left$$ + $scrollbarWidth$$
    }
    return new goog.math.Coordinate($left$$, parseFloat(goog.style.getComputedStyle($el$$, "borderTopWidth")))
  }
  return new goog.math.Coordinate($el$$.clientLeft, $el$$.clientTop)
};
goog.style.getPageOffset = function $goog$style$getPageOffset$($el$$) {
  var $box$$7_parent$$, $doc$$ = goog.dom.getOwnerDocument($el$$), $positionStyle$$ = goog.style.getStyle_($el$$, "position");
  goog.asserts.assertObject($el$$, "Parameter is required");
  var $BUGGY_GECKO_BOX_OBJECT$$ = goog.userAgent.GECKO && $doc$$.getBoxObjectFor && !$el$$.getBoundingClientRect && "absolute" == $positionStyle$$ && ($box$$7_parent$$ = $doc$$.getBoxObjectFor($el$$)) && (0 > $box$$7_parent$$.screenX || 0 > $box$$7_parent$$.screenY), $pos$$ = new goog.math.Coordinate(0, 0), $viewportElement$$ = goog.style.getClientViewportElement($doc$$);
  if($el$$ == $viewportElement$$) {
    return $pos$$
  }
  if($el$$.getBoundingClientRect) {
    $box$$7_parent$$ = goog.style.getBoundingClientRect_($el$$), $el$$ = goog.dom.getDomHelper($doc$$).getDocumentScroll(), $pos$$.x = $box$$7_parent$$.left + $el$$.x, $pos$$.y = $box$$7_parent$$.top + $el$$.y
  }else {
    if($doc$$.getBoxObjectFor && !$BUGGY_GECKO_BOX_OBJECT$$) {
      $box$$7_parent$$ = $doc$$.getBoxObjectFor($el$$), $el$$ = $doc$$.getBoxObjectFor($viewportElement$$), $pos$$.x = $box$$7_parent$$.screenX - $el$$.screenX, $pos$$.y = $box$$7_parent$$.screenY - $el$$.screenY
    }else {
      $box$$7_parent$$ = $el$$;
      do {
        $pos$$.x += $box$$7_parent$$.offsetLeft;
        $pos$$.y += $box$$7_parent$$.offsetTop;
        $box$$7_parent$$ != $el$$ && ($pos$$.x += $box$$7_parent$$.clientLeft || 0, $pos$$.y += $box$$7_parent$$.clientTop || 0);
        if(goog.userAgent.WEBKIT && "fixed" == goog.style.getComputedPosition($box$$7_parent$$)) {
          $pos$$.x += $doc$$.body.scrollLeft;
          $pos$$.y += $doc$$.body.scrollTop;
          break
        }
        $box$$7_parent$$ = $box$$7_parent$$.offsetParent
      }while($box$$7_parent$$ && $box$$7_parent$$ != $el$$);
      if(goog.userAgent.OPERA || goog.userAgent.WEBKIT && "absolute" == $positionStyle$$) {
        $pos$$.y -= $doc$$.body.offsetTop
      }
      for($box$$7_parent$$ = $el$$;($box$$7_parent$$ = goog.style.getOffsetParent($box$$7_parent$$)) && $box$$7_parent$$ != $doc$$.body && $box$$7_parent$$ != $viewportElement$$;) {
        if($pos$$.x -= $box$$7_parent$$.scrollLeft, !goog.userAgent.OPERA || "TR" != $box$$7_parent$$.tagName) {
          $pos$$.y -= $box$$7_parent$$.scrollTop
        }
      }
    }
  }
  return $pos$$
};
goog.style.getPageOffsetLeft = function $goog$style$getPageOffsetLeft$($el$$) {
  return goog.style.getPageOffset($el$$).x
};
goog.style.getPageOffsetTop = function $goog$style$getPageOffsetTop$($el$$) {
  return goog.style.getPageOffset($el$$).y
};
goog.style.getFramedPageOffset = function $goog$style$getFramedPageOffset$($el$$, $relativeWin$$) {
  var $position$$ = new goog.math.Coordinate(0, 0), $currentWin$$ = goog.dom.getWindow(goog.dom.getOwnerDocument($el$$)), $currentEl$$ = $el$$;
  do {
    var $offset$$ = $currentWin$$ == $relativeWin$$ ? goog.style.getPageOffset($currentEl$$) : goog.style.getClientPosition($currentEl$$);
    $position$$.x += $offset$$.x;
    $position$$.y += $offset$$.y
  }while($currentWin$$ && $currentWin$$ != $relativeWin$$ && ($currentEl$$ = $currentWin$$.frameElement) && ($currentWin$$ = $currentWin$$.parent));
  return $position$$
};
goog.style.translateRectForAnotherFrame = function $goog$style$translateRectForAnotherFrame$($rect$$, $origBase$$, $newBase_pos$$) {
  if($origBase$$.getDocument() != $newBase_pos$$.getDocument()) {
    var $body$$ = $origBase$$.getDocument().body, $newBase_pos$$ = goog.style.getFramedPageOffset($body$$, $newBase_pos$$.getWindow()), $newBase_pos$$ = goog.math.Coordinate.difference($newBase_pos$$, goog.style.getPageOffset($body$$));
    goog.userAgent.IE && !$origBase$$.isCss1CompatMode() && ($newBase_pos$$ = goog.math.Coordinate.difference($newBase_pos$$, $origBase$$.getDocumentScroll()));
    $rect$$.left += $newBase_pos$$.x;
    $rect$$.top += $newBase_pos$$.y
  }
};
goog.style.getRelativePosition = function $goog$style$getRelativePosition$($a$$, $b$$) {
  var $ap$$ = goog.style.getClientPosition($a$$), $bp$$ = goog.style.getClientPosition($b$$);
  return new goog.math.Coordinate($ap$$.x - $bp$$.x, $ap$$.y - $bp$$.y)
};
goog.style.getClientPosition = function $goog$style$getClientPosition$($el$$) {
  var $pos$$ = new goog.math.Coordinate;
  if($el$$.nodeType == goog.dom.NodeType.ELEMENT) {
    if($el$$.getBoundingClientRect) {
      var $box$$8_isAbstractedEvent_scrollCoord$$ = goog.style.getBoundingClientRect_($el$$);
      $pos$$.x = $box$$8_isAbstractedEvent_scrollCoord$$.left;
      $pos$$.y = $box$$8_isAbstractedEvent_scrollCoord$$.top
    }else {
      var $box$$8_isAbstractedEvent_scrollCoord$$ = goog.dom.getDomHelper($el$$).getDocumentScroll(), $pageCoord_targetEvent$$ = goog.style.getPageOffset($el$$);
      $pos$$.x = $pageCoord_targetEvent$$.x - $box$$8_isAbstractedEvent_scrollCoord$$.x;
      $pos$$.y = $pageCoord_targetEvent$$.y - $box$$8_isAbstractedEvent_scrollCoord$$.y
    }
    goog.userAgent.GECKO && !goog.userAgent.isVersion(12) && ($pos$$ = goog.math.Coordinate.sum($pos$$, goog.style.getCssTranslation($el$$)))
  }else {
    $box$$8_isAbstractedEvent_scrollCoord$$ = goog.isFunction($el$$.getBrowserEvent), $pageCoord_targetEvent$$ = $el$$, $el$$.targetTouches ? $pageCoord_targetEvent$$ = $el$$.targetTouches[0] : $box$$8_isAbstractedEvent_scrollCoord$$ && $el$$.getBrowserEvent().targetTouches && ($pageCoord_targetEvent$$ = $el$$.getBrowserEvent().targetTouches[0]), $pos$$.x = $pageCoord_targetEvent$$.clientX, $pos$$.y = $pageCoord_targetEvent$$.clientY
  }
  return $pos$$
};
goog.style.setPageOffset = function $goog$style$setPageOffset$($el$$, $x$$, $opt_y$$) {
  var $cur$$ = goog.style.getPageOffset($el$$);
  $x$$ instanceof goog.math.Coordinate && ($opt_y$$ = $x$$.y, $x$$ = $x$$.x);
  goog.style.setPosition($el$$, $el$$.offsetLeft + ($x$$ - $cur$$.x), $el$$.offsetTop + ($opt_y$$ - $cur$$.y))
};
goog.style.setSize = function $goog$style$setSize$($element$$, $w$$, $h$$) {
  if($w$$ instanceof goog.math.Size) {
    $h$$ = $w$$.height, $w$$ = $w$$.width
  }else {
    if(void 0 == $h$$) {
      throw Error("missing height argument");
    }
  }
  goog.style.setWidth($element$$, $w$$);
  goog.style.setHeight($element$$, $h$$)
};
goog.style.getPixelStyleValue_ = function $goog$style$getPixelStyleValue_$($value$$, $round$$) {
  "number" == typeof $value$$ && ($value$$ = ($round$$ ? Math.round($value$$) : $value$$) + "px");
  return $value$$
};
goog.style.setHeight = function $goog$style$setHeight$($element$$, $height$$) {
  $element$$.style.height = goog.style.getPixelStyleValue_($height$$, !0)
};
goog.style.setWidth = function $goog$style$setWidth$($element$$, $width$$) {
  $element$$.style.width = goog.style.getPixelStyleValue_($width$$, !0)
};
goog.style.getSize = function $goog$style$getSize$($element$$58_size$$) {
  if("none" != goog.style.getStyle_($element$$58_size$$, "display")) {
    return goog.style.getSizeWithDisplay_($element$$58_size$$)
  }
  var $style$$ = $element$$58_size$$.style, $originalDisplay$$ = $style$$.display, $originalVisibility$$ = $style$$.visibility, $originalPosition$$ = $style$$.position;
  $style$$.visibility = "hidden";
  $style$$.position = "absolute";
  $style$$.display = "inline";
  $element$$58_size$$ = goog.style.getSizeWithDisplay_($element$$58_size$$);
  $style$$.display = $originalDisplay$$;
  $style$$.position = $originalPosition$$;
  $style$$.visibility = $originalVisibility$$;
  return $element$$58_size$$
};
goog.style.getSizeWithDisplay_ = function $goog$style$getSizeWithDisplay_$($clientRect_element$$) {
  var $offsetWidth$$ = $clientRect_element$$.offsetWidth, $offsetHeight$$ = $clientRect_element$$.offsetHeight, $webkitOffsetsZero$$ = goog.userAgent.WEBKIT && !$offsetWidth$$ && !$offsetHeight$$;
  return(!goog.isDef($offsetWidth$$) || $webkitOffsetsZero$$) && $clientRect_element$$.getBoundingClientRect ? ($clientRect_element$$ = goog.style.getBoundingClientRect_($clientRect_element$$), new goog.math.Size($clientRect_element$$.right - $clientRect_element$$.left, $clientRect_element$$.bottom - $clientRect_element$$.top)) : new goog.math.Size($offsetWidth$$, $offsetHeight$$)
};
goog.style.getBounds = function $goog$style$getBounds$($element$$60_s$$) {
  var $o$$ = goog.style.getPageOffset($element$$60_s$$), $element$$60_s$$ = goog.style.getSize($element$$60_s$$);
  return new goog.math.Rect($o$$.x, $o$$.y, $element$$60_s$$.width, $element$$60_s$$.height)
};
goog.style.toCamelCase = function $goog$style$toCamelCase$($selector$$) {
  return goog.string.toCamelCase(String($selector$$))
};
goog.style.toSelectorCase = function $goog$style$toSelectorCase$($selector$$) {
  return goog.string.toSelectorCase($selector$$)
};
goog.style.getOpacity = function $goog$style$getOpacity$($el$$14_result$$) {
  var $match$$2_style$$ = $el$$14_result$$.style, $el$$14_result$$ = "";
  "opacity" in $match$$2_style$$ ? $el$$14_result$$ = $match$$2_style$$.opacity : "MozOpacity" in $match$$2_style$$ ? $el$$14_result$$ = $match$$2_style$$.MozOpacity : "filter" in $match$$2_style$$ && ($match$$2_style$$ = $match$$2_style$$.filter.match(/alpha\(opacity=([\d.]+)\)/)) && ($el$$14_result$$ = String($match$$2_style$$[1] / 100));
  return"" == $el$$14_result$$ ? $el$$14_result$$ : Number($el$$14_result$$)
};
goog.style.setOpacity = function $goog$style$setOpacity$($el$$, $alpha$$) {
  var $style$$ = $el$$.style;
  "opacity" in $style$$ ? $style$$.opacity = $alpha$$ : "MozOpacity" in $style$$ ? $style$$.MozOpacity = $alpha$$ : "filter" in $style$$ && ($style$$.filter = "" === $alpha$$ ? "" : "alpha(opacity=" + 100 * $alpha$$ + ")")
};
goog.style.setTransparentBackgroundImage = function $goog$style$setTransparentBackgroundImage$($el$$, $src$$) {
  var $style$$ = $el$$.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? $style$$.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $src$$ + '", sizingMethod="crop")' : ($style$$.backgroundImage = "url(" + $src$$ + ")", $style$$.backgroundPosition = "top left", $style$$.backgroundRepeat = "no-repeat")
};
goog.style.clearTransparentBackgroundImage = function $goog$style$clearTransparentBackgroundImage$($el$$17_style$$) {
  $el$$17_style$$ = $el$$17_style$$.style;
  "filter" in $el$$17_style$$ ? $el$$17_style$$.filter = "" : $el$$17_style$$.backgroundImage = "none"
};
goog.style.showElement = function $goog$style$showElement$($el$$, $display$$) {
  $el$$.style.display = $display$$ ? "" : "none"
};
goog.style.isElementShown = function $goog$style$isElementShown$($el$$) {
  return"none" != $el$$.style.display
};
goog.style.installStyles = function $goog$style$installStyles$($stylesString$$, $opt_node$$) {
  var $dh$$ = goog.dom.getDomHelper($opt_node$$), $body$$ = null;
  if(goog.userAgent.IE) {
    $body$$ = $dh$$.getDocument().createStyleSheet(), goog.style.setStyles($body$$, $stylesString$$)
  }else {
    var $head$$ = $dh$$.getElementsByTagNameAndClass("head")[0];
    $head$$ || ($body$$ = $dh$$.getElementsByTagNameAndClass("body")[0], $head$$ = $dh$$.createDom("head"), $body$$.parentNode.insertBefore($head$$, $body$$));
    $body$$ = $dh$$.createDom("style");
    goog.style.setStyles($body$$, $stylesString$$);
    $dh$$.appendChild($head$$, $body$$)
  }
  return $body$$
};
goog.style.uninstallStyles = function $goog$style$uninstallStyles$($styleSheet$$) {
  goog.dom.removeNode($styleSheet$$.ownerNode || $styleSheet$$.owningElement || $styleSheet$$)
};
goog.style.setStyles = function $goog$style$setStyles$($element$$, $stylesString$$) {
  goog.userAgent.IE ? $element$$.cssText = $stylesString$$ : $element$$.innerHTML = $stylesString$$
};
goog.style.setPreWrap = function $goog$style$setPreWrap$($el$$20_style$$) {
  $el$$20_style$$ = $el$$20_style$$.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? ($el$$20_style$$.whiteSpace = "pre", $el$$20_style$$.wordWrap = "break-word") : $el$$20_style$$.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function $goog$style$setInlineBlock$($el$$21_style$$) {
  $el$$21_style$$ = $el$$21_style$$.style;
  $el$$21_style$$.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? ($el$$21_style$$.zoom = "1", $el$$21_style$$.display = "inline") : $el$$21_style$$.display = goog.userAgent.GECKO ? goog.userAgent.isVersion("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block"
};
goog.style.isRightToLeft = function $goog$style$isRightToLeft$($el$$) {
  return"rtl" == goog.style.getStyle_($el$$, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function $goog$style$isUnselectable$($el$$) {
  return goog.style.unselectableStyle_ ? "none" == $el$$.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == $el$$.getAttribute("unselectable") : !1
};
goog.style.setUnselectable = function $goog$style$setUnselectable$($el$$24_i$$, $unselectable_value$$, $descendants_opt_noRecurse$$) {
  var $descendants_opt_noRecurse$$ = !$descendants_opt_noRecurse$$ ? $el$$24_i$$.getElementsByTagName("*") : null, $name$$ = goog.style.unselectableStyle_;
  if($name$$) {
    if($unselectable_value$$ = $unselectable_value$$ ? "none" : "", $el$$24_i$$.style[$name$$] = $unselectable_value$$, $descendants_opt_noRecurse$$) {
      for(var $el$$24_i$$ = 0, $descendant$$;$descendant$$ = $descendants_opt_noRecurse$$[$el$$24_i$$];$el$$24_i$$++) {
        $descendant$$.style[$name$$] = $unselectable_value$$
      }
    }
  }else {
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      if($unselectable_value$$ = $unselectable_value$$ ? "on" : "", $el$$24_i$$.setAttribute("unselectable", $unselectable_value$$), $descendants_opt_noRecurse$$) {
        for($el$$24_i$$ = 0;$descendant$$ = $descendants_opt_noRecurse$$[$el$$24_i$$];$el$$24_i$$++) {
          $descendant$$.setAttribute("unselectable", $unselectable_value$$)
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function $goog$style$getBorderBoxSize$($element$$) {
  return new goog.math.Size($element$$.offsetWidth, $element$$.offsetHeight)
};
goog.style.setBorderBoxSize = function $goog$style$setBorderBoxSize$($element$$, $size$$) {
  var $doc$$29_style$$ = goog.dom.getOwnerDocument($element$$), $isCss1CompatMode_paddingBox$$ = goog.dom.getDomHelper($doc$$29_style$$).isCss1CompatMode();
  if(goog.userAgent.IE && (!$isCss1CompatMode_paddingBox$$ || !goog.userAgent.isVersion("8"))) {
    if($doc$$29_style$$ = $element$$.style, $isCss1CompatMode_paddingBox$$) {
      var $isCss1CompatMode_paddingBox$$ = goog.style.getPaddingBox($element$$), $borderBox$$ = goog.style.getBorderBox($element$$);
      $doc$$29_style$$.pixelWidth = $size$$.width - $borderBox$$.left - $isCss1CompatMode_paddingBox$$.left - $isCss1CompatMode_paddingBox$$.right - $borderBox$$.right;
      $doc$$29_style$$.pixelHeight = $size$$.height - $borderBox$$.top - $isCss1CompatMode_paddingBox$$.top - $isCss1CompatMode_paddingBox$$.bottom - $borderBox$$.bottom
    }else {
      $doc$$29_style$$.pixelWidth = $size$$.width, $doc$$29_style$$.pixelHeight = $size$$.height
    }
  }else {
    goog.style.setBoxSizingSize_($element$$, $size$$, "border-box")
  }
};
goog.style.getContentBoxSize = function $goog$style$getContentBoxSize$($borderBox$$1_element$$64_height$$) {
  var $doc$$30_paddingBox$$1_width$$ = goog.dom.getOwnerDocument($borderBox$$1_element$$64_height$$), $borderBoxSize_ieCurrentStyle$$ = goog.userAgent.IE && $borderBox$$1_element$$64_height$$.currentStyle;
  if($borderBoxSize_ieCurrentStyle$$ && goog.dom.getDomHelper($doc$$30_paddingBox$$1_width$$).isCss1CompatMode() && "auto" != $borderBoxSize_ieCurrentStyle$$.width && "auto" != $borderBoxSize_ieCurrentStyle$$.height && !$borderBoxSize_ieCurrentStyle$$.boxSizing) {
    return $doc$$30_paddingBox$$1_width$$ = goog.style.getIePixelValue_($borderBox$$1_element$$64_height$$, $borderBoxSize_ieCurrentStyle$$.width, "width", "pixelWidth"), $borderBox$$1_element$$64_height$$ = goog.style.getIePixelValue_($borderBox$$1_element$$64_height$$, $borderBoxSize_ieCurrentStyle$$.height, "height", "pixelHeight"), new goog.math.Size($doc$$30_paddingBox$$1_width$$, $borderBox$$1_element$$64_height$$)
  }
  $borderBoxSize_ieCurrentStyle$$ = goog.style.getBorderBoxSize($borderBox$$1_element$$64_height$$);
  $doc$$30_paddingBox$$1_width$$ = goog.style.getPaddingBox($borderBox$$1_element$$64_height$$);
  $borderBox$$1_element$$64_height$$ = goog.style.getBorderBox($borderBox$$1_element$$64_height$$);
  return new goog.math.Size($borderBoxSize_ieCurrentStyle$$.width - $borderBox$$1_element$$64_height$$.left - $doc$$30_paddingBox$$1_width$$.left - $doc$$30_paddingBox$$1_width$$.right - $borderBox$$1_element$$64_height$$.right, $borderBoxSize_ieCurrentStyle$$.height - $borderBox$$1_element$$64_height$$.top - $doc$$30_paddingBox$$1_width$$.top - $doc$$30_paddingBox$$1_width$$.bottom - $borderBox$$1_element$$64_height$$.bottom)
};
goog.style.setContentBoxSize = function $goog$style$setContentBoxSize$($element$$, $size$$) {
  var $doc$$31_style$$ = goog.dom.getOwnerDocument($element$$), $isCss1CompatMode$$1_paddingBox$$ = goog.dom.getDomHelper($doc$$31_style$$).isCss1CompatMode();
  if(goog.userAgent.IE && (!$isCss1CompatMode$$1_paddingBox$$ || !goog.userAgent.isVersion("8"))) {
    if($doc$$31_style$$ = $element$$.style, $isCss1CompatMode$$1_paddingBox$$) {
      $doc$$31_style$$.pixelWidth = $size$$.width, $doc$$31_style$$.pixelHeight = $size$$.height
    }else {
      var $isCss1CompatMode$$1_paddingBox$$ = goog.style.getPaddingBox($element$$), $borderBox$$ = goog.style.getBorderBox($element$$);
      $doc$$31_style$$.pixelWidth = $size$$.width + $borderBox$$.left + $isCss1CompatMode$$1_paddingBox$$.left + $isCss1CompatMode$$1_paddingBox$$.right + $borderBox$$.right;
      $doc$$31_style$$.pixelHeight = $size$$.height + $borderBox$$.top + $isCss1CompatMode$$1_paddingBox$$.top + $isCss1CompatMode$$1_paddingBox$$.bottom + $borderBox$$.bottom
    }
  }else {
    goog.style.setBoxSizingSize_($element$$, $size$$, "content-box")
  }
};
goog.style.setBoxSizingSize_ = function $goog$style$setBoxSizingSize_$($element$$66_style$$, $size$$, $boxSizing$$) {
  $element$$66_style$$ = $element$$66_style$$.style;
  goog.userAgent.GECKO ? $element$$66_style$$.MozBoxSizing = $boxSizing$$ : goog.userAgent.WEBKIT ? $element$$66_style$$.WebkitBoxSizing = $boxSizing$$ : $element$$66_style$$.boxSizing = $boxSizing$$;
  $element$$66_style$$.width = Math.max($size$$.width, 0) + "px";
  $element$$66_style$$.height = Math.max($size$$.height, 0) + "px"
};
goog.style.getIePixelValue_ = function $goog$style$getIePixelValue_$($element$$, $pixelValue_value$$, $name$$, $pixelName$$) {
  if(/^\d+px?$/.test($pixelValue_value$$)) {
    return parseInt($pixelValue_value$$, 10)
  }
  var $oldStyleValue$$ = $element$$.style[$name$$], $oldRuntimeValue$$ = $element$$.runtimeStyle[$name$$];
  $element$$.runtimeStyle[$name$$] = $element$$.currentStyle[$name$$];
  $element$$.style[$name$$] = $pixelValue_value$$;
  $pixelValue_value$$ = $element$$.style[$pixelName$$];
  $element$$.style[$name$$] = $oldStyleValue$$;
  $element$$.runtimeStyle[$name$$] = $oldRuntimeValue$$;
  return $pixelValue_value$$
};
goog.style.getIePixelDistance_ = function $goog$style$getIePixelDistance_$($element$$, $propName$$) {
  return goog.style.getIePixelValue_($element$$, goog.style.getCascadedStyle($element$$, $propName$$), "left", "pixelLeft")
};
goog.style.getBox_ = function $goog$style$getBox_$($element$$, $stylePrefix$$) {
  if(goog.userAgent.IE) {
    var $left$$ = goog.style.getIePixelDistance_($element$$, $stylePrefix$$ + "Left"), $right$$ = goog.style.getIePixelDistance_($element$$, $stylePrefix$$ + "Right"), $top$$ = goog.style.getIePixelDistance_($element$$, $stylePrefix$$ + "Top"), $bottom$$ = goog.style.getIePixelDistance_($element$$, $stylePrefix$$ + "Bottom");
    return new goog.math.Box($top$$, $right$$, $bottom$$, $left$$)
  }
  $left$$ = goog.style.getComputedStyle($element$$, $stylePrefix$$ + "Left");
  $right$$ = goog.style.getComputedStyle($element$$, $stylePrefix$$ + "Right");
  $top$$ = goog.style.getComputedStyle($element$$, $stylePrefix$$ + "Top");
  $bottom$$ = goog.style.getComputedStyle($element$$, $stylePrefix$$ + "Bottom");
  return new goog.math.Box(parseFloat($top$$), parseFloat($right$$), parseFloat($bottom$$), parseFloat($left$$))
};
goog.style.getPaddingBox = function $goog$style$getPaddingBox$($element$$) {
  return goog.style.getBox_($element$$, "padding")
};
goog.style.getMarginBox = function $goog$style$getMarginBox$($element$$) {
  return goog.style.getBox_($element$$, "margin")
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function $goog$style$getIePixelBorder_$($element$$, $prop$$) {
  if("none" == goog.style.getCascadedStyle($element$$, $prop$$ + "Style")) {
    return 0
  }
  var $width$$ = goog.style.getCascadedStyle($element$$, $prop$$ + "Width");
  return $width$$ in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[$width$$] : goog.style.getIePixelValue_($element$$, $width$$, "left", "pixelLeft")
};
goog.style.getBorderBox = function $goog$style$getBorderBox$($bottom$$5_element$$) {
  if(goog.userAgent.IE) {
    var $left$$ = goog.style.getIePixelBorder_($bottom$$5_element$$, "borderLeft"), $right$$ = goog.style.getIePixelBorder_($bottom$$5_element$$, "borderRight"), $top$$ = goog.style.getIePixelBorder_($bottom$$5_element$$, "borderTop"), $bottom$$5_element$$ = goog.style.getIePixelBorder_($bottom$$5_element$$, "borderBottom");
    return new goog.math.Box($top$$, $right$$, $bottom$$5_element$$, $left$$)
  }
  $left$$ = goog.style.getComputedStyle($bottom$$5_element$$, "borderLeftWidth");
  $right$$ = goog.style.getComputedStyle($bottom$$5_element$$, "borderRightWidth");
  $top$$ = goog.style.getComputedStyle($bottom$$5_element$$, "borderTopWidth");
  $bottom$$5_element$$ = goog.style.getComputedStyle($bottom$$5_element$$, "borderBottomWidth");
  return new goog.math.Box(parseFloat($top$$), parseFloat($right$$), parseFloat($bottom$$5_element$$), parseFloat($left$$))
};
goog.style.getFontFamily = function $goog$style$getFontFamily$($el$$) {
  var $doc$$32_range$$ = goog.dom.getOwnerDocument($el$$), $font$$ = "";
  if($doc$$32_range$$.body.createTextRange) {
    $doc$$32_range$$ = $doc$$32_range$$.body.createTextRange();
    $doc$$32_range$$.moveToElementText($el$$);
    try {
      $font$$ = $doc$$32_range$$.queryCommandValue("FontName")
    }catch($e$$) {
      $font$$ = ""
    }
  }
  $font$$ || ($font$$ = goog.style.getStyle_($el$$, "fontFamily"));
  $el$$ = $font$$.split(",");
  1 < $el$$.length && ($font$$ = $el$$[0]);
  return goog.string.stripQuotes($font$$, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function $goog$style$getLengthUnits$($units$$1_value$$) {
  return($units$$1_value$$ = $units$$1_value$$.match(goog.style.lengthUnitRegex_)) && $units$$1_value$$[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function $goog$style$getFontSize$($el$$) {
  var $fontSize$$ = goog.style.getStyle_($el$$, "fontSize"), $parentSize_sizeElement_sizeUnits$$ = goog.style.getLengthUnits($fontSize$$);
  if($fontSize$$ && "px" == $parentSize_sizeElement_sizeUnits$$) {
    return parseInt($fontSize$$, 10)
  }
  if(goog.userAgent.IE) {
    if($parentSize_sizeElement_sizeUnits$$ in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_($el$$, $fontSize$$, "left", "pixelLeft")
    }
    if($el$$.parentNode && $el$$.parentNode.nodeType == goog.dom.NodeType.ELEMENT && $parentSize_sizeElement_sizeUnits$$ in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      return $el$$ = $el$$.parentNode, $parentSize_sizeElement_sizeUnits$$ = goog.style.getStyle_($el$$, "fontSize"), goog.style.getIePixelValue_($el$$, $fontSize$$ == $parentSize_sizeElement_sizeUnits$$ ? "1em" : $fontSize$$, "left", "pixelLeft")
    }
  }
  $parentSize_sizeElement_sizeUnits$$ = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild($el$$, $parentSize_sizeElement_sizeUnits$$);
  $fontSize$$ = $parentSize_sizeElement_sizeUnits$$.offsetHeight;
  goog.dom.removeNode($parentSize_sizeElement_sizeUnits$$);
  return $fontSize$$
};
goog.style.parseStyleAttribute = function $goog$style$parseStyleAttribute$($value$$) {
  var $result$$ = {};
  goog.array.forEach($value$$.split(/\s*;\s*/), function($keyValue_pair$$) {
    $keyValue_pair$$ = $keyValue_pair$$.split(/\s*:\s*/);
    2 == $keyValue_pair$$.length && ($result$$[goog.string.toCamelCase($keyValue_pair$$[0].toLowerCase())] = $keyValue_pair$$[1])
  });
  return $result$$
};
goog.style.toStyleAttribute = function $goog$style$toStyleAttribute$($obj$$) {
  var $buffer$$ = [];
  goog.object.forEach($obj$$, function($value$$, $key$$) {
    $buffer$$.push(goog.string.toSelectorCase($key$$), ":", $value$$, ";")
  });
  return $buffer$$.join("")
};
goog.style.setFloat = function $goog$style$setFloat$($el$$, $value$$) {
  $el$$.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = $value$$
};
goog.style.getFloat = function $goog$style$getFloat$($el$$) {
  return $el$$.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function $goog$style$getScrollbarWidth$($innerDiv_opt_className_width$$) {
  var $outerDiv$$ = goog.dom.createElement("div");
  $innerDiv_opt_className_width$$ && ($outerDiv$$.className = $innerDiv_opt_className_width$$);
  $outerDiv$$.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  $innerDiv_opt_className_width$$ = goog.dom.createElement("div");
  goog.style.setSize($innerDiv_opt_className_width$$, "200px", "200px");
  $outerDiv$$.appendChild($innerDiv_opt_className_width$$);
  goog.dom.appendChild(goog.dom.getDocument().body, $outerDiv$$);
  $innerDiv_opt_className_width$$ = $outerDiv$$.offsetWidth - $outerDiv$$.clientWidth;
  goog.dom.removeNode($outerDiv$$);
  return $innerDiv_opt_className_width$$
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function $goog$style$getCssTranslation$($element$$) {
  var $property$$;
  goog.userAgent.IE ? $property$$ = "-ms-transform" : goog.userAgent.WEBKIT ? $property$$ = "-webkit-transform" : goog.userAgent.OPERA ? $property$$ = "-o-transform" : goog.userAgent.GECKO && ($property$$ = "-moz-transform");
  var $transform$$;
  $property$$ && ($transform$$ = goog.style.getStyle_($element$$, $property$$));
  $transform$$ || ($transform$$ = goog.style.getStyle_($element$$, "transform"));
  if(!$transform$$) {
    return new goog.math.Coordinate(0, 0)
  }
  $element$$ = $transform$$.match(goog.style.MATRIX_TRANSLATION_REGEX_);
  return!$element$$ ? new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(parseFloat($element$$[1]), parseFloat($element$$[2]))
};
goog.style.bidi = {};
goog.style.bidi.getScrollLeft = function $goog$style$bidi$getScrollLeft$($element$$) {
  var $isRtl$$ = goog.style.isRightToLeft($element$$);
  return $isRtl$$ && goog.userAgent.GECKO ? -$element$$.scrollLeft : $isRtl$$ && (!goog.userAgent.IE || !goog.userAgent.isVersion("8")) ? $element$$.scrollWidth - $element$$.clientWidth - $element$$.scrollLeft : $element$$.scrollLeft
};
goog.style.bidi.getOffsetStart = function $goog$style$bidi$getOffsetStart$($element$$) {
  var $offsetLeftForReal$$ = $element$$.offsetLeft, $bestParent$$ = $element$$.offsetParent;
  !$bestParent$$ && "fixed" == goog.style.getComputedPosition($element$$) && ($bestParent$$ = goog.dom.getOwnerDocument($element$$).documentElement);
  if(!$bestParent$$) {
    return $offsetLeftForReal$$
  }
  if(goog.userAgent.GECKO) {
    var $borderWidths$$ = goog.style.getBorderBox($bestParent$$), $offsetLeftForReal$$ = $offsetLeftForReal$$ + $borderWidths$$.left
  }else {
    goog.userAgent.isDocumentMode(8) && ($borderWidths$$ = goog.style.getBorderBox($bestParent$$), $offsetLeftForReal$$ -= $borderWidths$$.left)
  }
  return goog.style.isRightToLeft($bestParent$$) ? $bestParent$$.clientWidth - ($offsetLeftForReal$$ + $element$$.offsetWidth) : $offsetLeftForReal$$
};
goog.style.bidi.setScrollOffset = function $goog$style$bidi$setScrollOffset$($element$$, $offsetStart$$) {
  $offsetStart$$ = Math.max($offsetStart$$, 0);
  $element$$.scrollLeft = goog.style.isRightToLeft($element$$) ? goog.userAgent.GECKO ? -$offsetStart$$ : !goog.userAgent.IE || !goog.userAgent.isVersion("8") ? $element$$.scrollWidth - $offsetStart$$ - $element$$.clientWidth : $offsetStart$$ : $offsetStart$$
};
goog.style.bidi.setPosition = function $goog$style$bidi$setPosition$($elem$$, $left$$, $top$$, $isRtl$$) {
  goog.isNull($top$$) || ($elem$$.style.top = $top$$ + "px");
  $isRtl$$ ? ($elem$$.style.right = $left$$ + "px", $elem$$.style.left = "") : ($elem$$.style.left = $left$$ + "px", $elem$$.style.right = "")
};
goog.fx = {};
goog.fx.Dragger = function $goog$fx$Dragger$($target$$, $opt_handle$$, $opt_limits$$) {
  goog.events.EventTarget.call(this);
  this.target = $target$$;
  this.handle = $opt_handle$$ || $target$$;
  this.limits = $opt_limits$$ || new goog.math.Rect(NaN, NaN, NaN, NaN);
  this.document_ = goog.dom.getOwnerDocument($target$$);
  this.eventHandler_ = new goog.events.EventHandler(this);
  goog.events.listen(this.handle, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.startDrag, !1, this)
};
goog.inherits(goog.fx.Dragger, goog.events.EventTarget);
goog.fx.Dragger.HAS_SET_CAPTURE_ = goog.userAgent.IE || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.3");
goog.fx.Dragger.EventType = {EARLY_CANCEL:"earlycancel", START:"start", BEFOREDRAG:"beforedrag", DRAG:"drag", END:"end"};
goog.fx.Dragger.prototype.clientX = 0;
goog.fx.Dragger.prototype.clientY = 0;
goog.fx.Dragger.prototype.screenX = 0;
goog.fx.Dragger.prototype.screenY = 0;
goog.fx.Dragger.prototype.startX = 0;
goog.fx.Dragger.prototype.startY = 0;
goog.fx.Dragger.prototype.deltaX = 0;
goog.fx.Dragger.prototype.deltaY = 0;
goog.fx.Dragger.prototype.enabled_ = !0;
goog.fx.Dragger.prototype.dragging_ = !1;
goog.fx.Dragger.prototype.hysteresisDistanceSquared_ = 0;
goog.fx.Dragger.prototype.mouseDownTime_ = 0;
goog.fx.Dragger.prototype.ieDragStartCancellingOn_ = !1;
goog.fx.Dragger.prototype.useRightPositioningForRtl_ = !1;
goog.fx.Dragger.prototype.enableRightPositioningForRtl = function $goog$fx$Dragger$$enableRightPositioningForRtl$($useRightPositioningForRtl$$) {
  this.useRightPositioningForRtl_ = $useRightPositioningForRtl$$
};
goog.fx.Dragger.prototype.getHandler = function $goog$fx$Dragger$$getHandler$() {
  return this.eventHandler_
};
goog.fx.Dragger.prototype.setLimits = function $goog$fx$Dragger$$setLimits$($limits$$) {
  this.limits = $limits$$ || new goog.math.Rect(NaN, NaN, NaN, NaN)
};
goog.fx.Dragger.prototype.setHysteresis = function $goog$fx$Dragger$$setHysteresis$($distance$$) {
  this.hysteresisDistanceSquared_ = Math.pow($distance$$, 2)
};
goog.fx.Dragger.prototype.getHysteresis = function $goog$fx$Dragger$$getHysteresis$() {
  return Math.sqrt(this.hysteresisDistanceSquared_)
};
goog.fx.Dragger.prototype.setScrollTarget = function $goog$fx$Dragger$$setScrollTarget$($scrollTarget$$) {
  this.scrollTarget_ = $scrollTarget$$
};
goog.fx.Dragger.prototype.setCancelIeDragStart = function $goog$fx$Dragger$$setCancelIeDragStart$($cancelIeDragStart$$) {
  this.ieDragStartCancellingOn_ = $cancelIeDragStart$$
};
goog.fx.Dragger.prototype.getEnabled = function $goog$fx$Dragger$$getEnabled$() {
  return this.enabled_
};
goog.fx.Dragger.prototype.setEnabled = function $goog$fx$Dragger$$setEnabled$($enabled$$) {
  this.enabled_ = $enabled$$
};
goog.fx.Dragger.prototype.disposeInternal = function $goog$fx$Dragger$$disposeInternal$() {
  goog.fx.Dragger.superClass_.disposeInternal.call(this);
  goog.events.unlisten(this.handle, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.startDrag, !1, this);
  this.cleanUpAfterDragging_();
  this.eventHandler_ = this.handle = this.target = null
};
goog.fx.Dragger.prototype.isRightToLeft_ = function $goog$fx$Dragger$$isRightToLeft_$() {
  goog.isDef(this.rightToLeft_) || (this.rightToLeft_ = goog.style.isRightToLeft(this.target));
  return this.rightToLeft_
};
goog.fx.Dragger.prototype.startDrag = function $goog$fx$Dragger$$startDrag$($e$$) {
  var $isMouseDown$$ = $e$$.type == goog.events.EventType.MOUSEDOWN;
  if(this.enabled_ && !this.dragging_ && (!$isMouseDown$$ || $e$$.isMouseActionButton())) {
    this.maybeReinitTouchEvent_($e$$);
    if(0 == this.hysteresisDistanceSquared_) {
      if(this.fireDragStart_($e$$)) {
        this.dragging_ = !0, $e$$.preventDefault()
      }else {
        return
      }
    }else {
      $e$$.preventDefault()
    }
    this.setupDragHandlers();
    this.clientX = this.startX = $e$$.clientX;
    this.clientY = this.startY = $e$$.clientY;
    this.screenX = $e$$.screenX;
    this.screenY = $e$$.screenY;
    this.deltaX = this.useRightPositioningForRtl_ ? goog.style.bidi.getOffsetStart(this.target) : this.target.offsetLeft;
    this.deltaY = this.target.offsetTop;
    this.pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll();
    this.mouseDownTime_ = goog.now()
  }else {
    this.dispatchEvent(goog.fx.Dragger.EventType.EARLY_CANCEL)
  }
};
goog.fx.Dragger.prototype.setupDragHandlers = function $goog$fx$Dragger$$setupDragHandlers$() {
  var $doc$$ = this.document_, $docEl$$ = $doc$$.documentElement, $useCapture$$ = !goog.fx.Dragger.HAS_SET_CAPTURE_;
  this.eventHandler_.listen($doc$$, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], this.handleMove_, $useCapture$$);
  this.eventHandler_.listen($doc$$, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], this.endDrag, $useCapture$$);
  goog.fx.Dragger.HAS_SET_CAPTURE_ ? ($docEl$$.setCapture(!1), this.eventHandler_.listen($docEl$$, goog.events.EventType.LOSECAPTURE, this.endDrag)) : this.eventHandler_.listen(goog.dom.getWindow($doc$$), goog.events.EventType.BLUR, this.endDrag);
  goog.userAgent.IE && this.ieDragStartCancellingOn_ && this.eventHandler_.listen($doc$$, goog.events.EventType.DRAGSTART, goog.events.Event.preventDefault);
  this.scrollTarget_ && this.eventHandler_.listen(this.scrollTarget_, goog.events.EventType.SCROLL, this.onScroll_, $useCapture$$)
};
goog.fx.Dragger.prototype.fireDragStart_ = function $goog$fx$Dragger$$fireDragStart_$($e$$) {
  return this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.START, this, $e$$.clientX, $e$$.clientY, $e$$))
};
goog.fx.Dragger.prototype.cleanUpAfterDragging_ = function $goog$fx$Dragger$$cleanUpAfterDragging_$() {
  this.eventHandler_.removeAll();
  goog.fx.Dragger.HAS_SET_CAPTURE_ && this.document_.releaseCapture()
};
goog.fx.Dragger.prototype.endDrag = function $goog$fx$Dragger$$endDrag$($e$$, $opt_dragCanceled$$) {
  this.cleanUpAfterDragging_();
  if(this.dragging_) {
    this.maybeReinitTouchEvent_($e$$);
    this.dragging_ = !1;
    var $x$$ = this.limitX(this.deltaX), $y$$ = this.limitY(this.deltaY);
    this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.END, this, $e$$.clientX, $e$$.clientY, $e$$, $x$$, $y$$, $opt_dragCanceled$$ || $e$$.type == goog.events.EventType.TOUCHCANCEL))
  }else {
    this.dispatchEvent(goog.fx.Dragger.EventType.EARLY_CANCEL)
  }
  ($e$$.type == goog.events.EventType.TOUCHEND || $e$$.type == goog.events.EventType.TOUCHCANCEL) && $e$$.preventDefault()
};
goog.fx.Dragger.prototype.endDragCancel = function $goog$fx$Dragger$$endDragCancel$($e$$) {
  this.endDrag($e$$, !0)
};
goog.fx.Dragger.prototype.maybeReinitTouchEvent_ = function $goog$fx$Dragger$$maybeReinitTouchEvent_$($e$$) {
  var $type$$ = $e$$.type;
  $type$$ == goog.events.EventType.TOUCHSTART || $type$$ == goog.events.EventType.TOUCHMOVE ? $e$$.init($e$$.getBrowserEvent().targetTouches[0], $e$$.currentTarget) : ($type$$ == goog.events.EventType.TOUCHEND || $type$$ == goog.events.EventType.TOUCHCANCEL) && $e$$.init($e$$.getBrowserEvent().changedTouches[0], $e$$.currentTarget)
};
goog.fx.Dragger.prototype.handleMove_ = function $goog$fx$Dragger$$handleMove_$($e$$) {
  if(this.enabled_) {
    this.maybeReinitTouchEvent_($e$$);
    var $dx$$7_x$$ = (this.useRightPositioningForRtl_ && this.isRightToLeft_() ? -1 : 1) * ($e$$.clientX - this.clientX), $dy$$7_pos$$5_y$$ = $e$$.clientY - this.clientY;
    this.clientX = $e$$.clientX;
    this.clientY = $e$$.clientY;
    this.screenX = $e$$.screenX;
    this.screenY = $e$$.screenY;
    if(!this.dragging_) {
      var $diffX$$ = this.startX - this.clientX, $diffY$$ = this.startY - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.hysteresisDistanceSquared_) {
        if(this.fireDragStart_($e$$)) {
          this.dragging_ = !0
        }else {
          this.isDisposed() || this.endDrag($e$$);
          return
        }
      }
    }
    $dy$$7_pos$$5_y$$ = this.calculatePosition_($dx$$7_x$$, $dy$$7_pos$$5_y$$);
    $dx$$7_x$$ = $dy$$7_pos$$5_y$$.x;
    $dy$$7_pos$$5_y$$ = $dy$$7_pos$$5_y$$.y;
    this.dragging_ && this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.BEFOREDRAG, this, $e$$.clientX, $e$$.clientY, $e$$, $dx$$7_x$$, $dy$$7_pos$$5_y$$)) && (this.doDrag($e$$, $dx$$7_x$$, $dy$$7_pos$$5_y$$, !1), $e$$.preventDefault())
  }
};
goog.fx.Dragger.prototype.calculatePosition_ = function $goog$fx$Dragger$$calculatePosition_$($dx$$, $dy$$) {
  var $pageScroll_x$$ = goog.dom.getDomHelper(this.document_).getDocumentScroll(), $dx$$ = $dx$$ + ($pageScroll_x$$.x - this.pageScroll.x), $dy$$ = $dy$$ + ($pageScroll_x$$.y - this.pageScroll.y);
  this.pageScroll = $pageScroll_x$$;
  this.deltaX += $dx$$;
  this.deltaY += $dy$$;
  var $pageScroll_x$$ = this.limitX(this.deltaX), $y$$ = this.limitY(this.deltaY);
  return new goog.math.Coordinate($pageScroll_x$$, $y$$)
};
goog.fx.Dragger.prototype.onScroll_ = function $goog$fx$Dragger$$onScroll_$($e$$) {
  var $pos$$ = this.calculatePosition_(0, 0);
  $e$$.clientX = this.clientX;
  $e$$.clientY = this.clientY;
  this.doDrag($e$$, $pos$$.x, $pos$$.y, !0)
};
goog.fx.Dragger.prototype.doDrag = function $goog$fx$Dragger$$doDrag$($e$$, $x$$, $y$$) {
  this.defaultAction($x$$, $y$$);
  this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.DRAG, this, $e$$.clientX, $e$$.clientY, $e$$, $x$$, $y$$))
};
goog.fx.Dragger.prototype.limitX = function $goog$fx$Dragger$$limitX$($x$$) {
  var $rect$$6_width$$ = this.limits, $left$$ = !isNaN($rect$$6_width$$.left) ? $rect$$6_width$$.left : null, $rect$$6_width$$ = !isNaN($rect$$6_width$$.width) ? $rect$$6_width$$.width : 0;
  return Math.min(null != $left$$ ? $left$$ + $rect$$6_width$$ : Infinity, Math.max(null != $left$$ ? $left$$ : -Infinity, $x$$))
};
goog.fx.Dragger.prototype.limitY = function $goog$fx$Dragger$$limitY$($y$$) {
  var $height$$17_rect$$ = this.limits, $top$$ = !isNaN($height$$17_rect$$.top) ? $height$$17_rect$$.top : null, $height$$17_rect$$ = !isNaN($height$$17_rect$$.height) ? $height$$17_rect$$.height : 0;
  return Math.min(null != $top$$ ? $top$$ + $height$$17_rect$$ : Infinity, Math.max(null != $top$$ ? $top$$ : -Infinity, $y$$))
};
goog.fx.Dragger.prototype.defaultAction = function $goog$fx$Dragger$$defaultAction$($x$$, $y$$) {
  this.useRightPositioningForRtl_ && this.isRightToLeft_() ? this.target.style.right = $x$$ + "px" : this.target.style.left = $x$$ + "px";
  this.target.style.top = $y$$ + "px"
};
goog.fx.Dragger.prototype.isDragging = function $goog$fx$Dragger$$isDragging$() {
  return this.dragging_
};
goog.fx.DragEvent = function $goog$fx$DragEvent$($type$$, $dragobj$$, $clientX$$, $clientY$$, $browserEvent$$, $opt_actX$$, $opt_actY$$, $opt_dragCanceled$$) {
  goog.events.Event.call(this, $type$$);
  this.clientX = $clientX$$;
  this.clientY = $clientY$$;
  this.browserEvent = $browserEvent$$;
  this.left = goog.isDef($opt_actX$$) ? $opt_actX$$ : $dragobj$$.deltaX;
  this.top = goog.isDef($opt_actY$$) ? $opt_actY$$ : $dragobj$$.deltaY;
  this.dragger = $dragobj$$;
  this.dragCanceled = !!$opt_dragCanceled$$
};
goog.inherits(goog.fx.DragEvent, goog.events.Event);
goog.structs.getCount = function $goog$structs$getCount$($col$$) {
  return"function" == typeof $col$$.getCount ? $col$$.getCount() : goog.isArrayLike($col$$) || goog.isString($col$$) ? $col$$.length : goog.object.getCount($col$$)
};
goog.structs.getValues = function $goog$structs$getValues$($col$$) {
  if("function" == typeof $col$$.getValues) {
    return $col$$.getValues()
  }
  if(goog.isString($col$$)) {
    return $col$$.split("")
  }
  if(goog.isArrayLike($col$$)) {
    for(var $rv$$ = [], $l$$ = $col$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$.push($col$$[$i$$])
    }
    return $rv$$
  }
  return goog.object.getValues($col$$)
};
goog.structs.getKeys = function $goog$structs$getKeys$($col$$2_l$$) {
  if("function" == typeof $col$$2_l$$.getKeys) {
    return $col$$2_l$$.getKeys()
  }
  if("function" != typeof $col$$2_l$$.getValues) {
    if(goog.isArrayLike($col$$2_l$$) || goog.isString($col$$2_l$$)) {
      for(var $rv$$ = [], $col$$2_l$$ = $col$$2_l$$.length, $i$$ = 0;$i$$ < $col$$2_l$$;$i$$++) {
        $rv$$.push($i$$)
      }
      return $rv$$
    }
    return goog.object.getKeys($col$$2_l$$)
  }
};
goog.structs.contains = function $goog$structs$contains$($col$$, $val$$) {
  return"function" == typeof $col$$.contains ? $col$$.contains($val$$) : "function" == typeof $col$$.containsValue ? $col$$.containsValue($val$$) : goog.isArrayLike($col$$) || goog.isString($col$$) ? goog.array.contains($col$$, $val$$) : goog.object.containsValue($col$$, $val$$)
};
goog.structs.isEmpty = function $goog$structs$isEmpty$($col$$) {
  return"function" == typeof $col$$.isEmpty ? $col$$.isEmpty() : goog.isArrayLike($col$$) || goog.isString($col$$) ? goog.array.isEmpty($col$$) : goog.object.isEmpty($col$$)
};
goog.structs.clear = function $goog$structs$clear$($col$$) {
  "function" == typeof $col$$.clear ? $col$$.clear() : goog.isArrayLike($col$$) ? goog.array.clear($col$$) : goog.object.clear($col$$)
};
goog.structs.forEach = function $goog$structs$forEach$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.forEach) {
    $col$$.forEach($f$$, $opt_obj$$)
  }else {
    if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
      goog.array.forEach($col$$, $f$$, $opt_obj$$)
    }else {
      for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
        $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)
      }
    }
  }
};
goog.structs.filter = function $goog$structs$filter$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.filter) {
    return $col$$.filter($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.filter($col$$, $f$$, $opt_obj$$)
  }
  var $rv$$, $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length;
  if($keys$$) {
    $rv$$ = {};
    for(var $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$[$i$$], $col$$) && ($rv$$[$keys$$[$i$$]] = $values$$[$i$$])
    }
  }else {
    $rv$$ = [];
    for($i$$ = 0;$i$$ < $l$$;$i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], void 0, $col$$) && $rv$$.push($values$$[$i$$])
    }
  }
  return $rv$$
};
goog.structs.map = function $goog$structs$map$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.map) {
    return $col$$.map($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.map($col$$, $f$$, $opt_obj$$)
  }
  var $rv$$, $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length;
  if($keys$$) {
    $rv$$ = {};
    for(var $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$[$keys$$[$i$$]] = $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$[$i$$], $col$$)
    }
  }else {
    $rv$$ = [];
    for($i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$[$i$$] = $f$$.call($opt_obj$$, $values$$[$i$$], void 0, $col$$)
    }
  }
  return $rv$$
};
goog.structs.some = function $goog$structs$some$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.some) {
    return $col$$.some($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.some($col$$, $f$$, $opt_obj$$)
  }
  for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)) {
      return!0
    }
  }
  return!1
};
goog.structs.every = function $goog$structs$every$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.every) {
    return $col$$.every($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.every($col$$, $f$$, $opt_obj$$)
  }
  for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if(!$f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)) {
      return!1
    }
  }
  return!0
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function $goog$iter$Iterator$() {
};
goog.iter.Iterator.prototype.next = function $goog$iter$Iterator$$next$() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function $goog$iter$Iterator$$__iterator__$() {
  return this
};
goog.iter.toIterator = function $goog$iter$toIterator$($iterable$$) {
  if($iterable$$ instanceof goog.iter.Iterator) {
    return $iterable$$
  }
  if("function" == typeof $iterable$$.__iterator__) {
    return $iterable$$.__iterator__(!1)
  }
  if(goog.isArrayLike($iterable$$)) {
    var $i$$ = 0, $newIter$$ = new goog.iter.Iterator;
    $newIter$$.next = function $$newIter$$$next$() {
      for(;;) {
        if($i$$ >= $iterable$$.length) {
          throw goog.iter.StopIteration;
        }
        if($i$$ in $iterable$$) {
          return $iterable$$[$i$$++]
        }
        $i$$++
      }
    };
    return $newIter$$
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function $goog$iter$forEach$($iterable$$, $f$$, $opt_obj$$) {
  if(goog.isArrayLike($iterable$$)) {
    try {
      goog.array.forEach($iterable$$, $f$$, $opt_obj$$)
    }catch($ex$$) {
      if($ex$$ !== goog.iter.StopIteration) {
        throw $ex$$;
      }
    }
  }else {
    $iterable$$ = goog.iter.toIterator($iterable$$);
    try {
      for(;;) {
        $f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)
      }
    }catch($ex$$0$$) {
      if($ex$$0$$ !== goog.iter.StopIteration) {
        throw $ex$$0$$;
      }
    }
  }
};
goog.iter.filter = function $goog$iter$filter$($iterable$$2_newIter$$, $f$$, $opt_obj$$) {
  var $iterator$$ = goog.iter.toIterator($iterable$$2_newIter$$), $iterable$$2_newIter$$ = new goog.iter.Iterator;
  $iterable$$2_newIter$$.next = function $$iterable$$2_newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterator$$.next();
      if($f$$.call($opt_obj$$, $val$$, void 0, $iterator$$)) {
        return $val$$
      }
    }
  };
  return $iterable$$2_newIter$$
};
goog.iter.range = function $goog$iter$range$($startOrStop$$, $opt_stop$$, $opt_step$$) {
  var $start$$ = 0, $stop$$ = $startOrStop$$, $step$$ = $opt_step$$ || 1;
  1 < arguments.length && ($start$$ = $startOrStop$$, $stop$$ = $opt_stop$$);
  if(0 == $step$$) {
    throw Error("Range step argument must not be zero");
  }
  var $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    if(0 < $step$$ && $start$$ >= $stop$$ || 0 > $step$$ && $start$$ <= $stop$$) {
      throw goog.iter.StopIteration;
    }
    var $rv$$ = $start$$;
    $start$$ += $step$$;
    return $rv$$
  };
  return $newIter$$
};
goog.iter.join = function $goog$iter$join$($iterable$$, $deliminator$$) {
  return goog.iter.toArray($iterable$$).join($deliminator$$)
};
goog.iter.map = function $goog$iter$map$($iterable$$4_newIter$$, $f$$, $opt_obj$$) {
  var $iterator$$ = goog.iter.toIterator($iterable$$4_newIter$$), $iterable$$4_newIter$$ = new goog.iter.Iterator;
  $iterable$$4_newIter$$.next = function $$iterable$$4_newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterator$$.next();
      return $f$$.call($opt_obj$$, $val$$, void 0, $iterator$$)
    }
  };
  return $iterable$$4_newIter$$
};
goog.iter.reduce = function $goog$iter$reduce$($iterable$$, $f$$, $val$$0$$, $opt_obj$$) {
  var $rval$$ = $val$$0$$;
  goog.iter.forEach($iterable$$, function($val$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$)
  });
  return $rval$$
};
goog.iter.some = function $goog$iter$some$($iterable$$, $f$$, $opt_obj$$) {
  $iterable$$ = goog.iter.toIterator($iterable$$);
  try {
    for(;;) {
      if($f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)) {
        return!0
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
  }
  return!1
};
goog.iter.every = function $goog$iter$every$($iterable$$, $f$$, $opt_obj$$) {
  $iterable$$ = goog.iter.toIterator($iterable$$);
  try {
    for(;;) {
      if(!$f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)) {
        return!1
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
  }
  return!0
};
goog.iter.chain = function $goog$iter$chain$($var_args$$) {
  var $args$$ = arguments, $length$$ = $args$$.length, $i$$ = 0, $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    try {
      if($i$$ >= $length$$) {
        throw goog.iter.StopIteration;
      }
      return goog.iter.toIterator($args$$[$i$$]).next()
    }catch($ex$$) {
      if($ex$$ !== goog.iter.StopIteration || $i$$ >= $length$$) {
        throw $ex$$;
      }
      $i$$++;
      return this.next()
    }
  };
  return $newIter$$
};
goog.iter.dropWhile = function $goog$iter$dropWhile$($iterable$$8_newIter$$, $f$$, $opt_obj$$) {
  var $iterator$$ = goog.iter.toIterator($iterable$$8_newIter$$), $iterable$$8_newIter$$ = new goog.iter.Iterator, $dropping$$ = !0;
  $iterable$$8_newIter$$.next = function $$iterable$$8_newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterator$$.next();
      if(!$dropping$$ || !$f$$.call($opt_obj$$, $val$$, void 0, $iterator$$)) {
        return $dropping$$ = !1, $val$$
      }
    }
  };
  return $iterable$$8_newIter$$
};
goog.iter.takeWhile = function $goog$iter$takeWhile$($iterable$$9_newIter$$, $f$$, $opt_obj$$) {
  var $iterator$$ = goog.iter.toIterator($iterable$$9_newIter$$), $iterable$$9_newIter$$ = new goog.iter.Iterator, $taking$$ = !0;
  $iterable$$9_newIter$$.next = function $$iterable$$9_newIter$$$next$() {
    for(;;) {
      if($taking$$) {
        var $val$$ = $iterator$$.next();
        if($f$$.call($opt_obj$$, $val$$, void 0, $iterator$$)) {
          return $val$$
        }
        $taking$$ = !1
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return $iterable$$9_newIter$$
};
goog.iter.toArray = function $goog$iter$toArray$($iterable$$) {
  if(goog.isArrayLike($iterable$$)) {
    return goog.array.toArray($iterable$$)
  }
  var $iterable$$ = goog.iter.toIterator($iterable$$), $array$$ = [];
  goog.iter.forEach($iterable$$, function($val$$) {
    $array$$.push($val$$)
  });
  return $array$$
};
goog.iter.equals = function $goog$iter$equals$($iterable1$$, $iterable2$$) {
  var $iterable1$$ = goog.iter.toIterator($iterable1$$), $iterable2$$ = goog.iter.toIterator($iterable2$$), $b1$$, $b2$$;
  try {
    for(;;) {
      $b1$$ = $b2$$ = !1;
      var $val1$$ = $iterable1$$.next();
      $b1$$ = !0;
      var $val2$$ = $iterable2$$.next();
      $b2$$ = !0;
      if($val1$$ != $val2$$) {
        break
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
    if($b1$$ && !$b2$$) {
      return!1
    }
    if(!$b2$$) {
      try {
        $iterable2$$.next()
      }catch($ex1$$) {
        if($ex1$$ !== goog.iter.StopIteration) {
          throw $ex1$$;
        }
        return!0
      }
    }
  }
  return!1
};
goog.iter.nextOrValue = function $goog$iter$nextOrValue$($iterable$$, $defaultValue$$) {
  try {
    return goog.iter.toIterator($iterable$$).next()
  }catch($e$$) {
    if($e$$ != goog.iter.StopIteration) {
      throw $e$$;
    }
    return $defaultValue$$
  }
};
goog.iter.product = function $goog$iter$product$($var_args$$) {
  if(goog.array.some(arguments, function($arr$$) {
    return!$arr$$.length
  }) || !arguments.length) {
    return new goog.iter.Iterator
  }
  var $iter$$ = new goog.iter.Iterator, $arrays$$ = arguments, $indicies$$ = goog.array.repeat(0, $arrays$$.length);
  $iter$$.next = function $$iter$$$next$() {
    if($indicies$$) {
      for(var $retVal$$ = goog.array.map($indicies$$, function($valueIndex$$, $arrayIndex$$) {
        return $arrays$$[$arrayIndex$$][$valueIndex$$]
      }), $i$$ = $indicies$$.length - 1;0 <= $i$$;$i$$--) {
        goog.asserts.assert($indicies$$);
        if($indicies$$[$i$$] < $arrays$$[$i$$].length - 1) {
          $indicies$$[$i$$]++;
          break
        }
        if(0 == $i$$) {
          $indicies$$ = null;
          break
        }
        $indicies$$[$i$$] = 0
      }
      return $retVal$$
    }
    throw goog.iter.StopIteration;
  };
  return $iter$$
};
goog.iter.cycle = function $goog$iter$cycle$($iter$$1_iterable$$) {
  var $baseIterator$$ = goog.iter.toIterator($iter$$1_iterable$$), $cache$$ = [], $cacheIndex$$ = 0, $iter$$1_iterable$$ = new goog.iter.Iterator, $useCache$$ = !1;
  $iter$$1_iterable$$.next = function $$iter$$1_iterable$$$next$() {
    var $returnElement$$ = null;
    if(!$useCache$$) {
      try {
        return $returnElement$$ = $baseIterator$$.next(), $cache$$.push($returnElement$$), $returnElement$$
      }catch($e$$) {
        if($e$$ != goog.iter.StopIteration || goog.array.isEmpty($cache$$)) {
          throw $e$$;
        }
        $useCache$$ = !0
      }
    }
    $returnElement$$ = $cache$$[$cacheIndex$$];
    $cacheIndex$$ = ($cacheIndex$$ + 1) % $cache$$.length;
    return $returnElement$$
  };
  return $iter$$1_iterable$$
};
goog.structs.Map = function $goog$structs$Map$($opt_map$$, $var_args$$) {
  this.map_ = {};
  this.keys_ = [];
  var $argLength$$ = arguments.length;
  if(1 < $argLength$$) {
    if($argLength$$ % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var $i$$ = 0;$i$$ < $argLength$$;$i$$ += 2) {
      this.set(arguments[$i$$], arguments[$i$$ + 1])
    }
  }else {
    $opt_map$$ && this.addAll($opt_map$$)
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function $goog$structs$Map$$getCount$() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function $goog$structs$Map$$getValues$() {
  this.cleanupKeysArray_();
  for(var $rv$$ = [], $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    $rv$$.push(this.map_[this.keys_[$i$$]])
  }
  return $rv$$
};
goog.structs.Map.prototype.getKeys = function $goog$structs$Map$$getKeys$() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function $goog$structs$Map$$containsKey$($key$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$)
};
goog.structs.Map.prototype.containsValue = function $goog$structs$Map$$containsValue$($val$$) {
  for(var $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    if(goog.structs.Map.hasKey_(this.map_, $key$$) && this.map_[$key$$] == $val$$) {
      return!0
    }
  }
  return!1
};
goog.structs.Map.prototype.equals = function $goog$structs$Map$$equals$($otherMap$$, $opt_equalityFn$$) {
  if(this === $otherMap$$) {
    return!0
  }
  if(this.count_ != $otherMap$$.getCount()) {
    return!1
  }
  var $equalityFn$$ = $opt_equalityFn$$ || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var $key$$, $i$$ = 0;$key$$ = this.keys_[$i$$];$i$$++) {
    if(!$equalityFn$$(this.get($key$$), $otherMap$$.get($key$$))) {
      return!1
    }
  }
  return!0
};
goog.structs.Map.defaultEquals = function $goog$structs$Map$defaultEquals$($a$$, $b$$) {
  return $a$$ === $b$$
};
goog.structs.Map.prototype.isEmpty = function $goog$structs$Map$$isEmpty$() {
  return 0 == this.count_
};
goog.structs.Map.prototype.clear = function $goog$structs$Map$$clear$() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function $goog$structs$Map$$remove$($key$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$) ? (delete this.map_[$key$$], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog.structs.Map.prototype.cleanupKeysArray_ = function $goog$structs$Map$$cleanupKeysArray_$() {
  if(this.count_ != this.keys_.length) {
    for(var $srcIndex$$ = 0, $destIndex$$ = 0;$srcIndex$$ < this.keys_.length;) {
      var $key$$ = this.keys_[$srcIndex$$];
      goog.structs.Map.hasKey_(this.map_, $key$$) && (this.keys_[$destIndex$$++] = $key$$);
      $srcIndex$$++
    }
    this.keys_.length = $destIndex$$
  }
  if(this.count_ != this.keys_.length) {
    for(var $seen$$ = {}, $destIndex$$ = $srcIndex$$ = 0;$srcIndex$$ < this.keys_.length;) {
      $key$$ = this.keys_[$srcIndex$$], goog.structs.Map.hasKey_($seen$$, $key$$) || (this.keys_[$destIndex$$++] = $key$$, $seen$$[$key$$] = 1), $srcIndex$$++
    }
    this.keys_.length = $destIndex$$
  }
};
goog.structs.Map.prototype.get = function $goog$structs$Map$$get$($key$$, $opt_val$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$) ? this.map_[$key$$] : $opt_val$$
};
goog.structs.Map.prototype.set = function $goog$structs$Map$$set$($key$$, $value$$) {
  goog.structs.Map.hasKey_(this.map_, $key$$) || (this.count_++, this.keys_.push($key$$), this.version_++);
  this.map_[$key$$] = $value$$
};
goog.structs.Map.prototype.addAll = function $goog$structs$Map$$addAll$($map$$27_values$$) {
  var $keys$$;
  $map$$27_values$$ instanceof goog.structs.Map ? ($keys$$ = $map$$27_values$$.getKeys(), $map$$27_values$$ = $map$$27_values$$.getValues()) : ($keys$$ = goog.object.getKeys($map$$27_values$$), $map$$27_values$$ = goog.object.getValues($map$$27_values$$));
  for(var $i$$ = 0;$i$$ < $keys$$.length;$i$$++) {
    this.set($keys$$[$i$$], $map$$27_values$$[$i$$])
  }
};
goog.structs.Map.prototype.clone = function $goog$structs$Map$$clone$() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function $goog$structs$Map$$transpose$() {
  for(var $transposed$$ = new goog.structs.Map, $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    $transposed$$.set(this.map_[$key$$], $key$$)
  }
  return $transposed$$
};
goog.structs.Map.prototype.toObject = function $goog$structs$Map$$toObject$() {
  this.cleanupKeysArray_();
  for(var $obj$$ = {}, $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    $obj$$[$key$$] = this.map_[$key$$]
  }
  return $obj$$
};
goog.structs.Map.prototype.getKeyIterator = function $goog$structs$Map$$getKeyIterator$() {
  return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function $goog$structs$Map$$getValueIterator$() {
  return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function $goog$structs$Map$$__iterator__$($opt_keys$$) {
  this.cleanupKeysArray_();
  var $i$$ = 0, $keys$$ = this.keys_, $map$$ = this.map_, $version$$ = this.version_, $selfObj$$ = this, $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    for(;;) {
      if($version$$ != $selfObj$$.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if($i$$ >= $keys$$.length) {
        throw goog.iter.StopIteration;
      }
      var $key$$ = $keys$$[$i$$++];
      return $opt_keys$$ ? $key$$ : $map$$[$key$$]
    }
  };
  return $newIter$$
};
goog.structs.Map.hasKey_ = function $goog$structs$Map$hasKey_$($obj$$, $key$$) {
  return Object.prototype.hasOwnProperty.call($obj$$, $key$$)
};
goog.Timer = function $goog$Timer$($opt_interval$$, $opt_timerObject$$) {
  goog.events.EventTarget.call(this);
  this.interval_ = $opt_interval$$ || 1;
  this.timerObject_ = $opt_timerObject$$ || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global.window;
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function $goog$Timer$$getInterval$() {
  return this.interval_
};
goog.Timer.prototype.setInterval = function $goog$Timer$$setInterval$($interval$$) {
  this.interval_ = $interval$$;
  this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog.Timer.prototype.tick_ = function $goog$Timer$$tick_$() {
  if(this.enabled) {
    var $elapsed$$ = goog.now() - this.last_;
    0 < $elapsed$$ && $elapsed$$ < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - $elapsed$$) : (this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()))
  }
};
goog.Timer.prototype.dispatchTick = function $goog$Timer$$dispatchTick$() {
  this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function $goog$Timer$$start$() {
  this.enabled = !0;
  this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now())
};
goog.Timer.prototype.stop = function $goog$Timer$$stop$() {
  this.enabled = !1;
  this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
};
goog.Timer.prototype.disposeInternal = function $goog$Timer$$disposeInternal$() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function $goog$Timer$callOnce$($listener$$, $opt_delay$$, $opt_handler$$) {
  if(goog.isFunction($listener$$)) {
    $opt_handler$$ && ($listener$$ = goog.bind($listener$$, $opt_handler$$))
  }else {
    if($listener$$ && "function" == typeof $listener$$.handleEvent) {
      $listener$$ = goog.bind($listener$$.handleEvent, $listener$$)
    }else {
      throw Error("Invalid listener argument");
    }
  }
  return $opt_delay$$ > goog.Timer.MAX_TIMEOUT_ ? -1 : goog.Timer.defaultTimerObject.setTimeout($listener$$, $opt_delay$$ || 0)
};
goog.Timer.clear = function $goog$Timer$clear$($timerId$$) {
  goog.Timer.defaultTimerObject.clearTimeout($timerId$$)
};
goog.dom.iframe = {};
goog.dom.iframe.BLANK_SOURCE = 'javascript:""';
goog.dom.iframe.STYLES_ = "border:0;vertical-align:bottom;";
goog.dom.iframe.createBlank = function $goog$dom$iframe$createBlank$($domHelper$$, $opt_styles$$) {
  return $domHelper$$.createDom("iframe", {frameborder:0, style:goog.dom.iframe.STYLES_ + ($opt_styles$$ || ""), src:goog.dom.iframe.BLANK_SOURCE})
};
goog.dom.iframe.writeContent = function $goog$dom$iframe$writeContent$($iframe$$, $content$$) {
  var $doc$$ = goog.dom.getFrameContentDocument($iframe$$);
  $doc$$.open();
  $doc$$.write($content$$);
  $doc$$.close()
};
goog.dom.iframe.createWithContent = function $goog$dom$iframe$createWithContent$($parentElement$$, $iframe$$, $opt_bodyContents$$, $opt_styles$$, $opt_quirks$$) {
  var $domHelper$$ = goog.dom.getDomHelper($parentElement$$), $contentBuf$$ = [];
  $opt_quirks$$ || $contentBuf$$.push("<!DOCTYPE html>");
  $contentBuf$$.push("<html><head>", $iframe$$, "</head><body>", $opt_bodyContents$$, "</body></html>");
  $iframe$$ = goog.dom.iframe.createBlank($domHelper$$, $opt_styles$$);
  $parentElement$$.appendChild($iframe$$);
  goog.dom.iframe.writeContent($iframe$$, $contentBuf$$.join(""));
  return $iframe$$
};
goog.events.FocusHandler = function $goog$events$FocusHandler$($element$$) {
  goog.events.EventTarget.call(this);
  this.element_ = $element$$;
  $element$$ = goog.userAgent.IE ? "focusout" : "blur";
  this.listenKeyIn_ = goog.events.listen(this.element_, goog.userAgent.IE ? "focusin" : "focus", this, !goog.userAgent.IE);
  this.listenKeyOut_ = goog.events.listen(this.element_, $element$$, this, !goog.userAgent.IE)
};
goog.inherits(goog.events.FocusHandler, goog.events.EventTarget);
goog.events.FocusHandler.EventType = {FOCUSIN:"focusin", FOCUSOUT:"focusout"};
goog.events.FocusHandler.prototype.handleEvent = function $goog$events$FocusHandler$$handleEvent$($e$$) {
  var $be$$2_event$$ = $e$$.getBrowserEvent(), $be$$2_event$$ = new goog.events.BrowserEvent($be$$2_event$$);
  $be$$2_event$$.type = "focusin" == $e$$.type || "focus" == $e$$.type ? goog.events.FocusHandler.EventType.FOCUSIN : goog.events.FocusHandler.EventType.FOCUSOUT;
  this.dispatchEvent($be$$2_event$$)
};
goog.events.FocusHandler.prototype.disposeInternal = function $goog$events$FocusHandler$$disposeInternal$() {
  goog.events.FocusHandler.superClass_.disposeInternal.call(this);
  goog.events.unlistenByKey(this.listenKeyIn_);
  goog.events.unlistenByKey(this.listenKeyOut_);
  delete this.element_
};
goog.fx.Transition = function $goog$fx$Transition$() {
};
goog.fx.Transition.EventType = {PLAY:"play", BEGIN:"begin", RESUME:"resume", END:"end", STOP:"stop", FINISH:"finish", PAUSE:"pause"};
goog.ui = {};
goog.ui.IdGenerator = function $goog$ui$IdGenerator$() {
};
goog.addSingletonGetter(goog.ui.IdGenerator);
goog.ui.IdGenerator.prototype.nextId_ = 0;
goog.ui.IdGenerator.prototype.getNextUniqueId = function $goog$ui$IdGenerator$$getNextUniqueId$() {
  return":" + (this.nextId_++).toString(36)
};
goog.ui.IdGenerator.instance = goog.ui.IdGenerator.getInstance();
goog.ui.Component = function $goog$ui$Component$($opt_domHelper$$) {
  goog.events.EventTarget.call(this);
  this.dom_ = $opt_domHelper$$ || goog.dom.getDomHelper();
  this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_
};
goog.inherits(goog.ui.Component, goog.events.EventTarget);
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
goog.ui.Component.defaultRightToLeft_ = null;
goog.ui.Component.EventType = {BEFORE_SHOW:"beforeshow", SHOW:"show", HIDE:"hide", DISABLE:"disable", ENABLE:"enable", HIGHLIGHT:"highlight", UNHIGHLIGHT:"unhighlight", ACTIVATE:"activate", DEACTIVATE:"deactivate", SELECT:"select", UNSELECT:"unselect", CHECK:"check", UNCHECK:"uncheck", FOCUS:"focus", BLUR:"blur", OPEN:"open", CLOSE:"close", ENTER:"enter", LEAVE:"leave", ACTION:"action", CHANGE:"change"};
goog.ui.Component.Error = {NOT_SUPPORTED:"Method not supported", DECORATE_INVALID:"Invalid element to decorate", ALREADY_RENDERED:"Component already rendered", PARENT_UNABLE_TO_BE_SET:"Unable to set parent component", CHILD_INDEX_OUT_OF_BOUNDS:"Child component index out of bounds", NOT_OUR_CHILD:"Child is not in parent component", NOT_IN_DOCUMENT:"Operation not supported while component is not in document", STATE_INVALID:"Invalid component state"};
goog.ui.Component.State = {ALL:255, DISABLED:1, HOVER:2, ACTIVE:4, SELECTED:8, CHECKED:16, FOCUSED:32, OPENED:64};
goog.ui.Component.getStateTransitionEvent = function $goog$ui$Component$getStateTransitionEvent$($state$$, $isEntering$$) {
  switch($state$$) {
    case goog.ui.Component.State.DISABLED:
      return $isEntering$$ ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
    case goog.ui.Component.State.HOVER:
      return $isEntering$$ ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
    case goog.ui.Component.State.ACTIVE:
      return $isEntering$$ ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
    case goog.ui.Component.State.SELECTED:
      return $isEntering$$ ? goog.ui.Component.EventType.SELECT : goog.ui.Component.EventType.UNSELECT;
    case goog.ui.Component.State.CHECKED:
      return $isEntering$$ ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
    case goog.ui.Component.State.FOCUSED:
      return $isEntering$$ ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
    case goog.ui.Component.State.OPENED:
      return $isEntering$$ ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE
  }
  throw Error(goog.ui.Component.Error.STATE_INVALID);
};
goog.ui.Component.setDefaultRightToLeft = function $goog$ui$Component$setDefaultRightToLeft$($rightToLeft$$) {
  goog.ui.Component.defaultRightToLeft_ = $rightToLeft$$
};
goog.ui.Component.prototype.id_ = null;
goog.ui.Component.prototype.inDocument_ = !1;
goog.ui.Component.prototype.element_ = null;
goog.ui.Component.prototype.rightToLeft_ = null;
goog.ui.Component.prototype.model_ = null;
goog.ui.Component.prototype.parent_ = null;
goog.ui.Component.prototype.children_ = null;
goog.ui.Component.prototype.childIndex_ = null;
goog.ui.Component.prototype.wasDecorated_ = !1;
goog.ui.Component.prototype.getId = function $goog$ui$Component$$getId$() {
  return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
};
goog.ui.Component.prototype.setId = function $goog$ui$Component$$setId$($id$$) {
  this.parent_ && this.parent_.childIndex_ && (goog.object.remove(this.parent_.childIndex_, this.id_), goog.object.add(this.parent_.childIndex_, $id$$, this));
  this.id_ = $id$$
};
goog.ui.Component.prototype.getElement = function $goog$ui$Component$$getElement$() {
  return this.element_
};
goog.ui.Component.prototype.setElementInternal = function $goog$ui$Component$$setElementInternal$($element$$) {
  this.element_ = $element$$
};
goog.ui.Component.prototype.getElementsByClass = function $goog$ui$Component$$getElementsByClass$($className$$) {
  return this.element_ ? this.dom_.getElementsByClass($className$$, this.element_) : []
};
goog.ui.Component.prototype.getElementByClass = function $goog$ui$Component$$getElementByClass$($className$$) {
  return this.element_ ? this.dom_.getElementByClass($className$$, this.element_) : null
};
goog.ui.Component.prototype.getHandler = function $goog$ui$Component$$getHandler$() {
  return this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this))
};
goog.ui.Component.prototype.setParent = function $goog$ui$Component$$setParent$($parent$$) {
  if(this == $parent$$) {
    throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
  }
  if($parent$$ && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != $parent$$) {
    throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
  }
  this.parent_ = $parent$$;
  goog.ui.Component.superClass_.setParentEventTarget.call(this, $parent$$)
};
goog.ui.Component.prototype.getParent = function $goog$ui$Component$$getParent$() {
  return this.parent_
};
goog.ui.Component.prototype.setParentEventTarget = function $goog$ui$Component$$setParentEventTarget$($parent$$) {
  if(this.parent_ && this.parent_ != $parent$$) {
    throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
  }
  goog.ui.Component.superClass_.setParentEventTarget.call(this, $parent$$)
};
goog.ui.Component.prototype.getDomHelper = function $goog$ui$Component$$getDomHelper$() {
  return this.dom_
};
goog.ui.Component.prototype.isInDocument = function $goog$ui$Component$$isInDocument$() {
  return this.inDocument_
};
goog.ui.Component.prototype.createDom = function $goog$ui$Component$$createDom$() {
  this.element_ = this.dom_.createElement("div")
};
goog.ui.Component.prototype.render = function $goog$ui$Component$$render$($opt_parentElement$$) {
  this.render_($opt_parentElement$$)
};
goog.ui.Component.prototype.renderBefore = function $goog$ui$Component$$renderBefore$($sibling$$) {
  this.render_($sibling$$.parentNode, $sibling$$)
};
goog.ui.Component.prototype.render_ = function $goog$ui$Component$$render_$($opt_parentElement$$, $opt_beforeNode$$) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.element_ || this.createDom();
  $opt_parentElement$$ ? $opt_parentElement$$.insertBefore(this.element_, $opt_beforeNode$$ || null) : this.dom_.getDocument().body.appendChild(this.element_);
  (!this.parent_ || this.parent_.isInDocument()) && this.enterDocument()
};
goog.ui.Component.prototype.decorate = function $goog$ui$Component$$decorate$($element$$) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  if($element$$ && this.canDecorate($element$$)) {
    this.wasDecorated_ = !0;
    if(!this.dom_ || this.dom_.getDocument() != goog.dom.getOwnerDocument($element$$)) {
      this.dom_ = goog.dom.getDomHelper($element$$)
    }
    this.decorateInternal($element$$);
    this.enterDocument()
  }else {
    throw Error(goog.ui.Component.Error.DECORATE_INVALID);
  }
};
goog.ui.Component.prototype.canDecorate = function $goog$ui$Component$$canDecorate$() {
  return!0
};
goog.ui.Component.prototype.wasDecorated = function $goog$ui$Component$$wasDecorated$() {
  return this.wasDecorated_
};
goog.ui.Component.prototype.decorateInternal = function $goog$ui$Component$$decorateInternal$($element$$) {
  this.element_ = $element$$
};
goog.ui.Component.prototype.enterDocument = function $goog$ui$Component$$enterDocument$() {
  this.inDocument_ = !0;
  this.forEachChild(function($child$$) {
    !$child$$.isInDocument() && $child$$.getElement() && $child$$.enterDocument()
  })
};
goog.ui.Component.prototype.exitDocument = function $goog$ui$Component$$exitDocument$() {
  this.forEachChild(function($child$$) {
    $child$$.isInDocument() && $child$$.exitDocument()
  });
  this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
  this.inDocument_ = !1
};
goog.ui.Component.prototype.disposeInternal = function $goog$ui$Component$$disposeInternal$() {
  goog.ui.Component.superClass_.disposeInternal.call(this);
  this.inDocument_ && this.exitDocument();
  this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_);
  this.forEachChild(function($child$$) {
    $child$$.dispose()
  });
  !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
  this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null
};
goog.ui.Component.prototype.makeId = function $goog$ui$Component$$makeId$($idFragment$$) {
  return this.getId() + "." + $idFragment$$
};
goog.ui.Component.prototype.makeIds = function $goog$ui$Component$$makeIds$($object$$) {
  var $ids$$ = {}, $key$$;
  for($key$$ in $object$$) {
    $ids$$[$key$$] = this.makeId($object$$[$key$$])
  }
  return $ids$$
};
goog.ui.Component.prototype.getModel = function $goog$ui$Component$$getModel$() {
  return this.model_
};
goog.ui.Component.prototype.setModel = function $goog$ui$Component$$setModel$($obj$$) {
  this.model_ = $obj$$
};
goog.ui.Component.prototype.getFragmentFromId = function $goog$ui$Component$$getFragmentFromId$($id$$) {
  return $id$$.substring(this.getId().length + 1)
};
goog.ui.Component.prototype.getElementByFragment = function $goog$ui$Component$$getElementByFragment$($idFragment$$) {
  if(!this.inDocument_) {
    throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
  }
  return this.dom_.getElement(this.makeId($idFragment$$))
};
goog.ui.Component.prototype.addChild = function $goog$ui$Component$$addChild$($child$$, $opt_render$$) {
  this.addChildAt($child$$, this.getChildCount(), $opt_render$$)
};
goog.ui.Component.prototype.addChildAt = function $goog$ui$Component$$addChildAt$($child$$, $index$$55_sibling$$, $contentElement_opt_render$$) {
  if($child$$.inDocument_ && ($contentElement_opt_render$$ || !this.inDocument_)) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  if(0 > $index$$55_sibling$$ || $index$$55_sibling$$ > this.getChildCount()) {
    throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
  }
  if(!this.childIndex_ || !this.children_) {
    this.childIndex_ = {}, this.children_ = []
  }
  $child$$.getParent() == this ? (goog.object.set(this.childIndex_, $child$$.getId(), $child$$), goog.array.remove(this.children_, $child$$)) : goog.object.add(this.childIndex_, $child$$.getId(), $child$$);
  $child$$.setParent(this);
  goog.array.insertAt(this.children_, $child$$, $index$$55_sibling$$);
  $child$$.inDocument_ && this.inDocument_ && $child$$.getParent() == this ? ($contentElement_opt_render$$ = this.getContentElement(), $contentElement_opt_render$$.insertBefore($child$$.getElement(), $contentElement_opt_render$$.childNodes[$index$$55_sibling$$] || null)) : $contentElement_opt_render$$ ? (this.element_ || this.createDom(), $index$$55_sibling$$ = this.getChildAt($index$$55_sibling$$ + 1), $child$$.render_(this.getContentElement(), $index$$55_sibling$$ ? $index$$55_sibling$$.element_ : 
  null)) : this.inDocument_ && (!$child$$.inDocument_ && $child$$.element_ && $child$$.element_.parentNode) && $child$$.enterDocument()
};
goog.ui.Component.prototype.getContentElement = function $goog$ui$Component$$getContentElement$() {
  return this.element_
};
goog.ui.Component.prototype.isRightToLeft = function $goog$ui$Component$$isRightToLeft$() {
  null == this.rightToLeft_ && (this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body));
  return this.rightToLeft_
};
goog.ui.Component.prototype.setRightToLeft = function $goog$ui$Component$$setRightToLeft$($rightToLeft$$) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.rightToLeft_ = $rightToLeft$$
};
goog.ui.Component.prototype.hasChildren = function $goog$ui$Component$$hasChildren$() {
  return!!this.children_ && 0 != this.children_.length
};
goog.ui.Component.prototype.getChildCount = function $goog$ui$Component$$getChildCount$() {
  return this.children_ ? this.children_.length : 0
};
goog.ui.Component.prototype.getChildIds = function $goog$ui$Component$$getChildIds$() {
  var $ids$$ = [];
  this.forEachChild(function($child$$) {
    $ids$$.push($child$$.getId())
  });
  return $ids$$
};
goog.ui.Component.prototype.getChild = function $goog$ui$Component$$getChild$($id$$) {
  return this.childIndex_ && $id$$ ? goog.object.get(this.childIndex_, $id$$) || null : null
};
goog.ui.Component.prototype.getChildAt = function $goog$ui$Component$$getChildAt$($index$$) {
  return this.children_ ? this.children_[$index$$] || null : null
};
goog.ui.Component.prototype.forEachChild = function $goog$ui$Component$$forEachChild$($f$$, $opt_obj$$) {
  this.children_ && goog.array.forEach(this.children_, $f$$, $opt_obj$$)
};
goog.ui.Component.prototype.indexOfChild = function $goog$ui$Component$$indexOfChild$($child$$) {
  return this.children_ && $child$$ ? goog.array.indexOf(this.children_, $child$$) : -1
};
goog.ui.Component.prototype.removeChild = function $goog$ui$Component$$removeChild$($child$$, $opt_unrender$$) {
  if($child$$) {
    var $id$$ = goog.isString($child$$) ? $child$$ : $child$$.getId(), $child$$ = this.getChild($id$$);
    $id$$ && $child$$ && (goog.object.remove(this.childIndex_, $id$$), goog.array.remove(this.children_, $child$$), $opt_unrender$$ && ($child$$.exitDocument(), $child$$.element_ && goog.dom.removeNode($child$$.element_)), $child$$.setParent(null))
  }
  if(!$child$$) {
    throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
  }
  return $child$$
};
goog.ui.Component.prototype.removeChildAt = function $goog$ui$Component$$removeChildAt$($index$$, $opt_unrender$$) {
  return this.removeChild(this.getChildAt($index$$), $opt_unrender$$)
};
goog.ui.Component.prototype.removeChildren = function $goog$ui$Component$$removeChildren$($opt_unrender$$) {
  for(var $removedChildren$$ = [];this.hasChildren();) {
    $removedChildren$$.push(this.removeChildAt(0, $opt_unrender$$))
  }
  return $removedChildren$$
};
goog.ui.PopupBase = function $goog$ui$PopupBase$($opt_element$$, $opt_type$$) {
  goog.events.EventTarget.call(this);
  this.handler_ = new goog.events.EventHandler(this);
  this.setElement($opt_element$$ || null);
  $opt_type$$ && this.setType($opt_type$$)
};
goog.inherits(goog.ui.PopupBase, goog.events.EventTarget);
goog.ui.PopupBase.Type = {TOGGLE_DISPLAY:"toggle_display", MOVE_OFFSCREEN:"move_offscreen"};
goog.ui.PopupBase.prototype.element_ = null;
goog.ui.PopupBase.prototype.autoHide_ = !0;
goog.ui.PopupBase.prototype.autoHideRegion_ = null;
goog.ui.PopupBase.prototype.isVisible_ = !1;
goog.ui.PopupBase.prototype.shouldHideAsync_ = !1;
goog.ui.PopupBase.prototype.lastShowTime_ = -1;
goog.ui.PopupBase.prototype.lastHideTime_ = -1;
goog.ui.PopupBase.prototype.hideOnEscape_ = !1;
goog.ui.PopupBase.prototype.enableCrossIframeDismissal_ = !0;
goog.ui.PopupBase.prototype.type_ = goog.ui.PopupBase.Type.TOGGLE_DISPLAY;
goog.ui.PopupBase.EventType = {BEFORE_SHOW:"beforeshow", SHOW:"show", BEFORE_HIDE:"beforehide", HIDE:"hide"};
goog.ui.PopupBase.DEBOUNCE_DELAY_MS = 150;
goog.ui.PopupBase.prototype.getType = function $goog$ui$PopupBase$$getType$() {
  return this.type_
};
goog.ui.PopupBase.prototype.setType = function $goog$ui$PopupBase$$setType$($type$$) {
  this.type_ = $type$$
};
goog.ui.PopupBase.prototype.shouldHideAsync = function $goog$ui$PopupBase$$shouldHideAsync$() {
  return this.shouldHideAsync_
};
goog.ui.PopupBase.prototype.setShouldHideAsync = function $goog$ui$PopupBase$$setShouldHideAsync$($b$$) {
  this.shouldHideAsync_ = $b$$
};
goog.ui.PopupBase.prototype.getElement = function $goog$ui$PopupBase$$getElement$() {
  return this.element_
};
goog.ui.PopupBase.prototype.setElement = function $goog$ui$PopupBase$$setElement$($elt$$) {
  this.ensureNotVisible_();
  this.element_ = $elt$$
};
goog.ui.PopupBase.prototype.getAutoHide = function $goog$ui$PopupBase$$getAutoHide$() {
  return this.autoHide_
};
goog.ui.PopupBase.prototype.setAutoHide = function $goog$ui$PopupBase$$setAutoHide$($autoHide$$) {
  this.ensureNotVisible_();
  this.autoHide_ = $autoHide$$
};
goog.ui.PopupBase.prototype.getHideOnEscape = function $goog$ui$PopupBase$$getHideOnEscape$() {
  return this.hideOnEscape_
};
goog.ui.PopupBase.prototype.setHideOnEscape = function $goog$ui$PopupBase$$setHideOnEscape$($hideOnEscape$$) {
  this.ensureNotVisible_();
  this.hideOnEscape_ = $hideOnEscape$$
};
goog.ui.PopupBase.prototype.getEnableCrossIframeDismissal = function $goog$ui$PopupBase$$getEnableCrossIframeDismissal$() {
  return this.enableCrossIframeDismissal_
};
goog.ui.PopupBase.prototype.setEnableCrossIframeDismissal = function $goog$ui$PopupBase$$setEnableCrossIframeDismissal$($enable$$) {
  this.enableCrossIframeDismissal_ = $enable$$
};
goog.ui.PopupBase.prototype.getAutoHideRegion = function $goog$ui$PopupBase$$getAutoHideRegion$() {
  return this.autoHideRegion_
};
goog.ui.PopupBase.prototype.setAutoHideRegion = function $goog$ui$PopupBase$$setAutoHideRegion$($element$$) {
  this.autoHideRegion_ = $element$$
};
goog.ui.PopupBase.prototype.setTransition = function $goog$ui$PopupBase$$setTransition$($opt_showTransition$$, $opt_hideTransition$$) {
  this.showTransition_ = $opt_showTransition$$;
  this.hideTransition_ = $opt_hideTransition$$
};
goog.ui.PopupBase.prototype.getLastShowTime = function $goog$ui$PopupBase$$getLastShowTime$() {
  return this.lastShowTime_
};
goog.ui.PopupBase.prototype.getLastHideTime = function $goog$ui$PopupBase$$getLastHideTime$() {
  return this.lastHideTime_
};
goog.ui.PopupBase.prototype.ensureNotVisible_ = function $goog$ui$PopupBase$$ensureNotVisible_$() {
  if(this.isVisible_) {
    throw Error("Can not change this state of the popup while showing.");
  }
};
goog.ui.PopupBase.prototype.isVisible = function $goog$ui$PopupBase$$isVisible$() {
  return this.isVisible_
};
goog.ui.PopupBase.prototype.isOrWasRecentlyVisible = function $goog$ui$PopupBase$$isOrWasRecentlyVisible$() {
  return this.isVisible_ || goog.now() - this.lastHideTime_ < goog.ui.PopupBase.DEBOUNCE_DELAY_MS
};
goog.ui.PopupBase.prototype.setVisible = function $goog$ui$PopupBase$$setVisible$($visible$$) {
  this.showTransition_ && this.showTransition_.stop();
  this.hideTransition_ && this.hideTransition_.stop();
  $visible$$ ? this.show_() : this.hide_()
};
goog.ui.PopupBase.prototype.reposition = goog.nullFunction;
goog.ui.PopupBase.prototype.show_ = function $goog$ui$PopupBase$$show_$() {
  if(!this.isVisible_ && this.onBeforeShow()) {
    if(!this.element_) {
      throw Error("Caller must call setElement before trying to show the popup");
    }
    this.reposition();
    var $doc$$ = goog.dom.getOwnerDocument(this.element_);
    this.hideOnEscape_ && this.handler_.listen($doc$$, goog.events.EventType.KEYDOWN, this.onDocumentKeyDown_, !0);
    if(this.autoHide_) {
      if(this.handler_.listen($doc$$, goog.events.EventType.MOUSEDOWN, this.onDocumentMouseDown_, !0), goog.userAgent.IE) {
        var $activeElement$$;
        try {
          $activeElement$$ = $doc$$.activeElement
        }catch($e$$) {
        }
        for(;$activeElement$$ && "IFRAME" == $activeElement$$.nodeName;) {
          try {
            var $tempDoc$$ = goog.dom.getFrameContentDocument($activeElement$$)
          }catch($e$$0$$) {
            break
          }
          $doc$$ = $tempDoc$$;
          $activeElement$$ = $doc$$.activeElement
        }
        this.handler_.listen($doc$$, goog.events.EventType.MOUSEDOWN, this.onDocumentMouseDown_, !0);
        this.handler_.listen($doc$$, goog.events.EventType.DEACTIVATE, this.onDocumentBlur_)
      }else {
        this.handler_.listen($doc$$, goog.events.EventType.BLUR, this.onDocumentBlur_)
      }
    }
    this.type_ == goog.ui.PopupBase.Type.TOGGLE_DISPLAY ? this.showPopupElement() : this.type_ == goog.ui.PopupBase.Type.MOVE_OFFSCREEN && this.reposition();
    this.isVisible_ = !0;
    if(this.showTransition_) {
      goog.events.listenOnce(this.showTransition_, goog.fx.Transition.EventType.END, this.onShow_, !1, this), this.showTransition_.play()
    }else {
      this.onShow_()
    }
  }
};
goog.ui.PopupBase.prototype.hide_ = function $goog$ui$PopupBase$$hide_$($opt_target$$) {
  if(!this.isVisible_ || !this.onBeforeHide_($opt_target$$)) {
    return!1
  }
  this.handler_ && this.handler_.removeAll();
  this.isVisible_ = !1;
  this.lastHideTime_ = goog.now();
  this.hideTransition_ ? (goog.events.listenOnce(this.hideTransition_, goog.fx.Transition.EventType.END, goog.partial(this.continueHidingPopup_, $opt_target$$), !1, this), this.hideTransition_.play()) : this.continueHidingPopup_($opt_target$$);
  return!0
};
goog.ui.PopupBase.prototype.continueHidingPopup_ = function $goog$ui$PopupBase$$continueHidingPopup_$($opt_target$$) {
  this.type_ == goog.ui.PopupBase.Type.TOGGLE_DISPLAY ? this.shouldHideAsync_ ? goog.Timer.callOnce(this.hidePopupElement_, 0, this) : this.hidePopupElement_() : this.type_ == goog.ui.PopupBase.Type.MOVE_OFFSCREEN && this.moveOffscreen_();
  this.onHide_($opt_target$$)
};
goog.ui.PopupBase.prototype.showPopupElement = function $goog$ui$PopupBase$$showPopupElement$() {
  this.element_.style.visibility = "visible";
  goog.style.showElement(this.element_, !0)
};
goog.ui.PopupBase.prototype.hidePopupElement_ = function $goog$ui$PopupBase$$hidePopupElement_$() {
  this.element_.style.visibility = "hidden";
  goog.style.showElement(this.element_, !1)
};
goog.ui.PopupBase.prototype.moveOffscreen_ = function $goog$ui$PopupBase$$moveOffscreen_$() {
  this.element_.style.top = "-10000px"
};
goog.ui.PopupBase.prototype.onBeforeShow = function $goog$ui$PopupBase$$onBeforeShow$() {
  return this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_SHOW)
};
goog.ui.PopupBase.prototype.onShow_ = function $goog$ui$PopupBase$$onShow_$() {
  this.lastShowTime_ = goog.now();
  this.lastHideTime_ = -1;
  this.dispatchEvent(goog.ui.PopupBase.EventType.SHOW)
};
goog.ui.PopupBase.prototype.onBeforeHide_ = function $goog$ui$PopupBase$$onBeforeHide_$($opt_target$$) {
  return this.dispatchEvent({type:goog.ui.PopupBase.EventType.BEFORE_HIDE, target:$opt_target$$})
};
goog.ui.PopupBase.prototype.onHide_ = function $goog$ui$PopupBase$$onHide_$($opt_target$$) {
  this.dispatchEvent({type:goog.ui.PopupBase.EventType.HIDE, target:$opt_target$$})
};
goog.ui.PopupBase.prototype.onDocumentMouseDown_ = function $goog$ui$PopupBase$$onDocumentMouseDown_$($e$$36_target$$) {
  $e$$36_target$$ = $e$$36_target$$.target;
  !goog.dom.contains(this.element_, $e$$36_target$$) && ((!this.autoHideRegion_ || goog.dom.contains(this.autoHideRegion_, $e$$36_target$$)) && !this.shouldDebounce_()) && this.hide_($e$$36_target$$)
};
goog.ui.PopupBase.prototype.onDocumentKeyDown_ = function $goog$ui$PopupBase$$onDocumentKeyDown_$($e$$) {
  $e$$.keyCode == goog.events.KeyCodes.ESC && this.hide_($e$$.target) && ($e$$.preventDefault(), $e$$.stopPropagation())
};
goog.ui.PopupBase.prototype.onDocumentBlur_ = function $goog$ui$PopupBase$$onDocumentBlur_$($activeElement$$2_e$$) {
  if(this.enableCrossIframeDismissal_) {
    var $doc$$ = goog.dom.getOwnerDocument(this.element_);
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      if($activeElement$$2_e$$ = $doc$$.activeElement, !$activeElement$$2_e$$ || goog.dom.contains(this.element_, $activeElement$$2_e$$) || "BODY" == $activeElement$$2_e$$.tagName) {
        return
      }
    }else {
      if($activeElement$$2_e$$.target != $doc$$) {
        return
      }
    }
    this.shouldDebounce_() || this.hide_()
  }
};
goog.ui.PopupBase.prototype.shouldDebounce_ = function $goog$ui$PopupBase$$shouldDebounce_$() {
  return goog.now() - this.lastShowTime_ < goog.ui.PopupBase.DEBOUNCE_DELAY_MS
};
goog.ui.PopupBase.prototype.disposeInternal = function $goog$ui$PopupBase$$disposeInternal$() {
  goog.ui.PopupBase.superClass_.disposeInternal.call(this);
  this.handler_.dispose();
  goog.dispose(this.showTransition_);
  goog.dispose(this.hideTransition_);
  delete this.element_;
  delete this.handler_
};
goog.ui.ModalPopup = function $goog$ui$ModalPopup$($opt_useIframeMask$$, $opt_domHelper$$) {
  goog.ui.Component.call(this, $opt_domHelper$$);
  this.useIframeMask_ = !!$opt_useIframeMask$$
};
goog.inherits(goog.ui.ModalPopup, goog.ui.Component);
goog.ui.ModalPopup.prototype.focusHandler_ = null;
goog.ui.ModalPopup.prototype.visible_ = !1;
goog.ui.ModalPopup.prototype.bgEl_ = null;
goog.ui.ModalPopup.prototype.bgIframeEl_ = null;
goog.ui.ModalPopup.prototype.tabCatcherElement_ = null;
goog.ui.ModalPopup.prototype.getCssClass = function $goog$ui$ModalPopup$$getCssClass$() {
  return"goog-modalpopup"
};
goog.ui.ModalPopup.prototype.getBackgroundIframe = function $goog$ui$ModalPopup$$getBackgroundIframe$() {
  return this.bgIframeEl_
};
goog.ui.ModalPopup.prototype.getBackgroundElement = function $goog$ui$ModalPopup$$getBackgroundElement$() {
  return this.bgEl_
};
goog.ui.ModalPopup.prototype.createDom = function $goog$ui$ModalPopup$$createDom$() {
  goog.ui.ModalPopup.superClass_.createDom.call(this);
  var $element$$ = this.getElement();
  goog.dom.classes.add($element$$, this.getCssClass());
  goog.dom.setFocusableTabIndex($element$$, !0);
  goog.style.showElement($element$$, !1);
  this.manageBackgroundDom_();
  this.createTabCatcher_()
};
goog.ui.ModalPopup.prototype.manageBackgroundDom_ = function $goog$ui$ModalPopup$$manageBackgroundDom_$() {
  this.useIframeMask_ && !this.bgIframeEl_ && (this.bgIframeEl_ = goog.dom.iframe.createBlank(this.getDomHelper()), this.bgIframeEl_.className = this.getCssClass() + "-bg", goog.style.showElement(this.bgIframeEl_, !1), goog.style.setOpacity(this.bgIframeEl_, 0));
  this.bgEl_ || (this.bgEl_ = this.getDomHelper().createDom("div", this.getCssClass() + "-bg"), goog.style.showElement(this.bgEl_, !1))
};
goog.ui.ModalPopup.prototype.createTabCatcher_ = function $goog$ui$ModalPopup$$createTabCatcher_$() {
  this.tabCatcherElement_ || (this.tabCatcherElement_ = this.getDomHelper().createElement("span"), goog.style.showElement(this.tabCatcherElement_, !1), goog.dom.setFocusableTabIndex(this.tabCatcherElement_, !0), this.tabCatcherElement_.style.position = "absolute")
};
goog.ui.ModalPopup.prototype.renderBackground_ = function $goog$ui$ModalPopup$$renderBackground_$() {
  goog.asserts.assert(!!this.bgEl_, "Background element must not be null.");
  this.bgIframeEl_ && goog.dom.insertSiblingBefore(this.bgIframeEl_, this.getElement());
  goog.dom.insertSiblingBefore(this.bgEl_, this.getElement())
};
goog.ui.ModalPopup.prototype.canDecorate = function $goog$ui$ModalPopup$$canDecorate$($element$$) {
  return!!$element$$ && $element$$.tagName == goog.dom.TagName.DIV
};
goog.ui.ModalPopup.prototype.decorateInternal = function $goog$ui$ModalPopup$$decorateInternal$($element$$) {
  goog.ui.ModalPopup.superClass_.decorateInternal.call(this, $element$$);
  goog.dom.classes.add(this.getElement(), this.getCssClass());
  this.manageBackgroundDom_();
  this.createTabCatcher_();
  goog.style.showElement(this.getElement(), !1)
};
goog.ui.ModalPopup.prototype.enterDocument = function $goog$ui$ModalPopup$$enterDocument$() {
  this.renderBackground_();
  goog.ui.ModalPopup.superClass_.enterDocument.call(this);
  goog.dom.insertSiblingAfter(this.tabCatcherElement_, this.getElement());
  this.focusHandler_ = new goog.events.FocusHandler(this.getDomHelper().getDocument());
  this.getHandler().listen(this.focusHandler_, goog.events.FocusHandler.EventType.FOCUSIN, this.onFocus_)
};
goog.ui.ModalPopup.prototype.exitDocument = function $goog$ui$ModalPopup$$exitDocument$() {
  this.isVisible() && this.setVisible(!1);
  goog.dispose(this.focusHandler_);
  goog.ui.ModalPopup.superClass_.exitDocument.call(this);
  goog.dom.removeNode(this.bgIframeEl_);
  goog.dom.removeNode(this.bgEl_);
  goog.dom.removeNode(this.tabCatcherElement_)
};
goog.ui.ModalPopup.prototype.setVisible = function $goog$ui$ModalPopup$$setVisible$($visible$$) {
  goog.asserts.assert(this.isInDocument(), "ModalPopup must be rendered first.");
  $visible$$ != this.visible_ && (this.popupShowTransition_ && this.popupShowTransition_.stop(), this.bgShowTransition_ && this.bgShowTransition_.stop(), this.popupHideTransition_ && this.popupHideTransition_.stop(), this.bgHideTransition_ && this.bgHideTransition_.stop(), $visible$$ ? this.show_() : this.hide_())
};
goog.ui.ModalPopup.prototype.setTransition = function $goog$ui$ModalPopup$$setTransition$($popupShowTransition$$, $popupHideTransition$$, $bgShowTransition$$, $bgHideTransition$$) {
  this.popupShowTransition_ = $popupShowTransition$$;
  this.popupHideTransition_ = $popupHideTransition$$;
  this.bgShowTransition_ = $bgShowTransition$$;
  this.bgHideTransition_ = $bgHideTransition$$
};
goog.ui.ModalPopup.prototype.show_ = function $goog$ui$ModalPopup$$show_$() {
  if(this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_SHOW)) {
    if(this.resizeBackground_(), this.reposition(), this.getHandler().listen(this.getDomHelper().getWindow(), goog.events.EventType.RESIZE, this.resizeBackground_), this.showPopupElement_(!0), this.focus(), this.visible_ = !0, this.popupShowTransition_ && this.bgShowTransition_) {
      goog.events.listenOnce(this.popupShowTransition_, goog.fx.Transition.EventType.END, this.onShow, !1, this), this.bgShowTransition_.play(), this.popupShowTransition_.play()
    }else {
      this.onShow()
    }
  }
};
goog.ui.ModalPopup.prototype.hide_ = function $goog$ui$ModalPopup$$hide_$() {
  if(this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_HIDE)) {
    if(this.getHandler().unlisten(this.getDomHelper().getWindow(), goog.events.EventType.RESIZE, this.resizeBackground_), this.visible_ = !1, this.popupHideTransition_ && this.bgHideTransition_) {
      goog.events.listenOnce(this.popupHideTransition_, goog.fx.Transition.EventType.END, this.onHide, !1, this), this.bgHideTransition_.play(), this.popupHideTransition_.play()
    }else {
      this.onHide()
    }
  }
};
goog.ui.ModalPopup.prototype.showPopupElement_ = function $goog$ui$ModalPopup$$showPopupElement_$($visible$$) {
  this.bgIframeEl_ && goog.style.showElement(this.bgIframeEl_, $visible$$);
  this.bgEl_ && goog.style.showElement(this.bgEl_, $visible$$);
  goog.style.showElement(this.getElement(), $visible$$);
  goog.style.showElement(this.tabCatcherElement_, $visible$$)
};
goog.ui.ModalPopup.prototype.onShow = function $goog$ui$ModalPopup$$onShow$() {
  this.dispatchEvent(goog.ui.PopupBase.EventType.SHOW)
};
goog.ui.ModalPopup.prototype.onHide = function $goog$ui$ModalPopup$$onHide$() {
  this.showPopupElement_(!1);
  this.dispatchEvent(goog.ui.PopupBase.EventType.HIDE)
};
goog.ui.ModalPopup.prototype.isVisible = function $goog$ui$ModalPopup$$isVisible$() {
  return this.visible_
};
goog.ui.ModalPopup.prototype.focus = function $goog$ui$ModalPopup$$focus$() {
  this.focusElement_()
};
goog.ui.ModalPopup.prototype.resizeBackground_ = function $goog$ui$ModalPopup$$resizeBackground_$() {
  this.bgIframeEl_ && goog.style.showElement(this.bgIframeEl_, !1);
  this.bgEl_ && goog.style.showElement(this.bgEl_, !1);
  var $doc$$37_h$$ = this.getDomHelper().getDocument(), $w$$7_win$$ = goog.dom.getWindow($doc$$37_h$$) || window, $viewSize$$ = goog.dom.getViewportSize($w$$7_win$$), $w$$7_win$$ = Math.max($viewSize$$.width, Math.max($doc$$37_h$$.body.scrollWidth, $doc$$37_h$$.documentElement.scrollWidth)), $doc$$37_h$$ = Math.max($viewSize$$.height, Math.max($doc$$37_h$$.body.scrollHeight, $doc$$37_h$$.documentElement.scrollHeight));
  this.bgIframeEl_ && (goog.style.showElement(this.bgIframeEl_, !0), goog.style.setSize(this.bgIframeEl_, $w$$7_win$$, $doc$$37_h$$));
  this.bgEl_ && (goog.style.showElement(this.bgEl_, !0), goog.style.setSize(this.bgEl_, $w$$7_win$$, $doc$$37_h$$))
};
goog.ui.ModalPopup.prototype.reposition = function $goog$ui$ModalPopup$$reposition$() {
  var $doc$$38_left$$11_x$$ = this.getDomHelper().getDocument(), $viewSize$$1_win$$ = goog.dom.getWindow($doc$$38_left$$11_x$$) || window;
  if("fixed" == goog.style.getComputedPosition(this.getElement())) {
    var $scroll_top$$9_y$$ = $doc$$38_left$$11_x$$ = 0
  }else {
    $scroll_top$$9_y$$ = this.getDomHelper().getDocumentScroll(), $doc$$38_left$$11_x$$ = $scroll_top$$9_y$$.x, $scroll_top$$9_y$$ = $scroll_top$$9_y$$.y
  }
  var $popupSize$$ = goog.style.getSize(this.getElement()), $viewSize$$1_win$$ = goog.dom.getViewportSize($viewSize$$1_win$$), $doc$$38_left$$11_x$$ = Math.max($doc$$38_left$$11_x$$ + $viewSize$$1_win$$.width / 2 - $popupSize$$.width / 2, 0), $scroll_top$$9_y$$ = Math.max($scroll_top$$9_y$$ + $viewSize$$1_win$$.height / 2 - $popupSize$$.height / 2, 0);
  goog.style.setPosition(this.getElement(), $doc$$38_left$$11_x$$, $scroll_top$$9_y$$);
  goog.style.setPosition(this.tabCatcherElement_, $doc$$38_left$$11_x$$, $scroll_top$$9_y$$)
};
goog.ui.ModalPopup.prototype.onFocus_ = function $goog$ui$ModalPopup$$onFocus_$($e$$) {
  $e$$.target == this.tabCatcherElement_ && goog.Timer.callOnce(this.focusElement_, 0, this)
};
goog.ui.ModalPopup.prototype.focusElement_ = function $goog$ui$ModalPopup$$focusElement_$() {
  try {
    goog.userAgent.IE && this.getDomHelper().getDocument().body.focus(), this.getElement().focus()
  }catch($e$$) {
  }
};
goog.ui.ModalPopup.prototype.disposeInternal = function $goog$ui$ModalPopup$$disposeInternal$() {
  goog.dispose(this.popupShowTransition_);
  this.popupShowTransition_ = null;
  goog.dispose(this.popupHideTransition_);
  this.popupHideTransition_ = null;
  goog.dispose(this.bgShowTransition_);
  this.bgShowTransition_ = null;
  goog.dispose(this.bgHideTransition_);
  this.bgHideTransition_ = null;
  goog.ui.ModalPopup.superClass_.disposeInternal.call(this)
};
goog.ui.Dialog = function $goog$ui$Dialog$($opt_class$$, $opt_useIframeMask$$, $opt_domHelper$$) {
  goog.ui.ModalPopup.call(this, $opt_useIframeMask$$, $opt_domHelper$$);
  this.class_ = $opt_class$$ || "modal-dialog";
  this.buttons_ = goog.ui.Dialog.ButtonSet.createOkCancel()
};
goog.inherits(goog.ui.Dialog, goog.ui.ModalPopup);
goog.ui.Dialog.prototype.escapeToCancel_ = !0;
goog.ui.Dialog.prototype.hasTitleCloseButton_ = !0;
goog.ui.Dialog.prototype.modal_ = !0;
goog.ui.Dialog.prototype.draggable_ = !0;
goog.ui.Dialog.prototype.backgroundElementOpacity_ = 0.5;
goog.ui.Dialog.prototype.title_ = "";
goog.ui.Dialog.prototype.content_ = "";
goog.ui.Dialog.prototype.dragger_ = null;
goog.ui.Dialog.prototype.disposeOnHide_ = !1;
goog.ui.Dialog.prototype.titleEl_ = null;
goog.ui.Dialog.prototype.titleTextEl_ = null;
goog.ui.Dialog.prototype.titleId_ = null;
goog.ui.Dialog.prototype.titleCloseEl_ = null;
goog.ui.Dialog.prototype.contentEl_ = null;
goog.ui.Dialog.prototype.buttonEl_ = null;
goog.ui.Dialog.prototype.preferredAriaRole_ = goog.dom.a11y.Role.DIALOG;
goog.ui.Dialog.prototype.getCssClass = function $goog$ui$Dialog$$getCssClass$() {
  return this.class_
};
goog.ui.Dialog.prototype.setTitle = function $goog$ui$Dialog$$setTitle$($title$$) {
  this.title_ = $title$$;
  this.titleTextEl_ && goog.dom.setTextContent(this.titleTextEl_, $title$$)
};
goog.ui.Dialog.prototype.getTitle = function $goog$ui$Dialog$$getTitle$() {
  return this.title_
};
goog.ui.Dialog.prototype.setContent = function $goog$ui$Dialog$$setContent$($html$$) {
  this.content_ = $html$$;
  this.contentEl_ && (this.contentEl_.innerHTML = $html$$)
};
goog.ui.Dialog.prototype.getContent = function $goog$ui$Dialog$$getContent$() {
  return this.content_
};
goog.ui.Dialog.prototype.getPreferredAriaRole = function $goog$ui$Dialog$$getPreferredAriaRole$() {
  return this.preferredAriaRole_
};
goog.ui.Dialog.prototype.setPreferredAriaRole = function $goog$ui$Dialog$$setPreferredAriaRole$($role$$) {
  this.preferredAriaRole_ = $role$$
};
goog.ui.Dialog.prototype.renderIfNoDom_ = function $goog$ui$Dialog$$renderIfNoDom_$() {
  this.getElement() || this.render()
};
goog.ui.Dialog.prototype.getContentElement = function $goog$ui$Dialog$$getContentElement$() {
  this.renderIfNoDom_();
  return this.contentEl_
};
goog.ui.Dialog.prototype.getTitleElement = function $goog$ui$Dialog$$getTitleElement$() {
  this.renderIfNoDom_();
  return this.titleEl_
};
goog.ui.Dialog.prototype.getTitleTextElement = function $goog$ui$Dialog$$getTitleTextElement$() {
  this.renderIfNoDom_();
  return this.titleTextEl_
};
goog.ui.Dialog.prototype.getTitleCloseElement = function $goog$ui$Dialog$$getTitleCloseElement$() {
  this.renderIfNoDom_();
  return this.titleCloseEl_
};
goog.ui.Dialog.prototype.getButtonElement = function $goog$ui$Dialog$$getButtonElement$() {
  this.renderIfNoDom_();
  return this.buttonEl_
};
goog.ui.Dialog.prototype.getDialogElement = function $goog$ui$Dialog$$getDialogElement$() {
  this.renderIfNoDom_();
  return this.getElement()
};
goog.ui.Dialog.prototype.getBackgroundElement = function $goog$ui$Dialog$$getBackgroundElement$() {
  this.renderIfNoDom_();
  return goog.ui.Dialog.superClass_.getBackgroundElement.call(this)
};
goog.ui.Dialog.prototype.getBackgroundElementOpacity = function $goog$ui$Dialog$$getBackgroundElementOpacity$() {
  return this.backgroundElementOpacity_
};
goog.ui.Dialog.prototype.setBackgroundElementOpacity = function $goog$ui$Dialog$$setBackgroundElementOpacity$($bgEl_opacity$$) {
  this.backgroundElementOpacity_ = $bgEl_opacity$$;
  this.getElement() && ($bgEl_opacity$$ = this.getBackgroundElement()) && goog.style.setOpacity($bgEl_opacity$$, this.backgroundElementOpacity_)
};
goog.ui.Dialog.prototype.setModal = function $goog$ui$Dialog$$setModal$($modal$$) {
  $modal$$ != this.modal_ && this.setModalInternal_($modal$$)
};
goog.ui.Dialog.prototype.setModalInternal_ = function $goog$ui$Dialog$$setModalInternal_$($modal$$) {
  this.modal_ = $modal$$;
  if(this.isInDocument()) {
    var $dom$$ = this.getDomHelper(), $bg$$ = this.getBackgroundElement(), $bgIframe$$ = this.getBackgroundIframe();
    $modal$$ ? ($bgIframe$$ && $dom$$.insertSiblingBefore($bgIframe$$, this.getElement()), $dom$$.insertSiblingBefore($bg$$, this.getElement())) : ($dom$$.removeNode($bgIframe$$), $dom$$.removeNode($bg$$))
  }
};
goog.ui.Dialog.prototype.getModal = function $goog$ui$Dialog$$getModal$() {
  return this.modal_
};
goog.ui.Dialog.prototype.getClass = function $goog$ui$Dialog$$getClass$() {
  return this.getCssClass()
};
goog.ui.Dialog.prototype.setDraggable = function $goog$ui$Dialog$$setDraggable$($draggable$$) {
  this.draggable_ = $draggable$$;
  this.setDraggingEnabled_($draggable$$ && this.isInDocument())
};
goog.ui.Dialog.prototype.createDragger = function $goog$ui$Dialog$$createDragger$() {
  return new goog.fx.Dragger(this.getElement(), this.titleEl_)
};
goog.ui.Dialog.prototype.getDraggable = function $goog$ui$Dialog$$getDraggable$() {
  return this.draggable_
};
goog.ui.Dialog.prototype.setDraggingEnabled_ = function $goog$ui$Dialog$$setDraggingEnabled_$($enabled$$) {
  this.getElement() && goog.dom.classes.enable(this.titleEl_, this.class_ + "-title-draggable", $enabled$$);
  $enabled$$ && !this.dragger_ ? (this.dragger_ = this.createDragger(), goog.dom.classes.add(this.titleEl_, this.class_ + "-title-draggable"), goog.events.listen(this.dragger_, goog.fx.Dragger.EventType.START, this.setDraggerLimits_, !1, this)) : !$enabled$$ && this.dragger_ && (this.dragger_.dispose(), this.dragger_ = null)
};
goog.ui.Dialog.prototype.createDom = function $goog$ui$Dialog$$createDom$() {
  goog.ui.Dialog.superClass_.createDom.call(this);
  var $element$$ = this.getElement();
  goog.asserts.assert($element$$, "getElement() returns null");
  var $dom$$ = this.getDomHelper();
  this.titleEl_ = $dom$$.createDom("div", {className:this.class_ + "-title", id:this.getId()}, this.titleTextEl_ = $dom$$.createDom("span", this.class_ + "-title-text", this.title_), this.titleCloseEl_ = $dom$$.createDom("span", this.class_ + "-title-close"));
  goog.dom.append($element$$, this.titleEl_, this.contentEl_ = $dom$$.createDom("div", this.class_ + "-content"), this.buttonEl_ = $dom$$.createDom("div", this.class_ + "-buttons"));
  this.titleId_ = this.titleEl_.id;
  goog.dom.a11y.setRole($element$$, this.getPreferredAriaRole());
  goog.dom.a11y.setState($element$$, "labelledby", this.titleId_ || "");
  this.content_ && (this.contentEl_.innerHTML = this.content_);
  goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_);
  this.buttons_ && this.buttons_.attachToElement(this.buttonEl_);
  goog.style.showElement(this.buttonEl_, !!this.buttons_);
  this.setBackgroundElementOpacity(this.backgroundElementOpacity_)
};
goog.ui.Dialog.prototype.decorateInternal = function $goog$ui$Dialog$$decorateInternal$($buttonsClass_contentClass_element$$) {
  goog.ui.Dialog.superClass_.decorateInternal.call(this, $buttonsClass_contentClass_element$$);
  $buttonsClass_contentClass_element$$ = this.class_ + "-content";
  (this.contentEl_ = goog.dom.getElementsByTagNameAndClass(null, $buttonsClass_contentClass_element$$, this.getElement())[0]) ? this.content_ = this.contentEl_.innerHTML : (this.contentEl_ = this.getDomHelper().createDom("div", $buttonsClass_contentClass_element$$), this.content_ && (this.contentEl_.innerHTML = this.content_), this.getElement().appendChild(this.contentEl_));
  var $buttonsClass_contentClass_element$$ = this.class_ + "-title", $titleTextClass$$ = this.class_ + "-title-text", $titleCloseClass$$ = this.class_ + "-title-close";
  (this.titleEl_ = goog.dom.getElementsByTagNameAndClass(null, $buttonsClass_contentClass_element$$, this.getElement())[0]) ? (this.titleTextEl_ = goog.dom.getElementsByTagNameAndClass(null, $titleTextClass$$, this.titleEl_)[0], this.titleCloseEl_ = goog.dom.getElementsByTagNameAndClass(null, $titleCloseClass$$, this.titleEl_)[0], this.titleEl_.id || (this.titleEl_.id = this.getId())) : (this.titleEl_ = this.getDomHelper().createDom("div", {className:$buttonsClass_contentClass_element$$, id:this.getId()}), 
  this.getElement().insertBefore(this.titleEl_, this.contentEl_));
  this.titleId_ = this.titleEl_.id;
  this.titleTextEl_ ? this.title_ = goog.dom.getTextContent(this.titleTextEl_) : (this.titleTextEl_ = this.getDomHelper().createDom("span", $titleTextClass$$, this.title_), this.titleEl_.appendChild(this.titleTextEl_));
  goog.dom.a11y.setState(this.getElement(), "labelledby", this.titleId_ || "");
  this.titleCloseEl_ || (this.titleCloseEl_ = this.getDomHelper().createDom("span", $titleCloseClass$$), this.titleEl_.appendChild(this.titleCloseEl_));
  goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_);
  $buttonsClass_contentClass_element$$ = this.class_ + "-buttons";
  (this.buttonEl_ = goog.dom.getElementsByTagNameAndClass(null, $buttonsClass_contentClass_element$$, this.getElement())[0]) ? (this.buttons_ = new goog.ui.Dialog.ButtonSet(this.getDomHelper()), this.buttons_.decorate(this.buttonEl_)) : (this.buttonEl_ = this.getDomHelper().createDom("div", $buttonsClass_contentClass_element$$), this.getElement().appendChild(this.buttonEl_), this.buttons_ && this.buttons_.attachToElement(this.buttonEl_), goog.style.showElement(this.buttonEl_, !!this.buttons_));
  this.setBackgroundElementOpacity(this.backgroundElementOpacity_)
};
goog.ui.Dialog.prototype.enterDocument = function $goog$ui$Dialog$$enterDocument$() {
  goog.ui.Dialog.superClass_.enterDocument.call(this);
  this.getHandler().listen(this.getElement(), goog.events.EventType.KEYDOWN, this.onKey_).listen(this.getElement(), goog.events.EventType.KEYPRESS, this.onKey_);
  this.getHandler().listen(this.buttonEl_, goog.events.EventType.CLICK, this.onButtonClick_);
  this.setDraggingEnabled_(this.draggable_);
  this.getHandler().listen(this.titleCloseEl_, goog.events.EventType.CLICK, this.onTitleCloseClick_);
  goog.dom.a11y.setRole(this.getElement(), this.getPreferredAriaRole());
  "" !== this.titleTextEl_.id && goog.dom.a11y.setState(this.getElement(), "labelledby", this.titleTextEl_.id);
  this.modal_ || this.setModalInternal_(!1)
};
goog.ui.Dialog.prototype.exitDocument = function $goog$ui$Dialog$$exitDocument$() {
  this.isVisible() && this.setVisible(!1);
  this.setDraggingEnabled_(!1);
  goog.ui.Dialog.superClass_.exitDocument.call(this)
};
goog.ui.Dialog.prototype.setVisible = function $goog$ui$Dialog$$setVisible$($visible$$) {
  $visible$$ != this.isVisible() && (this.isInDocument() || this.render(), goog.ui.Dialog.superClass_.setVisible.call(this, $visible$$))
};
goog.ui.Dialog.prototype.onShow = function $goog$ui$Dialog$$onShow$() {
  goog.ui.Dialog.superClass_.onShow.call(this);
  this.dispatchEvent(goog.ui.Dialog.EventType.AFTER_SHOW)
};
goog.ui.Dialog.prototype.onHide = function $goog$ui$Dialog$$onHide$() {
  goog.ui.Dialog.superClass_.onHide.call(this);
  this.dispatchEvent(goog.ui.Dialog.EventType.AFTER_HIDE);
  this.disposeOnHide_ && this.dispose()
};
goog.ui.Dialog.prototype.focus = function $goog$ui$Dialog$$focus$() {
  goog.ui.Dialog.superClass_.focus.call(this);
  if(this.getButtonSet()) {
    var $defaultButton$$ = this.getButtonSet().getDefault();
    if($defaultButton$$) {
      for(var $doc$$ = this.getDomHelper().getDocument(), $buttons$$ = this.buttonEl_.getElementsByTagName("button"), $i$$ = 0, $button$$;$button$$ = $buttons$$[$i$$];$i$$++) {
        if($button$$.name == $defaultButton$$) {
          try {
            if(goog.userAgent.WEBKIT || goog.userAgent.OPERA) {
              var $temp$$ = $doc$$.createElement("input");
              $temp$$.style.cssText = "position:fixed;width:0;height:0;left:0;top:0;";
              this.getElement().appendChild($temp$$);
              $temp$$.focus();
              this.getElement().removeChild($temp$$)
            }
            $button$$.focus()
          }catch($e$$) {
          }
          break
        }
      }
    }
  }
};
goog.ui.Dialog.prototype.setDraggerLimits_ = function $goog$ui$Dialog$$setDraggerLimits_$() {
  var $doc$$40_h$$ = this.getDomHelper().getDocument(), $viewSize$$2_win$$ = goog.dom.getWindow($doc$$40_h$$) || window, $viewSize$$2_win$$ = goog.dom.getViewportSize($viewSize$$2_win$$), $w$$ = Math.max($doc$$40_h$$.body.scrollWidth, $viewSize$$2_win$$.width), $doc$$40_h$$ = Math.max($doc$$40_h$$.body.scrollHeight, $viewSize$$2_win$$.height), $dialogSize$$ = goog.style.getSize(this.getElement());
  "fixed" == goog.style.getComputedPosition(this.getElement()) ? this.dragger_.setLimits(new goog.math.Rect(0, 0, Math.max(0, $viewSize$$2_win$$.width - $dialogSize$$.width), Math.max(0, $viewSize$$2_win$$.height - $dialogSize$$.height))) : this.dragger_.setLimits(new goog.math.Rect(0, 0, $w$$ - $dialogSize$$.width, $doc$$40_h$$ - $dialogSize$$.height))
};
goog.ui.Dialog.prototype.onTitleCloseClick_ = function $goog$ui$Dialog$$onTitleCloseClick_$() {
  if(this.hasTitleCloseButton_) {
    var $bs_caption$$ = this.getButtonSet(), $key$$ = $bs_caption$$ && $bs_caption$$.getCancel();
    $key$$ ? ($bs_caption$$ = $bs_caption$$.get($key$$), this.dispatchEvent(new goog.ui.Dialog.Event($key$$, $bs_caption$$)) && this.setVisible(!1)) : this.setVisible(!1)
  }
};
goog.ui.Dialog.prototype.getHasTitleCloseButton = function $goog$ui$Dialog$$getHasTitleCloseButton$() {
  return this.hasTitleCloseButton_
};
goog.ui.Dialog.prototype.setHasTitleCloseButton = function $goog$ui$Dialog$$setHasTitleCloseButton$($b$$) {
  this.hasTitleCloseButton_ = $b$$;
  this.titleCloseEl_ && goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_)
};
goog.ui.Dialog.prototype.isEscapeToCancel = function $goog$ui$Dialog$$isEscapeToCancel$() {
  return this.escapeToCancel_
};
goog.ui.Dialog.prototype.setEscapeToCancel = function $goog$ui$Dialog$$setEscapeToCancel$($b$$) {
  this.escapeToCancel_ = $b$$
};
goog.ui.Dialog.prototype.setDisposeOnHide = function $goog$ui$Dialog$$setDisposeOnHide$($b$$) {
  this.disposeOnHide_ = $b$$
};
goog.ui.Dialog.prototype.getDisposeOnHide = function $goog$ui$Dialog$$getDisposeOnHide$() {
  return this.disposeOnHide_
};
goog.ui.Dialog.prototype.disposeInternal = function $goog$ui$Dialog$$disposeInternal$() {
  this.buttonEl_ = this.titleCloseEl_ = null;
  goog.ui.Dialog.superClass_.disposeInternal.call(this)
};
goog.ui.Dialog.prototype.setButtonSet = function $goog$ui$Dialog$$setButtonSet$($buttons$$) {
  this.buttons_ = $buttons$$;
  this.buttonEl_ && (this.buttons_ ? this.buttons_.attachToElement(this.buttonEl_) : this.buttonEl_.innerHTML = "", goog.style.showElement(this.buttonEl_, !!this.buttons_))
};
goog.ui.Dialog.prototype.getButtonSet = function $goog$ui$Dialog$$getButtonSet$() {
  return this.buttons_
};
goog.ui.Dialog.prototype.onButtonClick_ = function $goog$ui$Dialog$$onButtonClick_$($button$$2_e$$44_key$$) {
  if(($button$$2_e$$44_key$$ = this.findParentButton_($button$$2_e$$44_key$$.target)) && !$button$$2_e$$44_key$$.disabled) {
    var $button$$2_e$$44_key$$ = $button$$2_e$$44_key$$.name, $caption$$ = this.getButtonSet().get($button$$2_e$$44_key$$);
    this.dispatchEvent(new goog.ui.Dialog.Event($button$$2_e$$44_key$$, $caption$$)) && this.setVisible(!1)
  }
};
goog.ui.Dialog.prototype.findParentButton_ = function $goog$ui$Dialog$$findParentButton_$($el$$29_element$$) {
  for(;null != $el$$29_element$$ && $el$$29_element$$ != this.buttonEl_;) {
    if("BUTTON" == $el$$29_element$$.tagName) {
      return $el$$29_element$$
    }
    $el$$29_element$$ = $el$$29_element$$.parentNode
  }
  return null
};
goog.ui.Dialog.prototype.onKey_ = function $goog$ui$Dialog$$onKey_$($e$$) {
  var $caption$$ = !1, $hasHandler$$ = !1, $buttonSet$$ = this.getButtonSet(), $isSpecialFormElement_target$$ = $e$$.target;
  if($e$$.type == goog.events.EventType.KEYDOWN) {
    if(this.escapeToCancel_ && $e$$.keyCode == goog.events.KeyCodes.ESC) {
      var $cancel_key$$ = $buttonSet$$ && $buttonSet$$.getCancel(), $isSpecialFormElement_target$$ = "SELECT" == $isSpecialFormElement_target$$.tagName && !$isSpecialFormElement_target$$.disabled;
      $cancel_key$$ && !$isSpecialFormElement_target$$ ? ($hasHandler$$ = !0, $caption$$ = $buttonSet$$.get($cancel_key$$), $caption$$ = this.dispatchEvent(new goog.ui.Dialog.Event($cancel_key$$, $caption$$))) : $isSpecialFormElement_target$$ || ($caption$$ = !0)
    }else {
      $e$$.keyCode == goog.events.KeyCodes.TAB && ($e$$.shiftKey && $isSpecialFormElement_target$$ == this.getElement()) && ($hasHandler$$ = !0)
    }
  }else {
    if($e$$.keyCode == goog.events.KeyCodes.ENTER) {
      if("BUTTON" == $isSpecialFormElement_target$$.tagName) {
        $cancel_key$$ = $isSpecialFormElement_target$$.name
      }else {
        if($buttonSet$$) {
          var $defaultKey$$ = $buttonSet$$.getDefault(), $defaultButton$$ = $defaultKey$$ && $buttonSet$$.getButton($defaultKey$$), $isSpecialFormElement_target$$ = ("TEXTAREA" == $isSpecialFormElement_target$$.tagName || "SELECT" == $isSpecialFormElement_target$$.tagName) && !$isSpecialFormElement_target$$.disabled;
          $defaultButton$$ && (!$defaultButton$$.disabled && !$isSpecialFormElement_target$$) && ($cancel_key$$ = $defaultKey$$)
        }
      }
      $cancel_key$$ && $buttonSet$$ && ($hasHandler$$ = !0, $caption$$ = this.dispatchEvent(new goog.ui.Dialog.Event($cancel_key$$, String($buttonSet$$.get($cancel_key$$)))))
    }
  }
  if($caption$$ || $hasHandler$$) {
    $e$$.stopPropagation(), $e$$.preventDefault()
  }
  $caption$$ && this.setVisible(!1)
};
goog.ui.Dialog.Event = function $goog$ui$Dialog$Event$($key$$, $caption$$) {
  this.type = goog.ui.Dialog.EventType.SELECT;
  this.key = $key$$;
  this.caption = $caption$$
};
goog.inherits(goog.ui.Dialog.Event, goog.events.Event);
goog.ui.Dialog.SELECT_EVENT = "dialogselect";
goog.ui.Dialog.EventType = {SELECT:"dialogselect", AFTER_HIDE:"afterhide", AFTER_SHOW:"aftershow"};
goog.ui.Dialog.ButtonSet = function $goog$ui$Dialog$ButtonSet$($opt_domHelper$$) {
  this.dom_ = $opt_domHelper$$ || goog.dom.getDomHelper();
  goog.structs.Map.call(this)
};
goog.inherits(goog.ui.Dialog.ButtonSet, goog.structs.Map);
goog.ui.Dialog.ButtonSet.prototype.class_ = "goog-buttonset";
goog.ui.Dialog.ButtonSet.prototype.defaultButton_ = null;
goog.ui.Dialog.ButtonSet.prototype.element_ = null;
goog.ui.Dialog.ButtonSet.prototype.cancelButton_ = null;
goog.ui.Dialog.ButtonSet.prototype.set = function $goog$ui$Dialog$ButtonSet$$set$($key$$, $caption$$, $opt_isDefault$$, $opt_isCancel$$) {
  goog.structs.Map.prototype.set.call(this, $key$$, $caption$$);
  $opt_isDefault$$ && (this.defaultButton_ = $key$$);
  $opt_isCancel$$ && (this.cancelButton_ = $key$$);
  return this
};
goog.ui.Dialog.ButtonSet.prototype.addButton = function $goog$ui$Dialog$ButtonSet$$addButton$($button$$, $opt_isDefault$$, $opt_isCancel$$) {
  return this.set($button$$.key, $button$$.caption, $opt_isDefault$$, $opt_isCancel$$)
};
goog.ui.Dialog.ButtonSet.prototype.attachToElement = function $goog$ui$Dialog$ButtonSet$$attachToElement$($el$$) {
  this.element_ = $el$$;
  this.render()
};
goog.ui.Dialog.ButtonSet.prototype.render = function $goog$ui$Dialog$ButtonSet$$render$() {
  if(this.element_) {
    this.element_.innerHTML = "";
    var $domHelper$$ = goog.dom.getDomHelper(this.element_);
    goog.structs.forEach(this, function($caption$$, $key$$) {
      var $button$$ = $domHelper$$.createDom("button", {name:$key$$}, $caption$$);
      $key$$ == this.defaultButton_ && ($button$$.className = this.class_ + "-default");
      this.element_.appendChild($button$$)
    }, this)
  }
};
goog.ui.Dialog.ButtonSet.prototype.decorate = function $goog$ui$Dialog$ButtonSet$$decorate$($buttons$$2_element$$) {
  if($buttons$$2_element$$ && $buttons$$2_element$$.nodeType == goog.dom.NodeType.ELEMENT) {
    this.element_ = $buttons$$2_element$$;
    for(var $buttons$$2_element$$ = this.element_.getElementsByTagName("button"), $i$$ = 0, $button$$, $key$$, $caption$$;$button$$ = $buttons$$2_element$$[$i$$];$i$$++) {
      if($key$$ = $button$$.name || $button$$.id, $caption$$ = goog.dom.getTextContent($button$$) || $button$$.value, $key$$) {
        var $isDefault$$ = 0 == $i$$;
        this.set($key$$, $caption$$, $isDefault$$, $button$$.name == goog.ui.Dialog.DefaultButtonKeys.CANCEL);
        $isDefault$$ && goog.dom.classes.add($button$$, this.class_ + "-default")
      }
    }
  }
};
goog.ui.Dialog.ButtonSet.prototype.getElement = function $goog$ui$Dialog$ButtonSet$$getElement$() {
  return this.element_
};
goog.ui.Dialog.ButtonSet.prototype.getDomHelper = function $goog$ui$Dialog$ButtonSet$$getDomHelper$() {
  return this.dom_
};
goog.ui.Dialog.ButtonSet.prototype.setDefault = function $goog$ui$Dialog$ButtonSet$$setDefault$($key$$) {
  this.defaultButton_ = $key$$
};
goog.ui.Dialog.ButtonSet.prototype.getDefault = function $goog$ui$Dialog$ButtonSet$$getDefault$() {
  return this.defaultButton_
};
goog.ui.Dialog.ButtonSet.prototype.setCancel = function $goog$ui$Dialog$ButtonSet$$setCancel$($key$$) {
  this.cancelButton_ = $key$$
};
goog.ui.Dialog.ButtonSet.prototype.getCancel = function $goog$ui$Dialog$ButtonSet$$getCancel$() {
  return this.cancelButton_
};
goog.ui.Dialog.ButtonSet.prototype.getButton = function $goog$ui$Dialog$ButtonSet$$getButton$($key$$) {
  for(var $buttons$$ = this.getAllButtons(), $i$$ = 0, $nextButton$$;$nextButton$$ = $buttons$$[$i$$];$i$$++) {
    if($nextButton$$.name == $key$$ || $nextButton$$.id == $key$$) {
      return $nextButton$$
    }
  }
  return null
};
goog.ui.Dialog.ButtonSet.prototype.getAllButtons = function $goog$ui$Dialog$ButtonSet$$getAllButtons$() {
  return this.element_.getElementsByTagName(goog.dom.TagName.BUTTON)
};
goog.ui.Dialog.ButtonSet.prototype.setButtonEnabled = function $goog$ui$Dialog$ButtonSet$$setButtonEnabled$($key$$, $enabled$$) {
  var $button$$ = this.getButton($key$$);
  $button$$ && ($button$$.disabled = !$enabled$$)
};
goog.ui.Dialog.ButtonSet.prototype.setAllButtonsEnabled = function $goog$ui$Dialog$ButtonSet$$setAllButtonsEnabled$($enabled$$) {
  for(var $allButtons$$ = this.getAllButtons(), $i$$ = 0, $button$$;$button$$ = $allButtons$$[$i$$];$i$$++) {
    $button$$.disabled = !$enabled$$
  }
};
goog.ui.Dialog.DefaultButtonKeys = {OK:"ok", CANCEL:"cancel", YES:"yes", NO:"no", SAVE:"save", CONTINUE:"continue"};
goog.ui.Dialog.MSG_DIALOG_OK_ = goog.getMsg("OK");
goog.ui.Dialog.MSG_DIALOG_CANCEL_ = goog.getMsg("Cancel");
goog.ui.Dialog.MSG_DIALOG_YES_ = goog.getMsg("Yes");
goog.ui.Dialog.MSG_DIALOG_NO_ = goog.getMsg("No");
goog.ui.Dialog.MSG_DIALOG_SAVE_ = goog.getMsg("Save");
goog.ui.Dialog.MSG_DIALOG_CONTINUE_ = goog.getMsg("Continue");
goog.ui.Dialog.DefaultButtonCaptions = {OK:goog.ui.Dialog.MSG_DIALOG_OK_, CANCEL:goog.ui.Dialog.MSG_DIALOG_CANCEL_, YES:goog.ui.Dialog.MSG_DIALOG_YES_, NO:goog.ui.Dialog.MSG_DIALOG_NO_, SAVE:goog.ui.Dialog.MSG_DIALOG_SAVE_, CONTINUE:goog.ui.Dialog.MSG_DIALOG_CONTINUE_};
goog.ui.Dialog.ButtonSet.DefaultButtons = {OK:{key:goog.ui.Dialog.DefaultButtonKeys.OK, caption:goog.ui.Dialog.DefaultButtonCaptions.OK}, CANCEL:{key:goog.ui.Dialog.DefaultButtonKeys.CANCEL, caption:goog.ui.Dialog.DefaultButtonCaptions.CANCEL}, YES:{key:goog.ui.Dialog.DefaultButtonKeys.YES, caption:goog.ui.Dialog.DefaultButtonCaptions.YES}, NO:{key:goog.ui.Dialog.DefaultButtonKeys.NO, caption:goog.ui.Dialog.DefaultButtonCaptions.NO}, SAVE:{key:goog.ui.Dialog.DefaultButtonKeys.SAVE, caption:goog.ui.Dialog.DefaultButtonCaptions.SAVE}, 
CONTINUE:{key:goog.ui.Dialog.DefaultButtonKeys.CONTINUE, caption:goog.ui.Dialog.DefaultButtonCaptions.CONTINUE}};
goog.ui.Dialog.ButtonSet.createOk = function $goog$ui$Dialog$ButtonSet$createOk$() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.OK, !0, !0)
};
goog.ui.Dialog.ButtonSet.createOkCancel = function $goog$ui$Dialog$ButtonSet$createOkCancel$() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.OK, !0).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, !1, !0)
};
goog.ui.Dialog.ButtonSet.createYesNo = function $goog$ui$Dialog$ButtonSet$createYesNo$() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.YES, !0).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.NO, !1, !0)
};
goog.ui.Dialog.ButtonSet.createYesNoCancel = function $goog$ui$Dialog$ButtonSet$createYesNoCancel$() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.YES).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.NO, !0).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, !1, !0)
};
goog.ui.Dialog.ButtonSet.createContinueSaveCancel = function $goog$ui$Dialog$ButtonSet$createContinueSaveCancel$() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CONTINUE).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.SAVE).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, !0, !0)
};
(function() {
  "undefined" != typeof document && (goog.ui.Dialog.ButtonSet.OK = goog.ui.Dialog.ButtonSet.createOk(), goog.ui.Dialog.ButtonSet.OK_CANCEL = goog.ui.Dialog.ButtonSet.createOkCancel(), goog.ui.Dialog.ButtonSet.YES_NO = goog.ui.Dialog.ButtonSet.createYesNo(), goog.ui.Dialog.ButtonSet.YES_NO_CANCEL = goog.ui.Dialog.ButtonSet.createYesNoCancel(), goog.ui.Dialog.ButtonSet.CONTINUE_SAVE_CANCEL = goog.ui.Dialog.ButtonSet.createContinueSaveCancel())
})();
vgps3.Map = function $vgps3$Map$($container$$, $options$$, $plugins$$) {
  this.aboutDialog_ = this.map_ = null;
  this.events = new goog.events.EventHandler(this);
  goog.events.EventTarget.call(this);
  var $opt$$ = {center:new google.maps.LatLng(46.73986, 2.17529), zoom:5, minZoom:6, mapTypeId:google.maps.MapTypeId.TERRAIN};
  goog.object.extend($opt$$, $options$$ || {});
  this.map_ = new google.maps.Map($container$$, $opt$$);
  this.initPlugins_($plugins$$)
};
goog.inherits(vgps3.Map, goog.events.EventTarget);
vgps3.Map.prototype.getGoogleMap = function $vgps3$Map$$getGoogleMap$() {
  return this.map_
};
vgps3.Map.prototype.showAbout = function $vgps3$Map$$showAbout$() {
  var $dialog$$ = this.aboutDialog_ || (this.aboutDialog_ = new goog.ui.Dialog);
  $dialog$$.setTitle("VisuGps v" + vgps3.VERSION);
  $dialog$$.setContent(vgps3.templates.about());
  $dialog$$.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
  $dialog$$.setVisible(!0)
};
vgps3.Map.prototype.initPlugins_ = function $vgps3$Map$$initPlugins_$($plugins$$) {
  goog.isDef($plugins$$) && ($plugins$$ = goog.isArray($plugins$$) ? $plugins$$ : [$plugins$$], goog.array.forEach($plugins$$, function($plugin$$) {
    $plugin$$.init(this)
  }, this))
};
vgps3.IPlugin = function $vgps3$IPlugin$() {
};
vgps3.track = {};
vgps3.track.InfoControl = function $vgps3$track$InfoControl$($map$$, $position$$) {
  this.dom_ = goog.dom.createDom("div", "map-ctrl", "<strong>Content</strong>");
  $map$$.controls[$position$$].push(this.dom_)
};
vgps3.track.InfoControl.prototype.setInfo = function $vgps3$track$InfoControl$$setInfo$($pointData$$) {
  goog.soy.renderElement(this.dom_, vgps3.track.templates.infoControl, {data:$pointData$$})
};
vgps3.track.templates = {};
vgps3.track.templates.infoControl = function $vgps3$track$templates$infoControl$($opt_data$$) {
  return"<h3>...iNfO</h3><ul><li>" + soy.$$escapeHtml($opt_data$$.data.elev) + "m [hV]</li><li>" + soy.$$escapeHtml($opt_data$$.data.elevGnd) + "m [hS]</li><li>" + soy.$$escapeHtml($opt_data$$.data.vario) + "m/s [Vz]</li><li>" + soy.$$escapeHtml($opt_data$$.data.speed) + "km/h [Vx]</li><li>" + soy.$$escapeHtml($opt_data$$.data.hour) + ":" + soy.$$escapeHtml($opt_data$$.data.min) + ":" + soy.$$escapeHtml($opt_data$$.data.sec) + " [Th]</li></ul>"
};
vgps3.track.templates.dateControl = function $vgps3$track$templates$dateControl$($opt_data$$) {
  return"<ul><li>" + soy.$$escapeHtml($opt_data$$.data.date) + "</li>" + ($opt_data$$.data.pilot ? "<li>" + soy.$$escapeHtml($opt_data$$.data.pilot) + "</li>" : "") + "</ul>"
};
vgps3.track.LoadEvent = function $vgps3$track$LoadEvent$($track$$) {
  goog.events.Event.call(this, vgps3.track.EventType.LOAD);
  this.track = $track$$
};
goog.inherits(vgps3.track.LoadEvent, goog.events.Event);
vgps3.track.ClickEvent = function $vgps3$track$ClickEvent$($track$$, $position$$) {
  goog.events.Event.call(this, vgps3.track.EventType.CLICK);
  this.track = $track$$;
  this.position = $position$$
};
goog.inherits(vgps3.track.ClickEvent, goog.events.Event);
goog.structs.Collection = function $goog$structs$Collection$() {
};
goog.structs.Set = function $goog$structs$Set$($opt_values$$) {
  this.map_ = new goog.structs.Map;
  $opt_values$$ && this.addAll($opt_values$$)
};
goog.structs.Set.getKey_ = function $goog$structs$Set$getKey_$($val$$) {
  var $type$$ = typeof $val$$;
  return"object" == $type$$ && $val$$ || "function" == $type$$ ? "o" + goog.getUid($val$$) : $type$$.substr(0, 1) + $val$$
};
goog.structs.Set.prototype.getCount = function $goog$structs$Set$$getCount$() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function $goog$structs$Set$$add$($element$$) {
  this.map_.set(goog.structs.Set.getKey_($element$$), $element$$)
};
goog.structs.Set.prototype.addAll = function $goog$structs$Set$$addAll$($col$$11_values$$) {
  for(var $col$$11_values$$ = goog.structs.getValues($col$$11_values$$), $l$$ = $col$$11_values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    this.add($col$$11_values$$[$i$$])
  }
};
goog.structs.Set.prototype.removeAll = function $goog$structs$Set$$removeAll$($col$$12_values$$) {
  for(var $col$$12_values$$ = goog.structs.getValues($col$$12_values$$), $l$$ = $col$$12_values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    this.remove($col$$12_values$$[$i$$])
  }
};
goog.structs.Set.prototype.remove = function $goog$structs$Set$$remove$($element$$) {
  return this.map_.remove(goog.structs.Set.getKey_($element$$))
};
goog.structs.Set.prototype.clear = function $goog$structs$Set$$clear$() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function $goog$structs$Set$$isEmpty$() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function $goog$structs$Set$$contains$($element$$) {
  return this.map_.containsKey(goog.structs.Set.getKey_($element$$))
};
goog.structs.Set.prototype.containsAll = function $goog$structs$Set$$containsAll$($col$$) {
  return goog.structs.every($col$$, this.contains, this)
};
goog.structs.Set.prototype.intersection = function $goog$structs$Set$$intersection$($col$$14_values$$) {
  for(var $result$$ = new goog.structs.Set, $col$$14_values$$ = goog.structs.getValues($col$$14_values$$), $i$$ = 0;$i$$ < $col$$14_values$$.length;$i$$++) {
    var $value$$ = $col$$14_values$$[$i$$];
    this.contains($value$$) && $result$$.add($value$$)
  }
  return $result$$
};
goog.structs.Set.prototype.difference = function $goog$structs$Set$$difference$($col$$) {
  var $result$$ = this.clone();
  $result$$.removeAll($col$$);
  return $result$$
};
goog.structs.Set.prototype.getValues = function $goog$structs$Set$$getValues$() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function $goog$structs$Set$$clone$() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function $goog$structs$Set$$equals$($col$$) {
  return this.getCount() == goog.structs.getCount($col$$) && this.isSubsetOf($col$$)
};
goog.structs.Set.prototype.isSubsetOf = function $goog$structs$Set$$isSubsetOf$($col$$) {
  var $colCount$$ = goog.structs.getCount($col$$);
  if(this.getCount() > $colCount$$) {
    return!1
  }
  !($col$$ instanceof goog.structs.Set) && 5 < $colCount$$ && ($col$$ = new goog.structs.Set($col$$));
  return goog.structs.every(this, function($value$$) {
    return goog.structs.contains($col$$, $value$$)
  })
};
goog.structs.Set.prototype.__iterator__ = function $goog$structs$Set$$__iterator__$() {
  return this.map_.__iterator__(!1)
};
goog.debug.catchErrors = function $goog$debug$catchErrors$($logFunc$$, $opt_cancel$$, $opt_target$$6_target$$) {
  var $opt_target$$6_target$$ = $opt_target$$6_target$$ || goog.global, $oldErrorHandler$$ = $opt_target$$6_target$$.onerror, $retVal$$ = !!$opt_cancel$$;
  goog.userAgent.WEBKIT && !goog.userAgent.isVersion("535.3") && ($retVal$$ = !$retVal$$);
  $opt_target$$6_target$$.onerror = function $$opt_target$$6_target$$$onerror$($message$$, $url$$, $line$$) {
    $oldErrorHandler$$ && $oldErrorHandler$$($message$$, $url$$, $line$$);
    $logFunc$$({message:$message$$, fileName:$url$$, line:$line$$});
    return $retVal$$
  }
};
goog.debug.expose = function $goog$debug$expose$($obj$$, $opt_showFn$$) {
  if("undefined" == typeof $obj$$) {
    return"undefined"
  }
  if(null == $obj$$) {
    return"NULL"
  }
  var $str$$ = [], $x$$;
  for($x$$ in $obj$$) {
    if($opt_showFn$$ || !goog.isFunction($obj$$[$x$$])) {
      var $s$$ = $x$$ + " = ";
      try {
        $s$$ += $obj$$[$x$$]
      }catch($e$$) {
        $s$$ += "*** " + $e$$ + " ***"
      }
      $str$$.push($s$$)
    }
  }
  return $str$$.join("\n")
};
goog.debug.deepExpose = function $goog$debug$deepExpose$($obj$$0$$, $opt_showFn$$) {
  var $previous$$ = new goog.structs.Set, $str$$ = [], $helper$$ = function $$helper$$$($obj$$, $space$$) {
    var $nestspace$$ = $space$$ + "  ";
    try {
      if(goog.isDef($obj$$)) {
        if(goog.isNull($obj$$)) {
          $str$$.push("NULL")
        }else {
          if(goog.isString($obj$$)) {
            $str$$.push('"' + $obj$$.replace(/\n/g, "\n" + $space$$) + '"')
          }else {
            if(goog.isFunction($obj$$)) {
              $str$$.push(String($obj$$).replace(/\n/g, "\n" + $space$$))
            }else {
              if(goog.isObject($obj$$)) {
                if($previous$$.contains($obj$$)) {
                  $str$$.push("*** reference loop detected ***")
                }else {
                  $previous$$.add($obj$$);
                  $str$$.push("{");
                  for(var $x$$ in $obj$$) {
                    if($opt_showFn$$ || !goog.isFunction($obj$$[$x$$])) {
                      $str$$.push("\n"), $str$$.push($nestspace$$), $str$$.push($x$$ + " = "), $helper$$($obj$$[$x$$], $nestspace$$)
                    }
                  }
                  $str$$.push("\n" + $space$$ + "}")
                }
              }else {
                $str$$.push($obj$$)
              }
            }
          }
        }
      }else {
        $str$$.push("undefined")
      }
    }catch($e$$) {
      $str$$.push("*** " + $e$$ + " ***")
    }
  };
  $helper$$($obj$$0$$, "");
  return $str$$.join("")
};
goog.debug.exposeArray = function $goog$debug$exposeArray$($arr$$) {
  for(var $str$$ = [], $i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
    goog.isArray($arr$$[$i$$]) ? $str$$.push(goog.debug.exposeArray($arr$$[$i$$])) : $str$$.push($arr$$[$i$$])
  }
  return"[ " + $str$$.join(", ") + " ]"
};
goog.debug.exposeException = function $goog$debug$exposeException$($err$$, $opt_fn$$) {
  try {
    var $e$$ = goog.debug.normalizeErrorObject($err$$);
    return"Message: " + goog.string.htmlEscape($e$$.message) + '\nUrl: <a href="view-source:' + $e$$.fileName + '" target="_new">' + $e$$.fileName + "</a>\nLine: " + $e$$.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape($e$$.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace($opt_fn$$) + "-> ")
  }catch($e2$$) {
    return"Exception trying to expose exception! You win, we lose. " + $e2$$
  }
};
goog.debug.normalizeErrorObject = function $goog$debug$normalizeErrorObject$($err$$) {
  var $href$$ = goog.getObjectByName("window.location.href");
  if(goog.isString($err$$)) {
    return{message:$err$$, name:"Unknown error", lineNumber:"Not available", fileName:$href$$, stack:"Not available"}
  }
  var $lineNumber$$, $fileName$$, $threwError$$ = !1;
  try {
    $lineNumber$$ = $err$$.lineNumber || $err$$.line || "Not available"
  }catch($e$$) {
    $lineNumber$$ = "Not available", $threwError$$ = !0
  }
  try {
    $fileName$$ = $err$$.fileName || $err$$.filename || $err$$.sourceURL || $href$$
  }catch($e$$0$$) {
    $fileName$$ = "Not available", $threwError$$ = !0
  }
  return $threwError$$ || !$err$$.lineNumber || !$err$$.fileName || !$err$$.stack ? {message:$err$$.message, name:$err$$.name, lineNumber:$lineNumber$$, fileName:$fileName$$, stack:$err$$.stack || "Not available"} : $err$$
};
goog.debug.enhanceError = function $goog$debug$enhanceError$($err$$, $opt_message$$) {
  var $error$$ = "string" == typeof $err$$ ? Error($err$$) : $err$$;
  $error$$.stack || ($error$$.stack = goog.debug.getStacktrace(arguments.callee.caller));
  if($opt_message$$) {
    for(var $x$$ = 0;$error$$["message" + $x$$];) {
      ++$x$$
    }
    $error$$["message" + $x$$] = String($opt_message$$)
  }
  return $error$$
};
goog.debug.getStacktraceSimple = function $goog$debug$getStacktraceSimple$($opt_depth$$) {
  for(var $sb$$ = [], $fn$$ = arguments.callee.caller, $depth$$ = 0;$fn$$ && (!$opt_depth$$ || $depth$$ < $opt_depth$$);) {
    $sb$$.push(goog.debug.getFunctionName($fn$$));
    $sb$$.push("()\n");
    try {
      $fn$$ = $fn$$.caller
    }catch($e$$) {
      $sb$$.push("[exception trying to get caller]\n");
      break
    }
    $depth$$++;
    if($depth$$ >= goog.debug.MAX_STACK_DEPTH) {
      $sb$$.push("[...long stack...]");
      break
    }
  }
  $opt_depth$$ && $depth$$ >= $opt_depth$$ ? $sb$$.push("[...reached max depth limit...]") : $sb$$.push("[end]");
  return $sb$$.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function $goog$debug$getStacktrace$($opt_fn$$) {
  return goog.debug.getStacktraceHelper_($opt_fn$$ || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function $goog$debug$getStacktraceHelper_$($fn$$, $visited$$) {
  var $sb$$ = [];
  if(goog.array.contains($visited$$, $fn$$)) {
    $sb$$.push("[...circular reference...]")
  }else {
    if($fn$$ && $visited$$.length < goog.debug.MAX_STACK_DEPTH) {
      $sb$$.push(goog.debug.getFunctionName($fn$$) + "(");
      for(var $args$$ = $fn$$.arguments, $i$$ = 0;$i$$ < $args$$.length;$i$$++) {
        0 < $i$$ && $sb$$.push(", ");
        var $arg$$;
        $arg$$ = $args$$[$i$$];
        switch(typeof $arg$$) {
          case "object":
            $arg$$ = $arg$$ ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            $arg$$ = String($arg$$);
            break;
          case "boolean":
            $arg$$ = $arg$$ ? "true" : "false";
            break;
          case "function":
            $arg$$ = ($arg$$ = goog.debug.getFunctionName($arg$$)) ? $arg$$ : "[fn]";
            break;
          default:
            $arg$$ = typeof $arg$$
        }
        40 < $arg$$.length && ($arg$$ = $arg$$.substr(0, 40) + "...");
        $sb$$.push($arg$$)
      }
      $visited$$.push($fn$$);
      $sb$$.push(")\n");
      try {
        $sb$$.push(goog.debug.getStacktraceHelper_($fn$$.caller, $visited$$))
      }catch($e$$) {
        $sb$$.push("[exception trying to get caller]\n")
      }
    }else {
      $fn$$ ? $sb$$.push("[...long stack...]") : $sb$$.push("[end]")
    }
  }
  return $sb$$.join("")
};
goog.debug.setFunctionResolver = function $goog$debug$setFunctionResolver$($resolver$$) {
  goog.debug.fnNameResolver_ = $resolver$$
};
goog.debug.getFunctionName = function $goog$debug$getFunctionName$($fn$$) {
  if(goog.debug.fnNameCache_[$fn$$]) {
    return goog.debug.fnNameCache_[$fn$$]
  }
  if(goog.debug.fnNameResolver_) {
    var $matches$$1_name$$ = goog.debug.fnNameResolver_($fn$$);
    if($matches$$1_name$$) {
      return goog.debug.fnNameCache_[$fn$$] = $matches$$1_name$$
    }
  }
  $fn$$ = String($fn$$);
  goog.debug.fnNameCache_[$fn$$] || ($matches$$1_name$$ = /function ([^\(]+)/.exec($fn$$), goog.debug.fnNameCache_[$fn$$] = $matches$$1_name$$ ? $matches$$1_name$$[1] : "[Anonymous]");
  return goog.debug.fnNameCache_[$fn$$]
};
goog.debug.makeWhitespaceVisible = function $goog$debug$makeWhitespaceVisible$($string$$) {
  return $string$$.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function $goog$debug$LogRecord$($level$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$) {
  this.reset($level$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function $goog$debug$LogRecord$$reset$($level$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof $opt_sequenceNumber$$ ? $opt_sequenceNumber$$ : goog.debug.LogRecord.nextSequenceNumber_++);
  this.time_ = $opt_time$$ || goog.now();
  this.level_ = $level$$;
  this.msg_ = $msg$$;
  this.loggerName_ = $loggerName$$;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function $goog$debug$LogRecord$$getLoggerName$() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function $goog$debug$LogRecord$$getException$() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function $goog$debug$LogRecord$$setException$($exception$$) {
  this.exception_ = $exception$$
};
goog.debug.LogRecord.prototype.getExceptionText = function $goog$debug$LogRecord$$getExceptionText$() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function $goog$debug$LogRecord$$setExceptionText$($text$$) {
  this.exceptionText_ = $text$$
};
goog.debug.LogRecord.prototype.setLoggerName = function $goog$debug$LogRecord$$setLoggerName$($loggerName$$) {
  this.loggerName_ = $loggerName$$
};
goog.debug.LogRecord.prototype.getLevel = function $goog$debug$LogRecord$$getLevel$() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function $goog$debug$LogRecord$$setLevel$($level$$) {
  this.level_ = $level$$
};
goog.debug.LogRecord.prototype.getMessage = function $goog$debug$LogRecord$$getMessage$() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function $goog$debug$LogRecord$$setMessage$($msg$$) {
  this.msg_ = $msg$$
};
goog.debug.LogRecord.prototype.getMillis = function $goog$debug$LogRecord$$getMillis$() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function $goog$debug$LogRecord$$setMillis$($time$$) {
  this.time_ = $time$$
};
goog.debug.LogRecord.prototype.getSequenceNumber = function $goog$debug$LogRecord$$getSequenceNumber$() {
  return this.sequenceNumber_
};
goog.debug.LogBuffer = function $goog$debug$LogBuffer$() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function $goog$debug$LogBuffer$getInstance$() {
  goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function $goog$debug$LogBuffer$$addRecord$($level$$, $msg$$, $loggerName$$) {
  var $curIndex_ret$$ = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = $curIndex_ret$$;
  if(this.isFull_) {
    return $curIndex_ret$$ = this.buffer_[$curIndex_ret$$], $curIndex_ret$$.reset($level$$, $msg$$, $loggerName$$), $curIndex_ret$$
  }
  this.isFull_ = $curIndex_ret$$ == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[$curIndex_ret$$] = new goog.debug.LogRecord($level$$, $msg$$, $loggerName$$)
};
goog.debug.LogBuffer.isBufferingEnabled = function $goog$debug$LogBuffer$isBufferingEnabled$() {
  return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function $goog$debug$LogBuffer$$clear$() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function $goog$debug$LogBuffer$$forEachRecord$($func$$) {
  var $buffer$$ = this.buffer_;
  if($buffer$$[0]) {
    var $curIndex$$ = this.curIndex_, $i$$ = this.isFull_ ? $curIndex$$ : -1;
    do {
      $i$$ = ($i$$ + 1) % goog.debug.LogBuffer.CAPACITY, $func$$($buffer$$[$i$$])
    }while($i$$ != $curIndex$$)
  }
};
goog.debug.Logger = function $goog$debug$Logger$($name$$) {
  this.name_ = $name$$
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function $goog$debug$Logger$Level$($name$$, $value$$) {
  this.name = $name$$;
  this.value = $value$$
};
goog.debug.Logger.Level.prototype.toString = function $goog$debug$Logger$Level$$toString$() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function $goog$debug$Logger$Level$createPredefinedLevelsCache_$() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var $i$$ = 0, $level$$;$level$$ = goog.debug.Logger.Level.PREDEFINED_LEVELS[$i$$];$i$$++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[$level$$.value] = $level$$, goog.debug.Logger.Level.predefinedLevelsCache_[$level$$.name] = $level$$
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function $goog$debug$Logger$Level$getPredefinedLevel$($name$$) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[$name$$] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function $goog$debug$Logger$Level$getPredefinedLevelByValue$($value$$) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if($value$$ in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[$value$$]
  }
  for(var $i$$ = 0;$i$$ < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++$i$$) {
    var $level$$ = goog.debug.Logger.Level.PREDEFINED_LEVELS[$i$$];
    if($level$$.value <= $value$$) {
      return $level$$
    }
  }
  return null
};
goog.debug.Logger.getLogger = function $goog$debug$Logger$getLogger$($name$$) {
  return goog.debug.LogManager.getLogger($name$$)
};
goog.debug.Logger.logToProfilers = function $goog$debug$Logger$logToProfilers$($msg$$) {
  goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp($msg$$) : goog.global.console.markTimeline && goog.global.console.markTimeline($msg$$));
  goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark($msg$$)
};
goog.debug.Logger.prototype.getName = function $goog$debug$Logger$$getName$() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function $goog$debug$Logger$$addHandler$($handler$$) {
  goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push($handler$$)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push($handler$$))
};
goog.debug.Logger.prototype.removeHandler = function $goog$debug$Logger$$removeHandler$($handler$$) {
  var $handlers$$ = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!$handlers$$ && goog.array.remove($handlers$$, $handler$$)
};
goog.debug.Logger.prototype.getParent = function $goog$debug$Logger$$getParent$() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function $goog$debug$Logger$$getChildren$() {
  this.children_ || (this.children_ = {});
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function $goog$debug$Logger$$setLevel$($level$$) {
  goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = $level$$ : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = $level$$)
};
goog.debug.Logger.prototype.getLevel = function $goog$debug$Logger$$getLevel$() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function $goog$debug$Logger$$getEffectiveLevel$() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function $goog$debug$Logger$$isLoggable$($level$$) {
  return $level$$.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function $goog$debug$Logger$$log$($level$$, $msg$$, $opt_exception$$) {
  this.isLoggable($level$$) && this.doLogRecord_(this.getLogRecord($level$$, $msg$$, $opt_exception$$))
};
goog.debug.Logger.prototype.getLogRecord = function $goog$debug$Logger$$getLogRecord$($level$$, $msg$$, $opt_exception$$) {
  var $logRecord$$ = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord($level$$, $msg$$, this.name_) : new goog.debug.LogRecord($level$$, String($msg$$), this.name_);
  $opt_exception$$ && ($logRecord$$.setException($opt_exception$$), $logRecord$$.setExceptionText(goog.debug.exposeException($opt_exception$$, arguments.callee.caller)));
  return $logRecord$$
};
goog.debug.Logger.prototype.shout = function $goog$debug$Logger$$shout$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.SHOUT, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.severe = function $goog$debug$Logger$$severe$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.SEVERE, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.warning = function $goog$debug$Logger$$warning$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.WARNING, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.info = function $goog$debug$Logger$$info$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.INFO, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.config = function $goog$debug$Logger$$config$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.CONFIG, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.fine = function $goog$debug$Logger$$fine$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.FINE, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.finer = function $goog$debug$Logger$$finer$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.FINER, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.finest = function $goog$debug$Logger$$finest$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.FINEST, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.logRecord = function $goog$debug$Logger$$logRecord$($logRecord$$) {
  this.isLoggable($logRecord$$.getLevel()) && this.doLogRecord_($logRecord$$)
};
goog.debug.Logger.prototype.doLogRecord_ = function $goog$debug$Logger$$doLogRecord_$($logRecord$$) {
  goog.debug.Logger.logToProfilers("log:" + $logRecord$$.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    for(var $i$$112_target$$ = this;$i$$112_target$$;) {
      $i$$112_target$$.callPublish_($logRecord$$), $i$$112_target$$ = $i$$112_target$$.getParent()
    }
  }else {
    for(var $i$$112_target$$ = 0, $handler$$;$handler$$ = goog.debug.Logger.rootHandlers_[$i$$112_target$$++];) {
      $handler$$($logRecord$$)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function $goog$debug$Logger$$callPublish_$($logRecord$$) {
  if(this.handlers_) {
    for(var $i$$ = 0, $handler$$;$handler$$ = this.handlers_[$i$$];$i$$++) {
      $handler$$($logRecord$$)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function $goog$debug$Logger$$setParent_$($parent$$) {
  this.parent_ = $parent$$
};
goog.debug.Logger.prototype.addChild_ = function $goog$debug$Logger$$addChild_$($name$$, $logger$$) {
  this.getChildren()[$name$$] = $logger$$
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function $goog$debug$LogManager$initialize$() {
  goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(""), goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
};
goog.debug.LogManager.getLoggers = function $goog$debug$LogManager$getLoggers$() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function $goog$debug$LogManager$getRoot$() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function $goog$debug$LogManager$getLogger$($name$$) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[$name$$] || goog.debug.LogManager.createLogger_($name$$)
};
goog.debug.LogManager.createFunctionForCatchErrors = function $goog$debug$LogManager$createFunctionForCatchErrors$($opt_logger$$) {
  return function($info$$) {
    ($opt_logger$$ || goog.debug.LogManager.getRoot()).severe("Error: " + $info$$.message + " (" + $info$$.fileName + " @ Line: " + $info$$.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function $goog$debug$LogManager$createLogger_$($name$$) {
  var $logger$$ = new goog.debug.Logger($name$$);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var $lastDotIndex_leafName$$ = $name$$.lastIndexOf("."), $parentLogger_parentName$$ = $name$$.substr(0, $lastDotIndex_leafName$$), $lastDotIndex_leafName$$ = $name$$.substr($lastDotIndex_leafName$$ + 1), $parentLogger_parentName$$ = goog.debug.LogManager.getLogger($parentLogger_parentName$$);
    $parentLogger_parentName$$.addChild_($lastDotIndex_leafName$$, $logger$$);
    $logger$$.setParent_($parentLogger_parentName$$)
  }
  return goog.debug.LogManager.loggers_[$name$$] = $logger$$
};
goog.json = {};
goog.json.isValid_ = function $goog$json$isValid_$($s$$) {
  return/^\s*$/.test($s$$) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test($s$$.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
};
goog.json.parse = function $goog$json$parse$($o$$2_s$$) {
  $o$$2_s$$ = String($o$$2_s$$);
  if(goog.json.isValid_($o$$2_s$$)) {
    try {
      return eval("(" + $o$$2_s$$ + ")")
    }catch($ex$$) {
    }
  }
  throw Error("Invalid JSON string: " + $o$$2_s$$);
};
goog.json.unsafeParse = function $goog$json$unsafeParse$($s$$) {
  return eval("(" + $s$$ + ")")
};
goog.json.serialize = function $goog$json$serialize$($object$$, $opt_replacer$$) {
  return(new goog.json.Serializer($opt_replacer$$)).serialize($object$$)
};
goog.json.Serializer = function $goog$json$Serializer$($opt_replacer$$) {
  this.replacer_ = $opt_replacer$$
};
goog.json.Serializer.prototype.serialize = function $goog$json$Serializer$$serialize$($object$$) {
  var $sb$$ = [];
  this.serialize_($object$$, $sb$$);
  return $sb$$.join("")
};
goog.json.Serializer.prototype.serialize_ = function $goog$json$Serializer$$serialize_$($object$$, $sb$$) {
  switch(typeof $object$$) {
    case "string":
      this.serializeString_($object$$, $sb$$);
      break;
    case "number":
      this.serializeNumber_($object$$, $sb$$);
      break;
    case "boolean":
      $sb$$.push($object$$);
      break;
    case "undefined":
      $sb$$.push("null");
      break;
    case "object":
      if(null == $object$$) {
        $sb$$.push("null");
        break
      }
      if(goog.isArray($object$$)) {
        this.serializeArray($object$$, $sb$$);
        break
      }
      this.serializeObject_($object$$, $sb$$);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof $object$$);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function $goog$json$Serializer$$serializeString_$($s$$, $sb$$) {
  $sb$$.push('"', $s$$.replace(goog.json.Serializer.charsToReplace_, function($c$$) {
    if($c$$ in goog.json.Serializer.charToJsonCharCache_) {
      return goog.json.Serializer.charToJsonCharCache_[$c$$]
    }
    var $cc$$ = $c$$.charCodeAt(0), $rv$$ = "\\u";
    16 > $cc$$ ? $rv$$ += "000" : 256 > $cc$$ ? $rv$$ += "00" : 4096 > $cc$$ && ($rv$$ += "0");
    return goog.json.Serializer.charToJsonCharCache_[$c$$] = $rv$$ + $cc$$.toString(16)
  }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function $goog$json$Serializer$$serializeNumber_$($n$$, $sb$$) {
  $sb$$.push(isFinite($n$$) && !isNaN($n$$) ? $n$$ : "null")
};
goog.json.Serializer.prototype.serializeArray = function $goog$json$Serializer$$serializeArray$($arr$$, $sb$$) {
  var $l$$ = $arr$$.length;
  $sb$$.push("[");
  for(var $sep_value$$ = "", $i$$ = 0;$i$$ < $l$$;$i$$++) {
    $sb$$.push($sep_value$$), $sep_value$$ = $arr$$[$i$$], this.serialize_(this.replacer_ ? this.replacer_.call($arr$$, String($i$$), $sep_value$$) : $sep_value$$, $sb$$), $sep_value$$ = ","
  }
  $sb$$.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function $goog$json$Serializer$$serializeObject_$($obj$$, $sb$$) {
  $sb$$.push("{");
  var $sep$$ = "", $key$$;
  for($key$$ in $obj$$) {
    if(Object.prototype.hasOwnProperty.call($obj$$, $key$$)) {
      var $value$$ = $obj$$[$key$$];
      "function" != typeof $value$$ && ($sb$$.push($sep$$), this.serializeString_($key$$, $sb$$), $sb$$.push(":"), this.serialize_(this.replacer_ ? this.replacer_.call($obj$$, $key$$, $value$$) : $value$$, $sb$$), $sep$$ = ",")
    }
  }
  $sb$$.push("}")
};
goog.net = {};
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function $goog$net$ErrorCode$getDebugMessage$($errorCode$$) {
  switch($errorCode$$) {
    case goog.net.ErrorCode.NO_ERROR:
      return"No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return"Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return"File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return"Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return"Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return"An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return"Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return"Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return"Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return"The resource is not available offline";
    default:
      return"Unrecognized error code"
  }
};
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress"};
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, REQUEST_TIMEOUT:408, 
CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, HTTP_VERSION_NOT_SUPPORTED:505, QUIRK_IE_NO_CONTENT:1223};
goog.net.HttpStatus.isSuccess = function $goog$net$HttpStatus$isSuccess$($status$$) {
  switch($status$$) {
    case goog.net.HttpStatus.OK:
    ;
    case goog.net.HttpStatus.CREATED:
    ;
    case goog.net.HttpStatus.ACCEPTED:
    ;
    case goog.net.HttpStatus.NO_CONTENT:
    ;
    case goog.net.HttpStatus.NOT_MODIFIED:
    ;
    case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
      return!0;
    default:
      return!1
  }
};
goog.net.XmlHttpFactory = function $goog$net$XmlHttpFactory$() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.getOptions = function $goog$net$XmlHttpFactory$$getOptions$() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
};
goog.net.WrapperXmlHttpFactory = function $goog$net$WrapperXmlHttpFactory$($xhrFactory$$, $optionsFactory$$) {
  goog.net.XmlHttpFactory.call(this);
  this.xhrFactory_ = $xhrFactory$$;
  this.optionsFactory_ = $optionsFactory$$
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function $goog$net$WrapperXmlHttpFactory$$createInstance$() {
  return this.xhrFactory_()
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function $goog$net$WrapperXmlHttpFactory$$getOptions$() {
  return this.optionsFactory_()
};
goog.net.XmlHttp = function $goog$net$XmlHttp$() {
  return goog.net.XmlHttp.factory_.createInstance()
};
goog.net.XmlHttp.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttp.getOptions = function $goog$net$XmlHttp$getOptions$() {
  return goog.net.XmlHttp.factory_.getOptions()
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.setFactory = function $goog$net$XmlHttp$setFactory$($factory$$, $optionsFactory$$) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory($factory$$, $optionsFactory$$))
};
goog.net.XmlHttp.setGlobalFactory = function $goog$net$XmlHttp$setGlobalFactory$($factory$$) {
  goog.net.XmlHttp.factory_ = $factory$$
};
goog.net.DefaultXmlHttpFactory = function $goog$net$DefaultXmlHttpFactory$() {
  goog.net.XmlHttpFactory.call(this)
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function $goog$net$DefaultXmlHttpFactory$$createInstance$() {
  var $progId$$ = this.getProgId_();
  return $progId$$ ? new ActiveXObject($progId$$) : new XMLHttpRequest
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function $goog$net$DefaultXmlHttpFactory$$internalGetOptions$() {
  var $options$$ = {};
  this.getProgId_() && ($options$$[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = !0, $options$$[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = !0);
  return $options$$
};
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function $goog$net$DefaultXmlHttpFactory$$getProgId_$() {
  if(goog.net.XmlHttp.ASSUME_NATIVE_XHR) {
    return""
  }
  if(!this.ieProgId_ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var $ACTIVE_X_IDENTS$$ = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], $i$$ = 0;$i$$ < $ACTIVE_X_IDENTS$$.length;$i$$++) {
      var $candidate$$ = $ACTIVE_X_IDENTS$$[$i$$];
      try {
        return new ActiveXObject($candidate$$), this.ieProgId_ = $candidate$$
      }catch($e$$) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return this.ieProgId_
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function $goog$uri$utils$buildFromEncodedParts$($opt_scheme$$, $opt_userInfo$$, $opt_domain$$, $opt_port$$, $opt_path$$, $opt_queryData$$, $opt_fragment$$) {
  var $out$$ = "";
  $opt_scheme$$ && ($out$$ += $opt_scheme$$ + ":");
  $opt_domain$$ && ($out$$ += "//", $opt_userInfo$$ && ($out$$ += $opt_userInfo$$ + "@"), $out$$ += $opt_domain$$, $opt_port$$ && ($out$$ += ":" + $opt_port$$));
  $opt_path$$ && ($out$$ += $opt_path$$);
  $opt_queryData$$ && ($out$$ += "?" + $opt_queryData$$);
  $opt_fragment$$ && ($out$$ += "#" + $opt_fragment$$);
  return $out$$
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function $goog$uri$utils$split$($uri$$) {
  return $uri$$.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function $goog$uri$utils$decodeIfPossible_$($uri$$) {
  return $uri$$ && decodeURIComponent($uri$$)
};
goog.uri.utils.getComponentByIndex_ = function $goog$uri$utils$getComponentByIndex_$($componentIndex$$, $uri$$) {
  return goog.uri.utils.split($uri$$)[$componentIndex$$] || null
};
goog.uri.utils.getScheme = function $goog$uri$utils$getScheme$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, $uri$$)
};
goog.uri.utils.getEffectiveScheme = function $goog$uri$utils$getEffectiveScheme$($protocol$$1_scheme_uri$$) {
  $protocol$$1_scheme_uri$$ = goog.uri.utils.getScheme($protocol$$1_scheme_uri$$);
  !$protocol$$1_scheme_uri$$ && self.location && ($protocol$$1_scheme_uri$$ = self.location.protocol, $protocol$$1_scheme_uri$$ = $protocol$$1_scheme_uri$$.substr(0, $protocol$$1_scheme_uri$$.length - 1));
  return $protocol$$1_scheme_uri$$ ? $protocol$$1_scheme_uri$$.toLowerCase() : ""
};
goog.uri.utils.getUserInfoEncoded = function $goog$uri$utils$getUserInfoEncoded$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, $uri$$)
};
goog.uri.utils.getUserInfo = function $goog$uri$utils$getUserInfo$($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded($uri$$))
};
goog.uri.utils.getDomainEncoded = function $goog$uri$utils$getDomainEncoded$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, $uri$$)
};
goog.uri.utils.getDomain = function $goog$uri$utils$getDomain$($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded($uri$$))
};
goog.uri.utils.getPort = function $goog$uri$utils$getPort$($uri$$) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, $uri$$)) || null
};
goog.uri.utils.getPathEncoded = function $goog$uri$utils$getPathEncoded$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, $uri$$)
};
goog.uri.utils.getPath = function $goog$uri$utils$getPath$($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded($uri$$))
};
goog.uri.utils.getQueryData = function $goog$uri$utils$getQueryData$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, $uri$$)
};
goog.uri.utils.getFragmentEncoded = function $goog$uri$utils$getFragmentEncoded$($uri$$) {
  var $hashIndex$$ = $uri$$.indexOf("#");
  return 0 > $hashIndex$$ ? null : $uri$$.substr($hashIndex$$ + 1)
};
goog.uri.utils.setFragmentEncoded = function $goog$uri$utils$setFragmentEncoded$($uri$$, $fragment$$) {
  return goog.uri.utils.removeFragment($uri$$) + ($fragment$$ ? "#" + $fragment$$ : "")
};
goog.uri.utils.getFragment = function $goog$uri$utils$getFragment$($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded($uri$$))
};
goog.uri.utils.getHost = function $goog$uri$utils$getHost$($pieces_uri$$) {
  $pieces_uri$$ = goog.uri.utils.split($pieces_uri$$);
  return goog.uri.utils.buildFromEncodedParts($pieces_uri$$[goog.uri.utils.ComponentIndex.SCHEME], $pieces_uri$$[goog.uri.utils.ComponentIndex.USER_INFO], $pieces_uri$$[goog.uri.utils.ComponentIndex.DOMAIN], $pieces_uri$$[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function $goog$uri$utils$getPathAndAfter$($pieces$$1_uri$$) {
  $pieces$$1_uri$$ = goog.uri.utils.split($pieces$$1_uri$$);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, $pieces$$1_uri$$[goog.uri.utils.ComponentIndex.PATH], $pieces$$1_uri$$[goog.uri.utils.ComponentIndex.QUERY_DATA], $pieces$$1_uri$$[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function $goog$uri$utils$removeFragment$($uri$$) {
  var $hashIndex$$ = $uri$$.indexOf("#");
  return 0 > $hashIndex$$ ? $uri$$ : $uri$$.substr(0, $hashIndex$$)
};
goog.uri.utils.haveSameDomain = function $goog$uri$utils$haveSameDomain$($uri1$$, $uri2$$) {
  var $pieces1$$ = goog.uri.utils.split($uri1$$), $pieces2$$ = goog.uri.utils.split($uri2$$);
  return $pieces1$$[goog.uri.utils.ComponentIndex.DOMAIN] == $pieces2$$[goog.uri.utils.ComponentIndex.DOMAIN] && $pieces1$$[goog.uri.utils.ComponentIndex.SCHEME] == $pieces2$$[goog.uri.utils.ComponentIndex.SCHEME] && $pieces1$$[goog.uri.utils.ComponentIndex.PORT] == $pieces2$$[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function $goog$uri$utils$assertNoFragmentsOrQueries_$($uri$$) {
  if(goog.DEBUG && (0 <= $uri$$.indexOf("#") || 0 <= $uri$$.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + $uri$$ + "]");
  }
};
goog.uri.utils.appendQueryData_ = function $goog$uri$utils$appendQueryData_$($buffer$$) {
  if($buffer$$[1]) {
    var $baseUri$$ = $buffer$$[0], $hashIndex$$ = $baseUri$$.indexOf("#");
    0 <= $hashIndex$$ && ($buffer$$.push($baseUri$$.substr($hashIndex$$)), $buffer$$[0] = $baseUri$$ = $baseUri$$.substr(0, $hashIndex$$));
    $hashIndex$$ = $baseUri$$.indexOf("?");
    0 > $hashIndex$$ ? $buffer$$[1] = "?" : $hashIndex$$ == $baseUri$$.length - 1 && ($buffer$$[1] = void 0)
  }
  return $buffer$$.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function $goog$uri$utils$appendKeyValuePairs_$($key$$, $value$$, $pairs$$) {
  if(goog.isArray($value$$)) {
    goog.asserts.assertArray($value$$);
    for(var $j$$ = 0;$j$$ < $value$$.length;$j$$++) {
      goog.uri.utils.appendKeyValuePairs_($key$$, String($value$$[$j$$]), $pairs$$)
    }
  }else {
    null != $value$$ && $pairs$$.push("&", $key$$, "" === $value$$ ? "" : "=", goog.string.urlEncode($value$$))
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function $goog$uri$utils$buildQueryDataBuffer_$($buffer$$, $keysAndValues$$, $i$$) {
  goog.asserts.assert(0 == Math.max($keysAndValues$$.length - ($i$$ || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for($i$$ = $i$$ || 0;$i$$ < $keysAndValues$$.length;$i$$ += 2) {
    goog.uri.utils.appendKeyValuePairs_($keysAndValues$$[$i$$], $keysAndValues$$[$i$$ + 1], $buffer$$)
  }
  return $buffer$$
};
goog.uri.utils.buildQueryData = function $goog$uri$utils$buildQueryData$($keysAndValues$$, $opt_startIndex$$) {
  var $buffer$$ = goog.uri.utils.buildQueryDataBuffer_([], $keysAndValues$$, $opt_startIndex$$);
  $buffer$$[0] = "";
  return $buffer$$.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function $goog$uri$utils$buildQueryDataBufferFromMap_$($buffer$$, $map$$) {
  for(var $key$$ in $map$$) {
    goog.uri.utils.appendKeyValuePairs_($key$$, $map$$[$key$$], $buffer$$)
  }
  return $buffer$$
};
goog.uri.utils.buildQueryDataFromMap = function $goog$uri$utils$buildQueryDataFromMap$($buffer$$14_map$$) {
  $buffer$$14_map$$ = goog.uri.utils.buildQueryDataBufferFromMap_([], $buffer$$14_map$$);
  $buffer$$14_map$$[0] = "";
  return $buffer$$14_map$$.join("")
};
goog.uri.utils.appendParams = function $goog$uri$utils$appendParams$($uri$$, $var_args$$) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([$uri$$], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([$uri$$], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function $goog$uri$utils$appendParamsFromMap$($uri$$, $map$$) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([$uri$$], $map$$))
};
goog.uri.utils.appendParam = function $goog$uri$utils$appendParam$($uri$$, $key$$, $value$$) {
  return goog.uri.utils.appendQueryData_([$uri$$, "&", $key$$, "=", goog.string.urlEncode($value$$)])
};
goog.uri.utils.findParam_ = function $goog$uri$utils$findParam_$($uri$$, $index$$58_startIndex$$, $keyEncoded$$, $hashOrEndIndex$$) {
  for(var $keyLength$$ = $keyEncoded$$.length;0 <= ($index$$58_startIndex$$ = $uri$$.indexOf($keyEncoded$$, $index$$58_startIndex$$)) && $index$$58_startIndex$$ < $hashOrEndIndex$$;) {
    var $followingChar_precedingChar$$ = $uri$$.charCodeAt($index$$58_startIndex$$ - 1);
    if($followingChar_precedingChar$$ == goog.uri.utils.CharCode_.AMPERSAND || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.QUESTION) {
      if($followingChar_precedingChar$$ = $uri$$.charCodeAt($index$$58_startIndex$$ + $keyLength$$), !$followingChar_precedingChar$$ || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.EQUAL || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.AMPERSAND || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.HASH) {
        return $index$$58_startIndex$$
      }
    }
    $index$$58_startIndex$$ += $keyLength$$ + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function $goog$uri$utils$hasParam$($uri$$, $keyEncoded$$) {
  return 0 <= goog.uri.utils.findParam_($uri$$, 0, $keyEncoded$$, $uri$$.search(goog.uri.utils.hashOrEndRe_))
};
goog.uri.utils.getParamValue = function $goog$uri$utils$getParamValue$($uri$$, $keyEncoded$$) {
  var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $foundIndex$$ = goog.uri.utils.findParam_($uri$$, 0, $keyEncoded$$, $hashOrEndIndex$$);
  if(0 > $foundIndex$$) {
    return null
  }
  var $endPosition$$ = $uri$$.indexOf("&", $foundIndex$$);
  if(0 > $endPosition$$ || $endPosition$$ > $hashOrEndIndex$$) {
    $endPosition$$ = $hashOrEndIndex$$
  }
  $foundIndex$$ += $keyEncoded$$.length + 1;
  return goog.string.urlDecode($uri$$.substr($foundIndex$$, $endPosition$$ - $foundIndex$$))
};
goog.uri.utils.getParamValues = function $goog$uri$utils$getParamValues$($uri$$, $keyEncoded$$) {
  for(var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $position$$ = 0, $foundIndex$$, $result$$ = [];0 <= ($foundIndex$$ = goog.uri.utils.findParam_($uri$$, $position$$, $keyEncoded$$, $hashOrEndIndex$$));) {
    $position$$ = $uri$$.indexOf("&", $foundIndex$$);
    if(0 > $position$$ || $position$$ > $hashOrEndIndex$$) {
      $position$$ = $hashOrEndIndex$$
    }
    $foundIndex$$ += $keyEncoded$$.length + 1;
    $result$$.push(goog.string.urlDecode($uri$$.substr($foundIndex$$, $position$$ - $foundIndex$$)))
  }
  return $result$$
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function $goog$uri$utils$removeParam$($uri$$, $keyEncoded$$) {
  for(var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $position$$ = 0, $foundIndex$$, $buffer$$ = [];0 <= ($foundIndex$$ = goog.uri.utils.findParam_($uri$$, $position$$, $keyEncoded$$, $hashOrEndIndex$$));) {
    $buffer$$.push($uri$$.substring($position$$, $foundIndex$$)), $position$$ = Math.min($uri$$.indexOf("&", $foundIndex$$) + 1 || $hashOrEndIndex$$, $hashOrEndIndex$$)
  }
  $buffer$$.push($uri$$.substr($position$$));
  return $buffer$$.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function $goog$uri$utils$setParam$($uri$$, $keyEncoded$$, $value$$) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam($uri$$, $keyEncoded$$), $keyEncoded$$, $value$$)
};
goog.uri.utils.appendPath = function $goog$uri$utils$appendPath$($baseUri$$, $path$$) {
  goog.uri.utils.assertNoFragmentsOrQueries_($baseUri$$);
  goog.string.endsWith($baseUri$$, "/") && ($baseUri$$ = $baseUri$$.substr(0, $baseUri$$.length - 1));
  goog.string.startsWith($path$$, "/") && ($path$$ = $path$$.substr(1));
  return goog.string.buildString($baseUri$$, "/", $path$$)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function $goog$uri$utils$makeUnique$($uri$$) {
  return goog.uri.utils.setParam($uri$$, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.net.XhrIo = function $goog$net$XhrIo$($opt_xmlHttpFactory$$) {
  goog.events.EventTarget.call(this);
  this.headers = new goog.structs.Map;
  this.xmlHttpFactory_ = $opt_xmlHttpFactory$$ || null
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?$/i;
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function $goog$net$XhrIo$send$($url$$, $opt_callback$$, $opt_method$$, $opt_content$$, $opt_headers$$, $opt_timeoutInterval$$) {
  var $x$$ = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push($x$$);
  $opt_callback$$ && goog.events.listen($x$$, goog.net.EventType.COMPLETE, $opt_callback$$);
  goog.events.listen($x$$, goog.net.EventType.READY, goog.partial(goog.net.XhrIo.cleanupSend_, $x$$));
  $opt_timeoutInterval$$ && $x$$.setTimeoutInterval($opt_timeoutInterval$$);
  $x$$.send($url$$, $opt_method$$, $opt_content$$, $opt_headers$$)
};
goog.net.XhrIo.cleanup = function $goog$net$XhrIo$cleanup$() {
  for(var $instances$$ = goog.net.XhrIo.sendInstances_;$instances$$.length;) {
    $instances$$.pop().dispose()
  }
};
goog.net.XhrIo.protectEntryPoints = function $goog$net$XhrIo$protectEntryPoints$($errorHandler$$) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = $errorHandler$$.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
};
goog.net.XhrIo.cleanupSend_ = function $goog$net$XhrIo$cleanupSend_$($XhrIo$$) {
  $XhrIo$$.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, $XhrIo$$)
};
goog.net.XhrIo.prototype.active_ = !1;
goog.net.XhrIo.prototype.xhr_ = null;
goog.net.XhrIo.prototype.xhrOptions_ = null;
goog.net.XhrIo.prototype.lastUri_ = "";
goog.net.XhrIo.prototype.lastMethod_ = "";
goog.net.XhrIo.prototype.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
goog.net.XhrIo.prototype.lastError_ = "";
goog.net.XhrIo.prototype.errorDispatched_ = !1;
goog.net.XhrIo.prototype.inSend_ = !1;
goog.net.XhrIo.prototype.inOpen_ = !1;
goog.net.XhrIo.prototype.inAbort_ = !1;
goog.net.XhrIo.prototype.timeoutInterval_ = 0;
goog.net.XhrIo.prototype.timeoutId_ = null;
goog.net.XhrIo.prototype.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
goog.net.XhrIo.prototype.withCredentials_ = !1;
goog.net.XhrIo.prototype.getTimeoutInterval = function $goog$net$XhrIo$$getTimeoutInterval$() {
  return this.timeoutInterval_
};
goog.net.XhrIo.prototype.setTimeoutInterval = function $goog$net$XhrIo$$setTimeoutInterval$($ms$$) {
  this.timeoutInterval_ = Math.max(0, $ms$$)
};
goog.net.XhrIo.prototype.setResponseType = function $goog$net$XhrIo$$setResponseType$($type$$) {
  this.responseType_ = $type$$
};
goog.net.XhrIo.prototype.getResponseType = function $goog$net$XhrIo$$getResponseType$() {
  return this.responseType_
};
goog.net.XhrIo.prototype.setWithCredentials = function $goog$net$XhrIo$$setWithCredentials$($withCredentials$$) {
  this.withCredentials_ = $withCredentials$$
};
goog.net.XhrIo.prototype.getWithCredentials = function $goog$net$XhrIo$$getWithCredentials$() {
  return this.withCredentials_
};
goog.net.XhrIo.prototype.send = function $goog$net$XhrIo$$send$($content$$9_url$$, $method$$3_opt_method$$, $opt_content$$, $contentIsFormData_opt_headers$$) {
  if(this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request");
  }
  $method$$3_opt_method$$ = $method$$3_opt_method$$ ? $method$$3_opt_method$$.toUpperCase() : "GET";
  this.lastUri_ = $content$$9_url$$;
  this.lastError_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastMethod_ = $method$$3_opt_method$$;
  this.errorDispatched_ = !1;
  this.active_ = !0;
  this.xhr_ = this.createXhr();
  this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  try {
    this.logger_.fine(this.formatMsg_("Opening Xhr")), this.inOpen_ = !0, this.xhr_.open($method$$3_opt_method$$, $content$$9_url$$, !0), this.inOpen_ = !1
  }catch($err$$) {
    this.logger_.fine(this.formatMsg_("Error opening Xhr: " + $err$$.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, $err$$);
    return
  }
  var $content$$9_url$$ = $opt_content$$ || "", $headers$$ = this.headers.clone();
  $contentIsFormData_opt_headers$$ && goog.structs.forEach($contentIsFormData_opt_headers$$, function($value$$, $key$$) {
    $headers$$.set($key$$, $value$$)
  });
  $contentIsFormData_opt_headers$$ = goog.global.FormData && $content$$9_url$$ instanceof goog.global.FormData;
  "POST" == $method$$3_opt_method$$ && (!$headers$$.containsKey(goog.net.XhrIo.CONTENT_TYPE_HEADER) && !$contentIsFormData_opt_headers$$) && $headers$$.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
  goog.structs.forEach($headers$$, function($value$$, $key$$) {
    this.xhr_.setRequestHeader($key$$, $value$$)
  }, this);
  this.responseType_ && (this.xhr_.responseType = this.responseType_);
  goog.object.containsKey(this.xhr_, "withCredentials") && (this.xhr_.withCredentials = this.withCredentials_);
  try {
    this.timeoutId_ && (goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_), this.timeoutId_ = null), 0 < this.timeoutInterval_ && (this.logger_.fine(this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete")), this.timeoutId_ = goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.timeout_, this), this.timeoutInterval_)), this.logger_.fine(this.formatMsg_("Sending request")), this.inSend_ = !0, this.xhr_.send($content$$9_url$$), this.inSend_ = !1
  }catch($err$$0$$) {
    this.logger_.fine(this.formatMsg_("Send error: " + $err$$0$$.message)), this.error_(goog.net.ErrorCode.EXCEPTION, $err$$0$$)
  }
};
goog.net.XhrIo.prototype.createXhr = function $goog$net$XhrIo$$createXhr$() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp()
};
goog.net.XhrIo.prototype.timeout_ = function $goog$net$XhrIo$$timeout_$() {
  "undefined" != typeof goog && this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting", this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT, this.logger_.fine(this.formatMsg_(this.lastError_)), this.dispatchEvent(goog.net.EventType.TIMEOUT), this.abort(goog.net.ErrorCode.TIMEOUT))
};
goog.net.XhrIo.prototype.error_ = function $goog$net$XhrIo$$error_$($errorCode$$, $err$$) {
  this.active_ = !1;
  this.xhr_ && (this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1);
  this.lastError_ = $err$$;
  this.lastErrorCode_ = $errorCode$$;
  this.dispatchErrors_();
  this.cleanUpXhr_()
};
goog.net.XhrIo.prototype.dispatchErrors_ = function $goog$net$XhrIo$$dispatchErrors_$() {
  this.errorDispatched_ || (this.errorDispatched_ = !0, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ERROR))
};
goog.net.XhrIo.prototype.abort = function $goog$net$XhrIo$$abort$($opt_failureCode$$) {
  this.xhr_ && this.active_ && (this.logger_.fine(this.formatMsg_("Aborting")), this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1, this.lastErrorCode_ = $opt_failureCode$$ || goog.net.ErrorCode.ABORT, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ABORT), this.cleanUpXhr_())
};
goog.net.XhrIo.prototype.disposeInternal = function $goog$net$XhrIo$$disposeInternal$() {
  this.xhr_ && (this.active_ && (this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1), this.cleanUpXhr_(!0));
  goog.net.XhrIo.superClass_.disposeInternal.call(this)
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function $goog$net$XhrIo$$onReadyStateChange_$() {
  if(!this.inOpen_ && !this.inSend_ && !this.inAbort_) {
    this.onReadyStateChangeEntryPoint_()
  }else {
    this.onReadyStateChangeHelper_()
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function $goog$net$XhrIo$$onReadyStateChangeEntryPoint_$() {
  this.onReadyStateChangeHelper_()
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function $goog$net$XhrIo$$onReadyStateChangeHelper_$() {
  if(this.active_ && "undefined" != typeof goog) {
    if(this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && 2 == this.getStatus()) {
      this.logger_.fine(this.formatMsg_("Local request error detected and ignored"))
    }else {
      if(this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.onReadyStateChange_, this), 0)
      }else {
        if(this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE), this.isComplete()) {
          this.logger_.fine(this.formatMsg_("Request complete"));
          this.active_ = !1;
          try {
            this.isSuccess() ? (this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.SUCCESS)) : (this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR, this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]", this.dispatchErrors_())
          }finally {
            this.cleanUpXhr_()
          }
        }
      }
    }
  }
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function $goog$net$XhrIo$$cleanUpXhr_$($opt_fromDispose$$) {
  if(this.xhr_) {
    var $xhr$$ = this.xhr_, $clearedOnReadyStateChange$$ = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhrOptions_ = this.xhr_ = null;
    this.timeoutId_ && (goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_), this.timeoutId_ = null);
    $opt_fromDispose$$ || this.dispatchEvent(goog.net.EventType.READY);
    try {
      $xhr$$.onreadystatechange = $clearedOnReadyStateChange$$
    }catch($e$$) {
      this.logger_.severe("Problem encountered resetting onreadystatechange: " + $e$$.message)
    }
  }
};
goog.net.XhrIo.prototype.isActive = function $goog$net$XhrIo$$isActive$() {
  return!!this.xhr_
};
goog.net.XhrIo.prototype.isComplete = function $goog$net$XhrIo$$isComplete$() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE
};
goog.net.XhrIo.prototype.isSuccess = function $goog$net$XhrIo$$isSuccess$() {
  var $status$$ = this.getStatus();
  return goog.net.HttpStatus.isSuccess($status$$) || 0 === $status$$ && !this.isLastUriEffectiveSchemeHttp_()
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function $goog$net$XhrIo$$isLastUriEffectiveSchemeHttp_$() {
  var $scheme$$ = goog.uri.utils.getEffectiveScheme(String(this.lastUri_));
  return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test($scheme$$)
};
goog.net.XhrIo.prototype.getReadyState = function $goog$net$XhrIo$$getReadyState$() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED
};
goog.net.XhrIo.prototype.getStatus = function $goog$net$XhrIo$$getStatus$() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1
  }catch($e$$) {
    return this.logger_.warning("Can not get status: " + $e$$.message), -1
  }
};
goog.net.XhrIo.prototype.getStatusText = function $goog$net$XhrIo$$getStatusText$() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : ""
  }catch($e$$) {
    return this.logger_.fine("Can not get status: " + $e$$.message), ""
  }
};
goog.net.XhrIo.prototype.getLastUri = function $goog$net$XhrIo$$getLastUri$() {
  return String(this.lastUri_)
};
goog.net.XhrIo.prototype.getResponseText = function $goog$net$XhrIo$$getResponseText$() {
  try {
    return this.xhr_ ? this.xhr_.responseText : ""
  }catch($e$$) {
    return this.logger_.fine("Can not get responseText: " + $e$$.message), ""
  }
};
goog.net.XhrIo.prototype.getResponseXml = function $goog$net$XhrIo$$getResponseXml$() {
  try {
    return this.xhr_ ? this.xhr_.responseXML : null
  }catch($e$$) {
    return this.logger_.fine("Can not get responseXML: " + $e$$.message), null
  }
};
goog.net.XhrIo.prototype.getResponseJson = function $goog$net$XhrIo$$getResponseJson$($opt_xssiPrefix$$) {
  if(this.xhr_) {
    var $responseText$$ = this.xhr_.responseText;
    $opt_xssiPrefix$$ && 0 == $responseText$$.indexOf($opt_xssiPrefix$$) && ($responseText$$ = $responseText$$.substring($opt_xssiPrefix$$.length));
    return goog.json.parse($responseText$$)
  }
};
goog.net.XhrIo.prototype.getResponse = function $goog$net$XhrIo$$getResponse$() {
  try {
    if(!this.xhr_) {
      return null
    }
    if("response" in this.xhr_) {
      return this.xhr_.response
    }
    switch(this.responseType_) {
      case goog.net.XhrIo.ResponseType.DEFAULT:
      ;
      case goog.net.XhrIo.ResponseType.TEXT:
        return this.xhr_.responseText;
      case goog.net.XhrIo.ResponseType.ARRAY_BUFFER:
        if("mozResponseArrayBuffer" in this.xhr_) {
          return this.xhr_.mozResponseArrayBuffer
        }
    }
    this.logger_.severe("Response type " + this.responseType_ + " is not supported on this browser");
    return null
  }catch($e$$) {
    return this.logger_.fine("Can not get response: " + $e$$.message), null
  }
};
goog.net.XhrIo.prototype.getResponseHeader = function $goog$net$XhrIo$$getResponseHeader$($key$$) {
  return this.xhr_ && this.isComplete() ? this.xhr_.getResponseHeader($key$$) : void 0
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function $goog$net$XhrIo$$getAllResponseHeaders$() {
  return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : ""
};
goog.net.XhrIo.prototype.getLastErrorCode = function $goog$net$XhrIo$$getLastErrorCode$() {
  return this.lastErrorCode_
};
goog.net.XhrIo.prototype.getLastError = function $goog$net$XhrIo$$getLastError$() {
  return goog.isString(this.lastError_) ? this.lastError_ : String(this.lastError_)
};
goog.net.XhrIo.prototype.formatMsg_ = function $goog$net$XhrIo$$formatMsg_$($msg$$) {
  return $msg$$ + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
};
goog.debug.entryPointRegistry.register(function($transformer$$) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = $transformer$$(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
});
vgps3.track.Track = function $vgps3$track$Track$() {
  this.map_ = this.vgps_ = null;
  this.tracks_ = {};
  this.dateControlDom_ = this.infoControl_ = this.currentTrackIndex_ = null
};
vgps3.track.Track.prototype.init = function $vgps3$track$Track$$init$($vgps$$) {
  this.vgps_ = $vgps$$;
  this.map_ = $vgps$$.getGoogleMap();
  google.maps.event.addListener(this.map_, "click", goog.bind(this.onMapClick_, this))
};
vgps3.track.Track.prototype.load = function $vgps3$track$Track$$load$($url$$) {
  goog.net.XhrIo.send(vgps3.track.PROXY_URL + $url$$, goog.bind(this.afterTrackLoad_, this, $url$$))
};
vgps3.track.Track.prototype.moveTo = function $vgps3$track$Track$$moveTo$($position$$, $setCenter$$) {
  var $position$$ = Math.max(Math.min($position$$, 1), 0), $track$$ = this.tracks_[this.currentTrackIndex_], $pointIndex$$ = Math.round($position$$ * ($track$$.trackData.nbTrackPt - 1)), $chartIndex$$ = Math.round($position$$ * ($track$$.trackData.nbChartPt - 1));
  this.updateInfoControl_(this.currentTrackIndex_, $chartIndex$$);
  $track$$.marker.setPosition($track$$.points[$pointIndex$$]);
  $setCenter$$ && this.map_.setCenter($track$$.points[$pointIndex$$])
};
vgps3.track.Track.prototype.afterTrackLoad_ = function $vgps3$track$Track$$afterTrackLoad_$($url$$, $event$$) {
  var $track$$4_xhr$$ = $event$$.target;
  $track$$4_xhr$$.isSuccess() && ($track$$4_xhr$$ = $track$$4_xhr$$.getResponseJson(), goog.isDef($track$$4_xhr$$) && this.addTrack_($url$$, $track$$4_xhr$$))
};
vgps3.track.Track.prototype.addTrack_ = function $vgps3$track$Track$$addTrack_$($url$$, $track$$) {
  var $data$$40_point$$, $bounds$$ = new google.maps.LatLngBounds;
  this.currentTrackIndex_ || (this.currentTrackIndex_ = $url$$);
  this.tracks_[$url$$] = {points:[], trackData:$track$$};
  for(var $i$$ = 0;$i$$ < $track$$.nbTrackPt;$i$$++) {
    $data$$40_point$$ = new google.maps.LatLng($track$$.lat[$i$$], $track$$.lon[$i$$]), this.tracks_[$url$$].points.push($data$$40_point$$), $bounds$$.extend($data$$40_point$$)
  }
  for($i$$ = 0;$i$$ < $track$$.nbChartPoint;$i$$++) {
    $track$$.elev[$i$$] = Math.min(vgps3.track.MAX_ELEV, $track$$.elev[$i$$]), $track$$.speed[$i$$] = Math.min(vgps3.track.MAX_SPEED, $track$$.speed[$i$$]), $track$$.vario[$i$$] = Math.min(vgps3.track.MAX_VARIO, $track$$.vario[$i$$])
  }
  this.tracks_[$url$$].bounds = $bounds$$;
  this.tracks_[$url$$].polyline = new google.maps.Polyline({clickable:!1, map:this.map_, path:this.tracks_[$url$$].points, strokeColor:"#ff0000", strokeWeight:2});
  this.tracks_[$url$$].marker = new google.maps.Marker({position:new google.maps.LatLng($track$$.lat[0], $track$$.lon[0]), map:this.map_, clickable:!1});
  this.map_.fitBounds(this.getTracksBounds_());
  this.infoControl_ || (this.infoControl_ = new vgps3.track.InfoControl(this.map_, google.maps.ControlPosition.RIGHT_BOTTOM), this.updateInfoControl_($url$$, 0));
  this.dateControlDom_ || (this.dateControlDom_ = goog.dom.createDom("div", "map-ctrl"), $data$$40_point$$ = {date:[$track$$.date.day, $track$$.date.month, $track$$.date.year].join("/")}, $track$$.pilot && ($data$$40_point$$.pilot = $track$$.pilot), goog.soy.renderElement(this.dateControlDom_, vgps3.track.templates.dateControl, {data:$data$$40_point$$}), this.map_.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.dateControlDom_));
  this.vgps_.dispatchEvent(new vgps3.track.LoadEvent($track$$))
};
vgps3.track.Track.prototype.getTracksBounds_ = function $vgps3$track$Track$$getTracksBounds_$() {
  var $bounds$$ = new google.maps.LatLngBounds;
  goog.object.forEach(this.tracks_, function($track$$) {
    $bounds$$.union($track$$.bounds)
  });
  return $bounds$$
};
vgps3.track.Track.prototype.click = function $vgps3$track$Track$$click$($latlng$$) {
  var $trackIndex$$, $pointIndex$$, $position$$, $currentDistance$$, $distance$$ = Number.MAX_VALUE;
  goog.object.forEach(this.tracks_, function($track$$, $trackIdx$$) {
    goog.array.forEach($track$$.points, function($point$$, $pointIdx$$) {
      $currentDistance$$ = google.maps.geometry.spherical.computeDistanceBetween($latlng$$, $point$$);
      $currentDistance$$ < $distance$$ && ($distance$$ = $currentDistance$$, $position$$ = $point$$, $trackIndex$$ = $trackIdx$$, $pointIndex$$ = $pointIdx$$)
    })
  });
  if($position$$) {
    var $track$$0$$ = this.tracks_[$trackIndex$$], $chartIndex$$ = Math.round($pointIndex$$ / ($track$$0$$.trackData.nbTrackPt - 1) * ($track$$0$$.trackData.nbChartPt - 1));
    $track$$0$$.marker.setPosition($position$$);
    this.updateInfoControl_($trackIndex$$, $chartIndex$$);
    this.vgps_.dispatchEvent(new vgps3.track.ClickEvent($track$$0$$.trackData, $pointIndex$$ / ($track$$0$$.trackData.nbTrackPt - 1)))
  }
};
vgps3.track.Track.prototype.onMapClick_ = function $vgps3$track$Track$$onMapClick_$($event$$) {
  this.click($event$$.latLng)
};
vgps3.track.Track.prototype.updateInfoControl_ = function $vgps3$track$Track$$updateInfoControl_$($trackIndex$$, $chartIndex$$) {
  if($trackIndex$$) {
    var $trackData$$ = this.tracks_[$trackIndex$$].trackData;
    this.infoControl_.setInfo({elev:$trackData$$.elev[$chartIndex$$], elevGnd:$trackData$$.elevGnd[$chartIndex$$], vario:$trackData$$.vario[$chartIndex$$], speed:$trackData$$.speed[$chartIndex$$], hour:$trackData$$.time.hour[$chartIndex$$], min:$trackData$$.time.min[$chartIndex$$], sec:$trackData$$.time.sec[$chartIndex$$]})
  }
};
vgps3.track.EventType = {CLICK:"vgps3.track.click", LOAD:"vgps3.track.load"};
vgps3.track.PROXY_URL = "tests/fixtures/track.json?track=";
vgps3.track.MAX_SPEED = 100;
vgps3.track.MAX_VARIO = 15;
vgps3.track.MAX_ELEV = 9E3;
vgps3.chart = {};
vgps3.chart.Overlays = function $vgps3$chart$Overlays$($opt_domHelper$$) {
  goog.ui.Component.call(this, $opt_domHelper$$);
  this.layers_ = []
};
goog.inherits(vgps3.chart.Overlays, goog.ui.Component);
vgps3.chart.Overlays.prototype.addLayer = function $vgps3$chart$Overlays$$addLayer$() {
  if(!this.isInDocument()) {
    throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
  }
  var $el$$ = this.getDomHelper().createDom("div", "vgps3-chart-overlay");
  goog.style.setOpacity($el$$, 0 < this.layers_.length ? 0.3 : 0.9);
  goog.style.setStyle($el$$, "zIndex", 100 - this.layers_.length);
  goog.dom.appendChild(this.getElement(), $el$$);
  this.layers_.push($el$$);
  return $el$$
};
vgps3.chart.Overlays.prototype.moveTo = function $vgps3$chart$Overlays$$moveTo$($position$$) {
  var $width$$ = goog.style.getSize(this.getElement()).width;
  goog.style.setPosition(this.cursor_, Math.round($width$$ * $position$$))
};
vgps3.chart.Overlays.prototype.getPosition = function $vgps3$chart$Overlays$$getPosition$() {
  var $width$$ = goog.style.getSize(this.getElement()).width;
  return goog.style.getPosition(this.cursor_).x / $width$$
};
vgps3.chart.Overlays.prototype.createDom = function $vgps3$chart$Overlays$$createDom$() {
  this.element_ = this.dom_.createElement("div");
  goog.style.setStyle(this.element_, {width:"100%", height:"100%"})
};
vgps3.chart.Overlays.prototype.canDecorate = function $vgps3$chart$Overlays$$canDecorate$() {
  return!1
};
vgps3.chart.Overlays.prototype.enterDocument = function $vgps3$chart$Overlays$$enterDocument$() {
  vgps3.chart.Overlays.superClass_.enterDocument.call(this);
  this.cursor_ = this.getDomHelper().createDom("div", "vgps3-chart-cursor");
  this.getElement().appendChild(this.cursor_);
  this.getHandler().listen(this.getElement(), [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEMOVE], this.handleMouseEvents_)
};
vgps3.chart.Overlays.prototype.handleMouseEvents_ = function $vgps3$chart$Overlays$$handleMouseEvents_$($event$$) {
  var $position$$10_width$$ = goog.style.getSize(this.getElement()).width, $position$$10_width$$ = ($event$$.clientX - goog.style.getPosition(this.getElement()).x) / $position$$10_width$$;
  $event$$.preventDefault();
  this.moveTo($position$$10_width$$)
};
vgps3.chart.Overlays.prototype.exitDocument = function $vgps3$chart$Overlays$$exitDocument$() {
  vgps3.chart.Overlays.superClass_.exitDocument.call(this)
};
vgps3.chart.Overlays.prototype.disposeInternal = function $vgps3$chart$Overlays$$disposeInternal$() {
  var $overlays$$ = this;
  delete this.cursor_;
  goog.array.forEach(this.layers_, function($el$$, $index$$) {
    delete $overlays$$.layers_[$index$$]
  })
};
goog.events.KeyHandler = function $goog$events$KeyHandler$($opt_element$$, $opt_capture$$) {
  goog.events.EventTarget.call(this);
  $opt_element$$ && this.attach($opt_element$$, $opt_capture$$)
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ = -1;
goog.events.KeyHandler.prototype.keyCode_ = -1;
goog.events.KeyHandler.prototype.altKey_ = !1;
goog.events.KeyHandler.EventType = {KEY:"key"};
goog.events.KeyHandler.safariKey_ = {3:goog.events.KeyCodes.ENTER, 12:goog.events.KeyCodes.NUMLOCK, 63232:goog.events.KeyCodes.UP, 63233:goog.events.KeyCodes.DOWN, 63234:goog.events.KeyCodes.LEFT, 63235:goog.events.KeyCodes.RIGHT, 63236:goog.events.KeyCodes.F1, 63237:goog.events.KeyCodes.F2, 63238:goog.events.KeyCodes.F3, 63239:goog.events.KeyCodes.F4, 63240:goog.events.KeyCodes.F5, 63241:goog.events.KeyCodes.F6, 63242:goog.events.KeyCodes.F7, 63243:goog.events.KeyCodes.F8, 63244:goog.events.KeyCodes.F9, 
63245:goog.events.KeyCodes.F10, 63246:goog.events.KeyCodes.F11, 63247:goog.events.KeyCodes.F12, 63248:goog.events.KeyCodes.PRINT_SCREEN, 63272:goog.events.KeyCodes.DELETE, 63273:goog.events.KeyCodes.HOME, 63275:goog.events.KeyCodes.END, 63276:goog.events.KeyCodes.PAGE_UP, 63277:goog.events.KeyCodes.PAGE_DOWN, 63289:goog.events.KeyCodes.NUMLOCK, 63302:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_ = {Up:goog.events.KeyCodes.UP, Down:goog.events.KeyCodes.DOWN, Left:goog.events.KeyCodes.LEFT, Right:goog.events.KeyCodes.RIGHT, Enter:goog.events.KeyCodes.ENTER, F1:goog.events.KeyCodes.F1, F2:goog.events.KeyCodes.F2, F3:goog.events.KeyCodes.F3, F4:goog.events.KeyCodes.F4, F5:goog.events.KeyCodes.F5, F6:goog.events.KeyCodes.F6, F7:goog.events.KeyCodes.F7, F8:goog.events.KeyCodes.F8, F9:goog.events.KeyCodes.F9, F10:goog.events.KeyCodes.F10, F11:goog.events.KeyCodes.F11, 
F12:goog.events.KeyCodes.F12, "U+007F":goog.events.KeyCodes.DELETE, Home:goog.events.KeyCodes.HOME, End:goog.events.KeyCodes.END, PageUp:goog.events.KeyCodes.PAGE_UP, PageDown:goog.events.KeyCodes.PAGE_DOWN, Insert:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525");
goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_ = function $goog$events$KeyHandler$$handleKeyDown_$($e$$) {
  if(goog.userAgent.WEBKIT && (this.lastKey_ == goog.events.KeyCodes.CTRL && !$e$$.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !$e$$.altKey)) {
    this.keyCode_ = this.lastKey_ = -1
  }
  goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent($e$$.keyCode, this.lastKey_, $e$$.shiftKey, $e$$.ctrlKey, $e$$.altKey) ? this.handleEvent($e$$) : (this.keyCode_ = goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode($e$$.keyCode) : $e$$.keyCode, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = $e$$.altKey))
};
goog.events.KeyHandler.prototype.handleKeyup_ = function $goog$events$KeyHandler$$handleKeyup_$($e$$) {
  this.keyCode_ = this.lastKey_ = -1;
  this.altKey_ = $e$$.altKey
};
goog.events.KeyHandler.prototype.handleEvent = function $goog$events$KeyHandler$$handleEvent$($e$$) {
  var $be$$3_event$$ = $e$$.getBrowserEvent(), $keyCode$$, $charCode$$, $altKey$$ = $be$$3_event$$.altKey;
  goog.userAgent.IE && $e$$.type == goog.events.EventType.KEYPRESS ? ($keyCode$$ = this.keyCode_, $charCode$$ = $keyCode$$ != goog.events.KeyCodes.ENTER && $keyCode$$ != goog.events.KeyCodes.ESC ? $be$$3_event$$.keyCode : 0) : goog.userAgent.WEBKIT && $e$$.type == goog.events.EventType.KEYPRESS ? ($keyCode$$ = this.keyCode_, $charCode$$ = 0 <= $be$$3_event$$.charCode && 63232 > $be$$3_event$$.charCode && goog.events.KeyCodes.isCharacterKey($keyCode$$) ? $be$$3_event$$.charCode : 0) : goog.userAgent.OPERA ? 
  ($keyCode$$ = this.keyCode_, $charCode$$ = goog.events.KeyCodes.isCharacterKey($keyCode$$) ? $be$$3_event$$.keyCode : 0) : ($keyCode$$ = $be$$3_event$$.keyCode || this.keyCode_, $charCode$$ = $be$$3_event$$.charCode || 0, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && ($altKey$$ = this.altKey_), goog.userAgent.MAC && ($charCode$$ == goog.events.KeyCodes.QUESTION_MARK && $keyCode$$ == goog.events.KeyCodes.WIN_KEY) && ($keyCode$$ = goog.events.KeyCodes.SLASH));
  var $key$$ = $keyCode$$, $keyIdentifier$$ = $be$$3_event$$.keyIdentifier;
  $keyCode$$ ? 63232 <= $keyCode$$ && $keyCode$$ in goog.events.KeyHandler.safariKey_ ? $key$$ = goog.events.KeyHandler.safariKey_[$keyCode$$] : 25 == $keyCode$$ && $e$$.shiftKey && ($key$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in goog.events.KeyHandler.keyIdentifier_ && ($key$$ = goog.events.KeyHandler.keyIdentifier_[$keyIdentifier$$]);
  $e$$ = $key$$ == this.lastKey_;
  this.lastKey_ = $key$$;
  $be$$3_event$$ = new goog.events.KeyEvent($key$$, $charCode$$, $e$$, $be$$3_event$$);
  $be$$3_event$$.altKey = $altKey$$;
  this.dispatchEvent($be$$3_event$$)
};
goog.events.KeyHandler.prototype.getElement = function $goog$events$KeyHandler$$getElement$() {
  return this.element_
};
goog.events.KeyHandler.prototype.attach = function $goog$events$KeyHandler$$attach$($element$$, $opt_capture$$) {
  this.keyUpKey_ && this.detach();
  this.element_ = $element$$;
  this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, $opt_capture$$);
  this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, $opt_capture$$, this);
  this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, $opt_capture$$, this)
};
goog.events.KeyHandler.prototype.detach = function $goog$events$KeyHandler$$detach$() {
  this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null);
  this.element_ = null;
  this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.disposeInternal = function $goog$events$KeyHandler$$disposeInternal$() {
  goog.events.KeyHandler.superClass_.disposeInternal.call(this);
  this.detach()
};
goog.events.KeyEvent = function $goog$events$KeyEvent$($keyCode$$, $charCode$$, $repeat$$, $browserEvent$$) {
  goog.events.BrowserEvent.call(this, $browserEvent$$);
  this.type = goog.events.KeyHandler.EventType.KEY;
  this.keyCode = $keyCode$$;
  this.charCode = $charCode$$;
  this.repeat = $repeat$$
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
goog.events.MouseWheelHandler = function $goog$events$MouseWheelHandler$($element$$) {
  goog.events.EventTarget.call(this);
  this.element_ = $element$$;
  $element$$ = goog.dom.isElement(this.element_) ? this.element_ : this.element_ ? this.element_.body : null;
  this.isRtl_ = !!$element$$ && goog.style.isRightToLeft($element$$);
  this.listenKey_ = goog.events.listen(this.element_, goog.userAgent.GECKO ? "DOMMouseScroll" : "mousewheel", this)
};
goog.inherits(goog.events.MouseWheelHandler, goog.events.EventTarget);
goog.events.MouseWheelHandler.EventType = {MOUSEWHEEL:"mousewheel"};
goog.events.MouseWheelHandler.prototype.setMaxDeltaX = function $goog$events$MouseWheelHandler$$setMaxDeltaX$($maxDeltaX$$) {
  this.maxDeltaX_ = $maxDeltaX$$
};
goog.events.MouseWheelHandler.prototype.setMaxDeltaY = function $goog$events$MouseWheelHandler$$setMaxDeltaY$($maxDeltaY$$) {
  this.maxDeltaY_ = $maxDeltaY$$
};
goog.events.MouseWheelHandler.prototype.handleEvent = function $goog$events$MouseWheelHandler$$handleEvent$($be$$4_e$$) {
  var $deltaX_newEvent$$ = 0, $deltaY_wheelDeltaScaleFactor$$ = 0, $detail$$ = 0, $be$$4_e$$ = $be$$4_e$$.getBrowserEvent();
  if("mousewheel" == $be$$4_e$$.type) {
    $deltaY_wheelDeltaScaleFactor$$ = 1;
    if(goog.userAgent.IE || goog.userAgent.WEBKIT && (goog.userAgent.WINDOWS || goog.userAgent.isVersion("532.0"))) {
      $deltaY_wheelDeltaScaleFactor$$ = 40
    }
    $detail$$ = goog.events.MouseWheelHandler.smartScale_(-$be$$4_e$$.wheelDelta, $deltaY_wheelDeltaScaleFactor$$);
    goog.isDef($be$$4_e$$.wheelDeltaX) ? ($deltaX_newEvent$$ = goog.events.MouseWheelHandler.smartScale_(-$be$$4_e$$.wheelDeltaX, $deltaY_wheelDeltaScaleFactor$$), $deltaY_wheelDeltaScaleFactor$$ = goog.events.MouseWheelHandler.smartScale_(-$be$$4_e$$.wheelDeltaY, $deltaY_wheelDeltaScaleFactor$$)) : $deltaY_wheelDeltaScaleFactor$$ = $detail$$
  }else {
    $detail$$ = $be$$4_e$$.detail, 100 < $detail$$ ? $detail$$ = 3 : -100 > $detail$$ && ($detail$$ = -3), goog.isDef($be$$4_e$$.axis) && $be$$4_e$$.axis === $be$$4_e$$.HORIZONTAL_AXIS ? $deltaX_newEvent$$ = $detail$$ : $deltaY_wheelDeltaScaleFactor$$ = $detail$$
  }
  goog.isNumber(this.maxDeltaX_) && ($deltaX_newEvent$$ = goog.math.clamp($deltaX_newEvent$$, -this.maxDeltaX_, this.maxDeltaX_));
  goog.isNumber(this.maxDeltaY_) && ($deltaY_wheelDeltaScaleFactor$$ = goog.math.clamp($deltaY_wheelDeltaScaleFactor$$, -this.maxDeltaY_, this.maxDeltaY_));
  this.isRtl_ && ($deltaX_newEvent$$ = -$deltaX_newEvent$$);
  $deltaX_newEvent$$ = new goog.events.MouseWheelEvent($detail$$, $be$$4_e$$, $deltaX_newEvent$$, $deltaY_wheelDeltaScaleFactor$$);
  this.dispatchEvent($deltaX_newEvent$$)
};
goog.events.MouseWheelHandler.smartScale_ = function $goog$events$MouseWheelHandler$smartScale_$($mouseWheelDelta$$, $scaleFactor$$) {
  return goog.userAgent.WEBKIT && (goog.userAgent.MAC || goog.userAgent.LINUX) && 0 != $mouseWheelDelta$$ % $scaleFactor$$ ? $mouseWheelDelta$$ : $mouseWheelDelta$$ / $scaleFactor$$
};
goog.events.MouseWheelHandler.prototype.disposeInternal = function $goog$events$MouseWheelHandler$$disposeInternal$() {
  goog.events.MouseWheelHandler.superClass_.disposeInternal.call(this);
  goog.events.unlistenByKey(this.listenKey_);
  delete this.listenKey_
};
goog.events.MouseWheelEvent = function $goog$events$MouseWheelEvent$($detail$$, $browserEvent$$, $deltaX$$, $deltaY$$) {
  goog.events.BrowserEvent.call(this, $browserEvent$$);
  this.type = goog.events.MouseWheelHandler.EventType.MOUSEWHEEL;
  this.detail = $detail$$;
  this.deltaX = $deltaX$$;
  this.deltaY = $deltaY$$
};
goog.inherits(goog.events.MouseWheelEvent, goog.events.BrowserEvent);
goog.fx.TransitionBase = function $goog$fx$TransitionBase$() {
  goog.events.EventTarget.call(this);
  this.state_ = goog.fx.TransitionBase.State.STOPPED;
  this.endTime = this.startTime = null
};
goog.inherits(goog.fx.TransitionBase, goog.events.EventTarget);
goog.fx.TransitionBase.State = {STOPPED:0, PAUSED:-1, PLAYING:1};
goog.fx.TransitionBase.prototype.getStateInternal = function $goog$fx$TransitionBase$$getStateInternal$() {
  return this.state_
};
goog.fx.TransitionBase.prototype.setStatePlaying = function $goog$fx$TransitionBase$$setStatePlaying$() {
  this.state_ = goog.fx.TransitionBase.State.PLAYING
};
goog.fx.TransitionBase.prototype.setStatePaused = function $goog$fx$TransitionBase$$setStatePaused$() {
  this.state_ = goog.fx.TransitionBase.State.PAUSED
};
goog.fx.TransitionBase.prototype.setStateStopped = function $goog$fx$TransitionBase$$setStateStopped$() {
  this.state_ = goog.fx.TransitionBase.State.STOPPED
};
goog.fx.TransitionBase.prototype.isPlaying = function $goog$fx$TransitionBase$$isPlaying$() {
  return this.state_ == goog.fx.TransitionBase.State.PLAYING
};
goog.fx.TransitionBase.prototype.isPaused = function $goog$fx$TransitionBase$$isPaused$() {
  return this.state_ == goog.fx.TransitionBase.State.PAUSED
};
goog.fx.TransitionBase.prototype.isStopped = function $goog$fx$TransitionBase$$isStopped$() {
  return this.state_ == goog.fx.TransitionBase.State.STOPPED
};
goog.fx.TransitionBase.prototype.onBegin = function $goog$fx$TransitionBase$$onBegin$() {
  this.dispatchAnimationEvent(goog.fx.Transition.EventType.BEGIN)
};
goog.fx.TransitionBase.prototype.onEnd = function $goog$fx$TransitionBase$$onEnd$() {
  this.dispatchAnimationEvent(goog.fx.Transition.EventType.END)
};
goog.fx.TransitionBase.prototype.onFinish = function $goog$fx$TransitionBase$$onFinish$() {
  this.dispatchAnimationEvent(goog.fx.Transition.EventType.FINISH)
};
goog.fx.TransitionBase.prototype.onPause = function $goog$fx$TransitionBase$$onPause$() {
  this.dispatchAnimationEvent(goog.fx.Transition.EventType.PAUSE)
};
goog.fx.TransitionBase.prototype.onPlay = function $goog$fx$TransitionBase$$onPlay$() {
  this.dispatchAnimationEvent(goog.fx.Transition.EventType.PLAY)
};
goog.fx.TransitionBase.prototype.onResume = function $goog$fx$TransitionBase$$onResume$() {
  this.dispatchAnimationEvent(goog.fx.Transition.EventType.RESUME)
};
goog.fx.TransitionBase.prototype.onStop = function $goog$fx$TransitionBase$$onStop$() {
  this.dispatchAnimationEvent(goog.fx.Transition.EventType.STOP)
};
goog.fx.TransitionBase.prototype.dispatchAnimationEvent = function $goog$fx$TransitionBase$$dispatchAnimationEvent$($type$$) {
  this.dispatchEvent($type$$)
};
goog.fx.AnimationQueue = function $goog$fx$AnimationQueue$() {
  goog.fx.TransitionBase.call(this);
  this.queue = []
};
goog.inherits(goog.fx.AnimationQueue, goog.fx.TransitionBase);
goog.fx.AnimationQueue.prototype.add = function $goog$fx$AnimationQueue$$add$($animation$$) {
  goog.asserts.assert(this.isStopped(), "Not allowed to add animations to a running animation queue.");
  goog.array.contains(this.queue, $animation$$) || (this.queue.push($animation$$), goog.events.listen($animation$$, goog.fx.Transition.EventType.FINISH, this.onAnimationFinish, !1, this))
};
goog.fx.AnimationQueue.prototype.remove = function $goog$fx$AnimationQueue$$remove$($animation$$) {
  goog.asserts.assert(this.isStopped(), "Not allowed to remove animations from a running animation queue.");
  goog.array.remove(this.queue, $animation$$) && goog.events.unlisten($animation$$, goog.fx.Transition.EventType.FINISH, this.onAnimationFinish, !1, this)
};
goog.fx.AnimationQueue.prototype.disposeInternal = function $goog$fx$AnimationQueue$$disposeInternal$() {
  goog.array.forEach(this.queue, function($animation$$) {
    $animation$$.dispose()
  });
  this.queue.length = 0;
  goog.fx.AnimationQueue.superClass_.disposeInternal.call(this)
};
goog.fx.AnimationParallelQueue = function $goog$fx$AnimationParallelQueue$() {
  goog.fx.AnimationQueue.call(this);
  this.finishedCounter_ = 0
};
goog.inherits(goog.fx.AnimationParallelQueue, goog.fx.AnimationQueue);
goog.fx.AnimationParallelQueue.prototype.play = function $goog$fx$AnimationParallelQueue$$play$($opt_restart$$) {
  if(0 == this.queue.length) {
    return!1
  }
  if($opt_restart$$ || this.isStopped()) {
    this.finishedCounter_ = 0, this.onBegin()
  }else {
    if(this.isPlaying()) {
      return!1
    }
  }
  this.onPlay();
  if(this.isPaused()) {
    this.onResume()
  }
  var $resuming$$ = this.isPaused() && !$opt_restart$$;
  this.startTime = goog.now();
  this.endTime = null;
  this.setStatePlaying();
  goog.array.forEach(this.queue, function($anim$$) {
    (!$resuming$$ || $anim$$.isPaused()) && $anim$$.play($opt_restart$$)
  });
  return!0
};
goog.fx.AnimationParallelQueue.prototype.pause = function $goog$fx$AnimationParallelQueue$$pause$() {
  this.isPlaying() && (goog.array.forEach(this.queue, function($anim$$) {
    $anim$$.isPlaying() && $anim$$.pause()
  }), this.setStatePaused(), this.onPause())
};
goog.fx.AnimationParallelQueue.prototype.stop = function $goog$fx$AnimationParallelQueue$$stop$($opt_gotoEnd$$) {
  goog.array.forEach(this.queue, function($anim$$) {
    $anim$$.isStopped() || $anim$$.stop($opt_gotoEnd$$)
  });
  this.setStateStopped();
  this.endTime = goog.now();
  this.onStop();
  this.onEnd()
};
goog.fx.AnimationParallelQueue.prototype.onAnimationFinish = function $goog$fx$AnimationParallelQueue$$onAnimationFinish$() {
  this.finishedCounter_++;
  this.finishedCounter_ == this.queue.length && (this.endTime = goog.now(), this.setStateStopped(), this.onFinish(), this.onEnd())
};
goog.fx.AnimationSerialQueue = function $goog$fx$AnimationSerialQueue$() {
  goog.fx.AnimationQueue.call(this);
  this.current_ = 0
};
goog.inherits(goog.fx.AnimationSerialQueue, goog.fx.AnimationQueue);
goog.fx.AnimationSerialQueue.prototype.play = function $goog$fx$AnimationSerialQueue$$play$($opt_restart$$) {
  if(0 == this.queue.length) {
    return!1
  }
  if($opt_restart$$ || this.isStopped()) {
    this.current_ < this.queue.length && !this.queue[this.current_].isStopped() && this.queue[this.current_].stop(!1), this.current_ = 0, this.onBegin()
  }else {
    if(this.isPlaying()) {
      return!1
    }
  }
  this.onPlay();
  if(this.isPaused()) {
    this.onResume()
  }
  this.startTime = goog.now();
  this.endTime = null;
  this.setStatePlaying();
  this.queue[this.current_].play($opt_restart$$);
  return!0
};
goog.fx.AnimationSerialQueue.prototype.pause = function $goog$fx$AnimationSerialQueue$$pause$() {
  this.isPlaying() && (this.queue[this.current_].pause(), this.setStatePaused(), this.onPause())
};
goog.fx.AnimationSerialQueue.prototype.stop = function $goog$fx$AnimationSerialQueue$$stop$($i$$118_opt_gotoEnd$$) {
  this.setStateStopped();
  this.endTime = goog.now();
  if($i$$118_opt_gotoEnd$$) {
    for($i$$118_opt_gotoEnd$$ = this.current_;$i$$118_opt_gotoEnd$$ < this.queue.length;++$i$$118_opt_gotoEnd$$) {
      var $anim$$ = this.queue[$i$$118_opt_gotoEnd$$];
      $anim$$.isStopped() && $anim$$.play();
      $anim$$.isStopped() || $anim$$.stop(!0)
    }
  }else {
    this.current_ < this.queue.length && this.queue[this.current_].stop(!1)
  }
  this.onStop();
  this.onEnd()
};
goog.fx.AnimationSerialQueue.prototype.onAnimationFinish = function $goog$fx$AnimationSerialQueue$$onAnimationFinish$() {
  this.isPlaying() && (this.current_++, this.current_ < this.queue.length ? this.queue[this.current_].play() : (this.endTime = goog.now(), this.setStateStopped(), this.onFinish(), this.onEnd()))
};
goog.color = {};
goog.color.names = {aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", 
darkgray:"#a9a9a9", darkgreen:"#006400", darkgrey:"#a9a9a9", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", 
forestgreen:"#228b22", fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", green:"#008000", greenyellow:"#adff2f", grey:"#808080", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", 
lightgreen:"#90ee90", lightgrey:"#d3d3d3", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370d8", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", 
mediumturquoise:"#48d1cc", mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#d87093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", 
purple:"#800080", red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", 
yellow:"#ffff00", yellowgreen:"#9acd32"};
goog.color.parse = function $goog$color$parse$($str$$) {
  var $result$$ = {}, $str$$ = String($str$$), $hex_maybeHex_rgb$$ = goog.color.prependHashIfNecessaryHelper($str$$);
  if(goog.color.isValidHexColor_($hex_maybeHex_rgb$$)) {
    return $result$$.hex = goog.color.normalizeHex($hex_maybeHex_rgb$$), $result$$.type = "hex", $result$$
  }
  $hex_maybeHex_rgb$$ = goog.color.isValidRgbColor_($str$$);
  if($hex_maybeHex_rgb$$.length) {
    return $result$$.hex = goog.color.rgbArrayToHex($hex_maybeHex_rgb$$), $result$$.type = "rgb", $result$$
  }
  if(goog.color.names && ($hex_maybeHex_rgb$$ = goog.color.names[$str$$.toLowerCase()])) {
    return $result$$.hex = $hex_maybeHex_rgb$$, $result$$.type = "named", $result$$
  }
  throw Error($str$$ + " is not a valid color string");
};
goog.color.isValidColor = function $goog$color$isValidColor$($str$$) {
  var $maybeHex$$ = goog.color.prependHashIfNecessaryHelper($str$$);
  return!(!goog.color.isValidHexColor_($maybeHex$$) && !(goog.color.isValidRgbColor_($str$$).length || goog.color.names && goog.color.names[$str$$.toLowerCase()]))
};
goog.color.parseRgb = function $goog$color$parseRgb$($str$$) {
  var $rgb$$ = goog.color.isValidRgbColor_($str$$);
  if(!$rgb$$.length) {
    throw Error($str$$ + " is not a valid RGB color");
  }
  return $rgb$$
};
goog.color.hexToRgbStyle = function $goog$color$hexToRgbStyle$($hexColor$$) {
  return goog.color.rgbStyle_(goog.color.hexToRgb($hexColor$$))
};
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function $goog$color$normalizeHex$($hexColor$$) {
  if(!goog.color.isValidHexColor_($hexColor$$)) {
    throw Error("'" + $hexColor$$ + "' is not a valid hex color");
  }
  4 == $hexColor$$.length && ($hexColor$$ = $hexColor$$.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
  return $hexColor$$.toLowerCase()
};
goog.color.hexToRgb = function $goog$color$hexToRgb$($b$$30_hexColor$$) {
  var $b$$30_hexColor$$ = goog.color.normalizeHex($b$$30_hexColor$$), $r$$ = parseInt($b$$30_hexColor$$.substr(1, 2), 16), $g$$ = parseInt($b$$30_hexColor$$.substr(3, 2), 16), $b$$30_hexColor$$ = parseInt($b$$30_hexColor$$.substr(5, 2), 16);
  return[$r$$, $g$$, $b$$30_hexColor$$]
};
goog.color.rgbToHex = function $goog$color$rgbToHex$($hexR_r$$, $g$$, $b$$) {
  $hexR_r$$ = Number($hexR_r$$);
  $g$$ = Number($g$$);
  $b$$ = Number($b$$);
  if(isNaN($hexR_r$$) || 0 > $hexR_r$$ || 255 < $hexR_r$$ || isNaN($g$$) || 0 > $g$$ || 255 < $g$$ || isNaN($b$$) || 0 > $b$$ || 255 < $b$$) {
    throw Error('"(' + $hexR_r$$ + "," + $g$$ + "," + $b$$ + '") is not a valid RGB color');
  }
  $hexR_r$$ = goog.color.prependZeroIfNecessaryHelper($hexR_r$$.toString(16));
  $g$$ = goog.color.prependZeroIfNecessaryHelper($g$$.toString(16));
  $b$$ = goog.color.prependZeroIfNecessaryHelper($b$$.toString(16));
  return"#" + $hexR_r$$ + $g$$ + $b$$
};
goog.color.rgbArrayToHex = function $goog$color$rgbArrayToHex$($rgb$$) {
  return goog.color.rgbToHex($rgb$$[0], $rgb$$[1], $rgb$$[2])
};
goog.color.rgbToHsl = function $goog$color$rgbToHsl$($normR_r$$, $g$$, $b$$) {
  var $normR_r$$ = $normR_r$$ / 255, $g$$ = $g$$ / 255, $b$$ = $b$$ / 255, $max$$ = Math.max($normR_r$$, $g$$, $b$$), $min$$ = Math.min($normR_r$$, $g$$, $b$$), $h$$ = 0, $s$$ = 0, $l$$ = 0.5 * ($max$$ + $min$$);
  $max$$ != $min$$ && ($max$$ == $normR_r$$ ? $h$$ = 60 * ($g$$ - $b$$) / ($max$$ - $min$$) : $max$$ == $g$$ ? $h$$ = 60 * ($b$$ - $normR_r$$) / ($max$$ - $min$$) + 120 : $max$$ == $b$$ && ($h$$ = 60 * ($normR_r$$ - $g$$) / ($max$$ - $min$$) + 240), $s$$ = 0 < $l$$ && 0.5 >= $l$$ ? ($max$$ - $min$$) / (2 * $l$$) : ($max$$ - $min$$) / (2 - 2 * $l$$));
  return[Math.round($h$$ + 360) % 360, $s$$, $l$$]
};
goog.color.rgbArrayToHsl = function $goog$color$rgbArrayToHsl$($rgb$$) {
  return goog.color.rgbToHsl($rgb$$[0], $rgb$$[1], $rgb$$[2])
};
goog.color.hueToRgb_ = function $goog$color$hueToRgb_$($v1$$, $v2$$, $vH$$) {
  0 > $vH$$ ? $vH$$ += 1 : 1 < $vH$$ && ($vH$$ -= 1);
  return 1 > 6 * $vH$$ ? $v1$$ + 6 * ($v2$$ - $v1$$) * $vH$$ : 1 > 2 * $vH$$ ? $v2$$ : 2 > 3 * $vH$$ ? $v1$$ + 6 * ($v2$$ - $v1$$) * (2 / 3 - $vH$$) : $v1$$
};
goog.color.hslToRgb = function $goog$color$hslToRgb$($h$$, $s$$, $l$$) {
  var $r$$ = 0, $g$$ = 0, $b$$ = 0, $h$$ = $h$$ / 360;
  if(0 == $s$$) {
    $r$$ = $g$$ = $b$$ = 255 * $l$$
  }else {
    var $temp2$$ = $b$$ = 0, $temp2$$ = 0.5 > $l$$ ? $l$$ * (1 + $s$$) : $l$$ + $s$$ - $s$$ * $l$$, $b$$ = 2 * $l$$ - $temp2$$, $r$$ = 255 * goog.color.hueToRgb_($b$$, $temp2$$, $h$$ + 1 / 3), $g$$ = 255 * goog.color.hueToRgb_($b$$, $temp2$$, $h$$), $b$$ = 255 * goog.color.hueToRgb_($b$$, $temp2$$, $h$$ - 1 / 3)
  }
  return[Math.round($r$$), Math.round($g$$), Math.round($b$$)]
};
goog.color.hslArrayToRgb = function $goog$color$hslArrayToRgb$($hsl$$) {
  return goog.color.hslToRgb($hsl$$[0], $hsl$$[1], $hsl$$[2])
};
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function $goog$color$isValidHexColor_$($str$$) {
  return goog.color.validHexColorRe_.test($str$$)
};
goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
goog.color.isNormalizedHexColor_ = function $goog$color$isNormalizedHexColor_$($str$$) {
  return goog.color.normalizedHexColorRe_.test($str$$)
};
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function $goog$color$isValidRgbColor_$($r$$5_str$$) {
  var $b$$ = $r$$5_str$$.match(goog.color.rgbColorRe_);
  if($b$$) {
    var $r$$5_str$$ = Number($b$$[1]), $g$$ = Number($b$$[2]), $b$$ = Number($b$$[3]);
    if(0 <= $r$$5_str$$ && 255 >= $r$$5_str$$ && 0 <= $g$$ && 255 >= $g$$ && 0 <= $b$$ && 255 >= $b$$) {
      return[$r$$5_str$$, $g$$, $b$$]
    }
  }
  return[]
};
goog.color.prependZeroIfNecessaryHelper = function $goog$color$prependZeroIfNecessaryHelper$($hex$$) {
  return 1 == $hex$$.length ? "0" + $hex$$ : $hex$$
};
goog.color.prependHashIfNecessaryHelper = function $goog$color$prependHashIfNecessaryHelper$($str$$) {
  return"#" == $str$$.charAt(0) ? $str$$ : "#" + $str$$
};
goog.color.rgbStyle_ = function $goog$color$rgbStyle_$($rgb$$) {
  return"rgb(" + $rgb$$.join(",") + ")"
};
goog.color.hsvToRgb = function $goog$color$hsvToRgb$($h$$10_val1$$, $s$$, $brightness$$) {
  var $red$$ = 0, $green$$ = 0, $blue$$ = 0;
  if(0 == $s$$) {
    $blue$$ = $green$$ = $red$$ = $brightness$$
  }else {
    var $sextant$$ = Math.floor($h$$10_val1$$ / 60), $remainder$$ = $h$$10_val1$$ / 60 - $sextant$$, $h$$10_val1$$ = $brightness$$ * (1 - $s$$), $val2$$ = $brightness$$ * (1 - $s$$ * $remainder$$), $s$$ = $brightness$$ * (1 - $s$$ * (1 - $remainder$$));
    switch($sextant$$) {
      case 1:
        $red$$ = $val2$$;
        $green$$ = $brightness$$;
        $blue$$ = $h$$10_val1$$;
        break;
      case 2:
        $red$$ = $h$$10_val1$$;
        $green$$ = $brightness$$;
        $blue$$ = $s$$;
        break;
      case 3:
        $red$$ = $h$$10_val1$$;
        $green$$ = $val2$$;
        $blue$$ = $brightness$$;
        break;
      case 4:
        $red$$ = $s$$;
        $green$$ = $h$$10_val1$$;
        $blue$$ = $brightness$$;
        break;
      case 5:
        $red$$ = $brightness$$;
        $green$$ = $h$$10_val1$$;
        $blue$$ = $val2$$;
        break;
      case 6:
      ;
      case 0:
        $red$$ = $brightness$$, $green$$ = $s$$, $blue$$ = $h$$10_val1$$
    }
  }
  return[Math.floor($red$$), Math.floor($green$$), Math.floor($blue$$)]
};
goog.color.rgbToHsv = function $goog$color$rgbToHsv$($hue_red$$, $green$$, $blue$$) {
  var $max$$ = Math.max(Math.max($hue_red$$, $green$$), $blue$$), $min$$ = Math.min(Math.min($hue_red$$, $green$$), $blue$$);
  if($min$$ == $max$$) {
    $min$$ = $hue_red$$ = 0
  }else {
    var $delta$$ = $max$$ - $min$$, $min$$ = $delta$$ / $max$$, $hue_red$$ = 60 * ($hue_red$$ == $max$$ ? ($green$$ - $blue$$) / $delta$$ : $green$$ == $max$$ ? 2 + ($blue$$ - $hue_red$$) / $delta$$ : 4 + ($hue_red$$ - $green$$) / $delta$$);
    0 > $hue_red$$ && ($hue_red$$ += 360);
    360 < $hue_red$$ && ($hue_red$$ -= 360)
  }
  return[$hue_red$$, $min$$, $max$$]
};
goog.color.rgbArrayToHsv = function $goog$color$rgbArrayToHsv$($rgb$$) {
  return goog.color.rgbToHsv($rgb$$[0], $rgb$$[1], $rgb$$[2])
};
goog.color.hsvArrayToRgb = function $goog$color$hsvArrayToRgb$($hsv$$) {
  return goog.color.hsvToRgb($hsv$$[0], $hsv$$[1], $hsv$$[2])
};
goog.color.hexToHsl = function $goog$color$hexToHsl$($hex$$2_rgb$$) {
  $hex$$2_rgb$$ = goog.color.hexToRgb($hex$$2_rgb$$);
  return goog.color.rgbToHsl($hex$$2_rgb$$[0], $hex$$2_rgb$$[1], $hex$$2_rgb$$[2])
};
goog.color.hslToHex = function $goog$color$hslToHex$($h$$, $s$$, $l$$) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb($h$$, $s$$, $l$$))
};
goog.color.hslArrayToHex = function $goog$color$hslArrayToHex$($hsl$$) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb($hsl$$[0], $hsl$$[1], $hsl$$[2]))
};
goog.color.hexToHsv = function $goog$color$hexToHsv$($hex$$) {
  return goog.color.rgbArrayToHsv(goog.color.hexToRgb($hex$$))
};
goog.color.hsvToHex = function $goog$color$hsvToHex$($h$$, $s$$, $v$$) {
  return goog.color.rgbArrayToHex(goog.color.hsvToRgb($h$$, $s$$, $v$$))
};
goog.color.hsvArrayToHex = function $goog$color$hsvArrayToHex$($hsv$$) {
  return goog.color.hsvToHex($hsv$$[0], $hsv$$[1], $hsv$$[2])
};
goog.color.hslDistance = function $goog$color$hslDistance$($hsl1$$, $hsl2$$) {
  var $sl1$$, $sl2$$;
  $sl1$$ = 0.5 >= $hsl1$$[2] ? $hsl1$$[1] * $hsl1$$[2] : $hsl1$$[1] * (1 - $hsl1$$[2]);
  $sl2$$ = 0.5 >= $hsl2$$[2] ? $hsl2$$[1] * $hsl2$$[2] : $hsl2$$[1] * (1 - $hsl2$$[2]);
  return($hsl1$$[2] - $hsl2$$[2]) * ($hsl1$$[2] - $hsl2$$[2]) + $sl1$$ * $sl1$$ + $sl2$$ * $sl2$$ - 2 * $sl1$$ * $sl2$$ * Math.cos(2 * ($hsl1$$[0] / 360 - $hsl2$$[0] / 360) * Math.PI)
};
goog.color.blend = function $goog$color$blend$($rgb1$$, $rgb2$$, $factor$$) {
  $factor$$ = goog.math.clamp($factor$$, 0, 1);
  return[Math.round($factor$$ * $rgb1$$[0] + (1 - $factor$$) * $rgb2$$[0]), Math.round($factor$$ * $rgb1$$[1] + (1 - $factor$$) * $rgb2$$[1]), Math.round($factor$$ * $rgb1$$[2] + (1 - $factor$$) * $rgb2$$[2])]
};
goog.color.darken = function $goog$color$darken$($rgb$$, $factor$$) {
  return goog.color.blend([0, 0, 0], $rgb$$, $factor$$)
};
goog.color.lighten = function $goog$color$lighten$($rgb$$, $factor$$) {
  return goog.color.blend([255, 255, 255], $rgb$$, $factor$$)
};
goog.color.highContrast = function $goog$color$highContrast$($prime$$, $suggestions$$) {
  for(var $suggestionsWithDiff$$ = [], $i$$ = 0;$i$$ < $suggestions$$.length;$i$$++) {
    $suggestionsWithDiff$$.push({color:$suggestions$$[$i$$], diff:goog.color.yiqBrightnessDiff_($suggestions$$[$i$$], $prime$$) + goog.color.colorDiff_($suggestions$$[$i$$], $prime$$)})
  }
  $suggestionsWithDiff$$.sort(function($a$$, $b$$) {
    return $b$$.diff - $a$$.diff
  });
  return $suggestionsWithDiff$$[0].color
};
goog.color.yiqBrightness_ = function $goog$color$yiqBrightness_$($rgb$$) {
  return Math.round((299 * $rgb$$[0] + 587 * $rgb$$[1] + 114 * $rgb$$[2]) / 1E3)
};
goog.color.yiqBrightnessDiff_ = function $goog$color$yiqBrightnessDiff_$($rgb1$$, $rgb2$$) {
  return Math.abs(goog.color.yiqBrightness_($rgb1$$) - goog.color.yiqBrightness_($rgb2$$))
};
goog.color.colorDiff_ = function $goog$color$colorDiff_$($rgb1$$, $rgb2$$) {
  return Math.abs($rgb1$$[0] - $rgb2$$[0]) + Math.abs($rgb1$$[1] - $rgb2$$[1]) + Math.abs($rgb1$$[2] - $rgb2$$[2])
};
goog.async = {};
goog.async.Delay = function $goog$async$Delay$($listener$$, $opt_interval$$, $opt_handler$$) {
  goog.Disposable.call(this);
  this.listener_ = $listener$$;
  this.interval_ = $opt_interval$$ || 0;
  this.handler_ = $opt_handler$$;
  this.callback_ = goog.bind(this.doAction_, this)
};
goog.inherits(goog.async.Delay, goog.Disposable);
goog.Delay = goog.async.Delay;
goog.async.Delay.prototype.id_ = 0;
goog.async.Delay.prototype.disposeInternal = function $goog$async$Delay$$disposeInternal$() {
  goog.async.Delay.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.listener_;
  delete this.handler_
};
goog.async.Delay.prototype.start = function $goog$async$Delay$$start$($opt_interval$$) {
  this.stop();
  this.id_ = goog.Timer.callOnce(this.callback_, goog.isDef($opt_interval$$) ? $opt_interval$$ : this.interval_)
};
goog.async.Delay.prototype.stop = function $goog$async$Delay$$stop$() {
  this.isActive() && goog.Timer.clear(this.id_);
  this.id_ = 0
};
goog.async.Delay.prototype.fire = function $goog$async$Delay$$fire$() {
  this.stop();
  this.doAction_()
};
goog.async.Delay.prototype.fireIfActive = function $goog$async$Delay$$fireIfActive$() {
  this.isActive() && this.fire()
};
goog.async.Delay.prototype.isActive = function $goog$async$Delay$$isActive$() {
  return 0 != this.id_
};
goog.async.Delay.prototype.doAction_ = function $goog$async$Delay$$doAction_$() {
  this.id_ = 0;
  this.listener_ && this.listener_.call(this.handler_)
};
goog.functions = {};
goog.functions.constant = function $goog$functions$constant$($retValue$$) {
  return function() {
    return $retValue$$
  }
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function $goog$functions$identity$($opt_returnValue$$) {
  return $opt_returnValue$$
};
goog.functions.error = function $goog$functions$error$($message$$) {
  return function() {
    throw Error($message$$);
  }
};
goog.functions.lock = function $goog$functions$lock$($f$$, $opt_numArgs$$) {
  $opt_numArgs$$ = $opt_numArgs$$ || 0;
  return function() {
    return $f$$.apply(this, Array.prototype.slice.call(arguments, 0, $opt_numArgs$$))
  }
};
goog.functions.withReturnValue = function $goog$functions$withReturnValue$($f$$, $retValue$$) {
  return goog.functions.sequence($f$$, goog.functions.constant($retValue$$))
};
goog.functions.compose = function $goog$functions$compose$($var_args$$) {
  var $functions$$ = arguments, $length$$ = $functions$$.length;
  return function() {
    var $result$$;
    $length$$ && ($result$$ = $functions$$[$length$$ - 1].apply(this, arguments));
    for(var $i$$ = $length$$ - 2;0 <= $i$$;$i$$--) {
      $result$$ = $functions$$[$i$$].call(this, $result$$)
    }
    return $result$$
  }
};
goog.functions.sequence = function $goog$functions$sequence$($var_args$$) {
  var $functions$$ = arguments, $length$$ = $functions$$.length;
  return function() {
    for(var $result$$, $i$$ = 0;$i$$ < $length$$;$i$$++) {
      $result$$ = $functions$$[$i$$].apply(this, arguments)
    }
    return $result$$
  }
};
goog.functions.and = function $goog$functions$and$($var_args$$) {
  var $functions$$ = arguments, $length$$ = $functions$$.length;
  return function() {
    for(var $i$$ = 0;$i$$ < $length$$;$i$$++) {
      if(!$functions$$[$i$$].apply(this, arguments)) {
        return!1
      }
    }
    return!0
  }
};
goog.functions.or = function $goog$functions$or$($var_args$$) {
  var $functions$$ = arguments, $length$$ = $functions$$.length;
  return function() {
    for(var $i$$ = 0;$i$$ < $length$$;$i$$++) {
      if($functions$$[$i$$].apply(this, arguments)) {
        return!0
      }
    }
    return!1
  }
};
goog.functions.not = function $goog$functions$not$($f$$) {
  return function() {
    return!$f$$.apply(this, arguments)
  }
};
goog.functions.create = function $goog$functions$create$($constructor$$, $var_args$$) {
  var $obj$$77_temp$$ = function $$obj$$77_temp$$$() {
  };
  $obj$$77_temp$$.prototype = $constructor$$.prototype;
  $obj$$77_temp$$ = new $obj$$77_temp$$;
  $constructor$$.apply($obj$$77_temp$$, Array.prototype.slice.call(arguments, 1));
  return $obj$$77_temp$$
};
goog.async.AnimationDelay = function $goog$async$AnimationDelay$($listener$$, $opt_window$$, $opt_handler$$) {
  goog.Disposable.call(this);
  this.listener_ = $listener$$;
  this.handler_ = $opt_handler$$;
  this.win_ = $opt_window$$ || window;
  this.callback_ = goog.bind(this.doAction_, this)
};
goog.inherits(goog.async.AnimationDelay, goog.Disposable);
goog.async.AnimationDelay.prototype.id_ = null;
goog.async.AnimationDelay.prototype.usingListeners_ = !1;
goog.async.AnimationDelay.TIMEOUT = 20;
goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_ = "MozBeforePaint";
goog.async.AnimationDelay.prototype.start = function $goog$async$AnimationDelay$$start$() {
  this.stop();
  this.usingListeners_ = !1;
  var $raf$$ = this.getRaf_(), $cancelRaf$$ = this.getCancelRaf_();
  $raf$$ && !$cancelRaf$$ && this.win_.mozRequestAnimationFrame ? (this.id_ = goog.events.listen(this.win_, goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_, this.callback_), this.win_.mozRequestAnimationFrame(null), this.usingListeners_ = !0) : this.id_ = $raf$$ && $cancelRaf$$ ? $raf$$.call(this.win_, this.callback_) : this.win_.setTimeout(goog.functions.lock(this.callback_), goog.async.AnimationDelay.TIMEOUT)
};
goog.async.AnimationDelay.prototype.stop = function $goog$async$AnimationDelay$$stop$() {
  if(this.isActive()) {
    var $raf$$ = this.getRaf_(), $cancelRaf$$ = this.getCancelRaf_();
    $raf$$ && !$cancelRaf$$ && this.win_.mozRequestAnimationFrame ? goog.events.unlistenByKey(this.id_) : $raf$$ && $cancelRaf$$ ? $cancelRaf$$.call(this.win_, this.id_) : this.win_.clearTimeout(this.id_)
  }
  this.id_ = null
};
goog.async.AnimationDelay.prototype.fire = function $goog$async$AnimationDelay$$fire$() {
  this.stop();
  this.doAction_()
};
goog.async.AnimationDelay.prototype.fireIfActive = function $goog$async$AnimationDelay$$fireIfActive$() {
  this.isActive() && this.fire()
};
goog.async.AnimationDelay.prototype.isActive = function $goog$async$AnimationDelay$$isActive$() {
  return null != this.id_
};
goog.async.AnimationDelay.prototype.doAction_ = function $goog$async$AnimationDelay$$doAction_$() {
  this.usingListeners_ && this.id_ && goog.events.unlistenByKey(this.id_);
  this.id_ = null;
  this.listener_.call(this.handler_, goog.now())
};
goog.async.AnimationDelay.prototype.disposeInternal = function $goog$async$AnimationDelay$$disposeInternal$() {
  this.stop();
  goog.async.AnimationDelay.superClass_.disposeInternal.call(this)
};
goog.async.AnimationDelay.prototype.getRaf_ = function $goog$async$AnimationDelay$$getRaf_$() {
  var $win$$ = this.win_;
  return $win$$.requestAnimationFrame || $win$$.webkitRequestAnimationFrame || $win$$.mozRequestAnimationFrame || $win$$.oRequestAnimationFrame || $win$$.msRequestAnimationFrame || null
};
goog.async.AnimationDelay.prototype.getCancelRaf_ = function $goog$async$AnimationDelay$$getCancelRaf_$() {
  var $win$$ = this.win_;
  return $win$$.cancelRequestAnimationFrame || $win$$.webkitCancelRequestAnimationFrame || $win$$.mozCancelRequestAnimationFrame || $win$$.oCancelRequestAnimationFrame || $win$$.msCancelRequestAnimationFrame || null
};
goog.fx.anim = {};
goog.fx.anim.Animated = function $goog$fx$anim$Animated$() {
};
goog.fx.anim.TIMEOUT = goog.async.AnimationDelay.TIMEOUT;
goog.fx.anim.activeAnimations_ = {};
goog.fx.anim.animationWindow_ = null;
goog.fx.anim.animationDelay_ = null;
goog.fx.anim.registerAnimation = function $goog$fx$anim$registerAnimation$($animation$$) {
  var $uid$$ = goog.getUid($animation$$);
  $uid$$ in goog.fx.anim.activeAnimations_ || (goog.fx.anim.activeAnimations_[$uid$$] = $animation$$);
  goog.fx.anim.requestAnimationFrame_()
};
goog.fx.anim.unregisterAnimation = function $goog$fx$anim$unregisterAnimation$($animation$$5_uid$$) {
  $animation$$5_uid$$ = goog.getUid($animation$$5_uid$$);
  delete goog.fx.anim.activeAnimations_[$animation$$5_uid$$];
  goog.object.isEmpty(goog.fx.anim.activeAnimations_) && goog.fx.anim.cancelAnimationFrame_()
};
goog.fx.anim.tearDown = function $goog$fx$anim$tearDown$() {
  goog.fx.anim.animationWindow_ = null;
  goog.dispose(goog.fx.anim.animationDelay_);
  goog.fx.anim.animationDelay_ = null;
  goog.fx.anim.activeAnimations_ = {}
};
goog.fx.anim.setAnimationWindow = function $goog$fx$anim$setAnimationWindow$($animationWindow$$) {
  var $hasTimer$$ = goog.fx.anim.animationDelay_ && goog.fx.anim.animationDelay_.isActive();
  goog.dispose(goog.fx.anim.animationDelay_);
  goog.fx.anim.animationDelay_ = null;
  goog.fx.anim.animationWindow_ = $animationWindow$$;
  $hasTimer$$ && goog.fx.anim.requestAnimationFrame_()
};
goog.fx.anim.requestAnimationFrame_ = function $goog$fx$anim$requestAnimationFrame_$() {
  goog.fx.anim.animationDelay_ || (goog.fx.anim.animationDelay_ = goog.fx.anim.animationWindow_ ? new goog.async.AnimationDelay(function($now$$) {
    goog.fx.anim.cycleAnimations_($now$$)
  }, goog.fx.anim.animationWindow_) : new goog.async.Delay(function() {
    goog.fx.anim.cycleAnimations_(goog.now())
  }, goog.fx.anim.TIMEOUT));
  var $delay$$ = goog.fx.anim.animationDelay_;
  $delay$$.isActive() || $delay$$.start()
};
goog.fx.anim.cancelAnimationFrame_ = function $goog$fx$anim$cancelAnimationFrame_$() {
  goog.fx.anim.animationDelay_ && goog.fx.anim.animationDelay_.stop()
};
goog.fx.anim.cycleAnimations_ = function $goog$fx$anim$cycleAnimations_$($now$$) {
  goog.object.forEach(goog.fx.anim.activeAnimations_, function($anim$$) {
    $anim$$.onAnimationFrame($now$$)
  });
  goog.object.isEmpty(goog.fx.anim.activeAnimations_) || goog.fx.anim.requestAnimationFrame_()
};
goog.fx.Animation = function $goog$fx$Animation$($start$$, $end$$, $duration$$, $opt_acc$$) {
  goog.fx.TransitionBase.call(this);
  if(!goog.isArray($start$$) || !goog.isArray($end$$)) {
    throw Error("Start and end parameters must be arrays");
  }
  if($start$$.length != $end$$.length) {
    throw Error("Start and end points must be the same length");
  }
  this.startPoint = $start$$;
  this.endPoint = $end$$;
  this.duration = $duration$$;
  this.accel_ = $opt_acc$$;
  this.coords = [];
  this.useRightPositioningForRtl_ = !1
};
goog.inherits(goog.fx.Animation, goog.fx.TransitionBase);
goog.fx.Animation.prototype.enableRightPositioningForRtl = function $goog$fx$Animation$$enableRightPositioningForRtl$($useRightPositioningForRtl$$) {
  this.useRightPositioningForRtl_ = $useRightPositioningForRtl$$
};
goog.fx.Animation.prototype.isRightPositioningForRtlEnabled = function $goog$fx$Animation$$isRightPositioningForRtlEnabled$() {
  return this.useRightPositioningForRtl_
};
goog.fx.Animation.EventType = {PLAY:goog.fx.Transition.EventType.PLAY, BEGIN:goog.fx.Transition.EventType.BEGIN, RESUME:goog.fx.Transition.EventType.RESUME, END:goog.fx.Transition.EventType.END, STOP:goog.fx.Transition.EventType.STOP, FINISH:goog.fx.Transition.EventType.FINISH, PAUSE:goog.fx.Transition.EventType.PAUSE, ANIMATE:"animate", DESTROY:"destroy"};
goog.fx.Animation.TIMEOUT = goog.fx.anim.TIMEOUT;
goog.fx.Animation.State = goog.fx.TransitionBase.State;
goog.fx.Animation.setAnimationWindow = function $goog$fx$Animation$setAnimationWindow$($animationWindow$$) {
  goog.fx.anim.setAnimationWindow($animationWindow$$)
};
goog.fx.Animation.prototype.fps_ = 0;
goog.fx.Animation.prototype.progress = 0;
goog.fx.Animation.prototype.lastFrame = null;
goog.fx.Animation.prototype.play = function $goog$fx$Animation$$play$($now$$2_opt_restart$$) {
  if($now$$2_opt_restart$$ || this.isStopped()) {
    this.progress = 0, this.coords = this.startPoint
  }else {
    if(this.isPlaying()) {
      return!1
    }
  }
  goog.fx.anim.unregisterAnimation(this);
  this.startTime = $now$$2_opt_restart$$ = goog.now();
  this.isPaused() && (this.startTime -= this.duration * this.progress);
  this.endTime = this.startTime + this.duration;
  this.lastFrame = this.startTime;
  if(!this.progress) {
    this.onBegin()
  }
  this.onPlay();
  if(this.isPaused()) {
    this.onResume()
  }
  this.setStatePlaying();
  goog.fx.anim.registerAnimation(this);
  this.cycle($now$$2_opt_restart$$);
  return!0
};
goog.fx.Animation.prototype.stop = function $goog$fx$Animation$$stop$($opt_gotoEnd$$) {
  goog.fx.anim.unregisterAnimation(this);
  this.setStateStopped();
  $opt_gotoEnd$$ && (this.progress = 1);
  this.updateCoords_(this.progress);
  this.onStop();
  this.onEnd()
};
goog.fx.Animation.prototype.pause = function $goog$fx$Animation$$pause$() {
  this.isPlaying() && (goog.fx.anim.unregisterAnimation(this), this.setStatePaused(), this.onPause())
};
goog.fx.Animation.prototype.getProgress = function $goog$fx$Animation$$getProgress$() {
  return this.progress
};
goog.fx.Animation.prototype.setProgress = function $goog$fx$Animation$$setProgress$($progress$$) {
  this.progress = $progress$$;
  this.isPlaying() && (this.startTime = goog.now() - this.duration * this.progress, this.endTime = this.startTime + this.duration)
};
goog.fx.Animation.prototype.disposeInternal = function $goog$fx$Animation$$disposeInternal$() {
  this.isStopped() || this.stop(!1);
  this.onDestroy();
  goog.fx.Animation.superClass_.disposeInternal.call(this)
};
goog.fx.Animation.prototype.destroy = function $goog$fx$Animation$$destroy$() {
  this.dispose()
};
goog.fx.Animation.prototype.onAnimationFrame = function $goog$fx$Animation$$onAnimationFrame$($now$$) {
  this.cycle($now$$)
};
goog.fx.Animation.prototype.cycle = function $goog$fx$Animation$$cycle$($now$$) {
  this.progress = ($now$$ - this.startTime) / (this.endTime - this.startTime);
  1 <= this.progress && (this.progress = 1);
  this.fps_ = 1E3 / ($now$$ - this.lastFrame);
  this.lastFrame = $now$$;
  this.updateCoords_(this.progress);
  if(1 == this.progress) {
    this.setStateStopped(), goog.fx.anim.unregisterAnimation(this), this.onFinish(), this.onEnd()
  }else {
    if(this.isPlaying()) {
      this.onAnimate()
    }
  }
};
goog.fx.Animation.prototype.updateCoords_ = function $goog$fx$Animation$$updateCoords_$($t$$) {
  goog.isFunction(this.accel_) && ($t$$ = this.accel_($t$$));
  this.coords = Array(this.startPoint.length);
  for(var $i$$ = 0;$i$$ < this.startPoint.length;$i$$++) {
    this.coords[$i$$] = (this.endPoint[$i$$] - this.startPoint[$i$$]) * $t$$ + this.startPoint[$i$$]
  }
};
goog.fx.Animation.prototype.onAnimate = function $goog$fx$Animation$$onAnimate$() {
  this.dispatchAnimationEvent(goog.fx.Animation.EventType.ANIMATE)
};
goog.fx.Animation.prototype.onDestroy = function $goog$fx$Animation$$onDestroy$() {
  this.dispatchAnimationEvent(goog.fx.Animation.EventType.DESTROY)
};
goog.fx.Animation.prototype.dispatchAnimationEvent = function $goog$fx$Animation$$dispatchAnimationEvent$($type$$) {
  this.dispatchEvent(new goog.fx.AnimationEvent($type$$, this))
};
goog.fx.AnimationEvent = function $goog$fx$AnimationEvent$($type$$, $anim$$) {
  goog.events.Event.call(this, $type$$);
  this.coords = $anim$$.coords;
  this.x = $anim$$.coords[0];
  this.y = $anim$$.coords[1];
  this.z = $anim$$.coords[2];
  this.duration = $anim$$.duration;
  this.progress = $anim$$.getProgress();
  this.fps = $anim$$.fps_;
  this.state = $anim$$.getStateInternal();
  this.anim = $anim$$
};
goog.inherits(goog.fx.AnimationEvent, goog.events.Event);
goog.fx.AnimationEvent.prototype.coordsAsInts = function $goog$fx$AnimationEvent$$coordsAsInts$() {
  return goog.array.map(this.coords, Math.round)
};
goog.fx.dom = {};
goog.fx.dom.PredefinedEffect = function $goog$fx$dom$PredefinedEffect$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  goog.fx.Animation.call(this, $start$$, $end$$, $time$$, $opt_acc$$);
  this.element = $element$$
};
goog.inherits(goog.fx.dom.PredefinedEffect, goog.fx.Animation);
goog.fx.dom.PredefinedEffect.prototype.updateStyle = goog.nullFunction;
goog.fx.dom.PredefinedEffect.prototype.isRightToLeft = function $goog$fx$dom$PredefinedEffect$$isRightToLeft$() {
  goog.isDef(this.rightToLeft_) || (this.rightToLeft_ = goog.style.isRightToLeft(this.element));
  return this.rightToLeft_
};
goog.fx.dom.PredefinedEffect.prototype.onAnimate = function $goog$fx$dom$PredefinedEffect$$onAnimate$() {
  this.updateStyle();
  goog.fx.dom.PredefinedEffect.superClass_.onAnimate.call(this)
};
goog.fx.dom.PredefinedEffect.prototype.onEnd = function $goog$fx$dom$PredefinedEffect$$onEnd$() {
  this.updateStyle();
  goog.fx.dom.PredefinedEffect.superClass_.onEnd.call(this)
};
goog.fx.dom.PredefinedEffect.prototype.onBegin = function $goog$fx$dom$PredefinedEffect$$onBegin$() {
  this.updateStyle();
  goog.fx.dom.PredefinedEffect.superClass_.onBegin.call(this)
};
goog.fx.dom.Slide = function $goog$fx$dom$Slide$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  if(2 != $start$$.length || 2 != $end$$.length) {
    throw Error("Start and end points must be 2D");
  }
  goog.fx.dom.PredefinedEffect.apply(this, arguments)
};
goog.inherits(goog.fx.dom.Slide, goog.fx.dom.PredefinedEffect);
goog.fx.dom.Slide.prototype.updateStyle = function $goog$fx$dom$Slide$$updateStyle$() {
  var $pos$$ = this.isRightPositioningForRtlEnabled() && this.isRightToLeft() ? "right" : "left";
  this.element.style[$pos$$] = Math.round(this.coords[0]) + "px";
  this.element.style.top = Math.round(this.coords[1]) + "px"
};
goog.fx.dom.SlideFrom = function $goog$fx$dom$SlideFrom$($element$$, $end$$, $time$$, $opt_acc$$) {
  var $start$$ = [this.isRightPositioningForRtlEnabled() ? goog.style.bidi.getOffsetStart($element$$) : $element$$.offsetLeft, $element$$.offsetTop];
  goog.fx.dom.Slide.call(this, $element$$, $start$$, $end$$, $time$$, $opt_acc$$)
};
goog.inherits(goog.fx.dom.SlideFrom, goog.fx.dom.Slide);
goog.fx.dom.SlideFrom.prototype.onBegin = function $goog$fx$dom$SlideFrom$$onBegin$() {
  this.startPoint = [this.isRightPositioningForRtlEnabled() ? goog.style.bidi.getOffsetStart(this.element) : this.element.offsetLeft, this.element.offsetTop];
  goog.fx.dom.SlideFrom.superClass_.onBegin.call(this)
};
goog.fx.dom.Swipe = function $goog$fx$dom$Swipe$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  if(2 != $start$$.length || 2 != $end$$.length) {
    throw Error("Start and end points must be 2D");
  }
  goog.fx.dom.PredefinedEffect.apply(this, arguments);
  this.maxWidth_ = Math.max(this.endPoint[0], this.startPoint[0]);
  this.maxHeight_ = Math.max(this.endPoint[1], this.startPoint[1])
};
goog.inherits(goog.fx.dom.Swipe, goog.fx.dom.PredefinedEffect);
goog.fx.dom.Swipe.prototype.updateStyle = function $goog$fx$dom$Swipe$$updateStyle$() {
  var $x$$ = this.coords[0], $y$$ = this.coords[1];
  this.clip_(Math.round($x$$), Math.round($y$$), this.maxWidth_, this.maxHeight_);
  this.element.style.width = Math.round($x$$) + "px";
  var $marginX$$ = this.isRightPositioningForRtlEnabled() && this.isRightToLeft() ? "marginRight" : "marginLeft";
  this.element.style[$marginX$$] = Math.round($x$$) - this.maxWidth_ + "px";
  this.element.style.marginTop = Math.round($y$$) - this.maxHeight_ + "px"
};
goog.fx.dom.Swipe.prototype.clip_ = function $goog$fx$dom$Swipe$$clip_$($x$$, $y$$, $w$$, $h$$) {
  this.element.style.clip = "rect(" + ($h$$ - $y$$) + "px " + $w$$ + "px " + $h$$ + "px " + ($w$$ - $x$$) + "px)"
};
goog.fx.dom.Scroll = function $goog$fx$dom$Scroll$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  if(2 != $start$$.length || 2 != $end$$.length) {
    throw Error("Start and end points must be 2D");
  }
  goog.fx.dom.PredefinedEffect.apply(this, arguments)
};
goog.inherits(goog.fx.dom.Scroll, goog.fx.dom.PredefinedEffect);
goog.fx.dom.Scroll.prototype.updateStyle = function $goog$fx$dom$Scroll$$updateStyle$() {
  this.isRightPositioningForRtlEnabled() ? goog.style.bidi.setScrollOffset(this.element, Math.round(this.coords[0])) : this.element.scrollLeft = Math.round(this.coords[0]);
  this.element.scrollTop = Math.round(this.coords[1])
};
goog.fx.dom.Resize = function $goog$fx$dom$Resize$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  if(2 != $start$$.length || 2 != $end$$.length) {
    throw Error("Start and end points must be 2D");
  }
  goog.fx.dom.PredefinedEffect.apply(this, arguments)
};
goog.inherits(goog.fx.dom.Resize, goog.fx.dom.PredefinedEffect);
goog.fx.dom.Resize.prototype.updateStyle = function $goog$fx$dom$Resize$$updateStyle$() {
  this.element.style.width = Math.round(this.coords[0]) + "px";
  this.element.style.height = Math.round(this.coords[1]) + "px"
};
goog.fx.dom.ResizeWidth = function $goog$fx$dom$ResizeWidth$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  goog.fx.dom.PredefinedEffect.call(this, $element$$, [$start$$], [$end$$], $time$$, $opt_acc$$)
};
goog.inherits(goog.fx.dom.ResizeWidth, goog.fx.dom.PredefinedEffect);
goog.fx.dom.ResizeWidth.prototype.updateStyle = function $goog$fx$dom$ResizeWidth$$updateStyle$() {
  this.element.style.width = Math.round(this.coords[0]) + "px"
};
goog.fx.dom.ResizeHeight = function $goog$fx$dom$ResizeHeight$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  goog.fx.dom.PredefinedEffect.call(this, $element$$, [$start$$], [$end$$], $time$$, $opt_acc$$)
};
goog.inherits(goog.fx.dom.ResizeHeight, goog.fx.dom.PredefinedEffect);
goog.fx.dom.ResizeHeight.prototype.updateStyle = function $goog$fx$dom$ResizeHeight$$updateStyle$() {
  this.element.style.height = Math.round(this.coords[0]) + "px"
};
goog.fx.dom.Fade = function $goog$fx$dom$Fade$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  goog.isNumber($start$$) && ($start$$ = [$start$$]);
  goog.isNumber($end$$) && ($end$$ = [$end$$]);
  goog.fx.dom.PredefinedEffect.call(this, $element$$, $start$$, $end$$, $time$$, $opt_acc$$);
  if(1 != $start$$.length || 1 != $end$$.length) {
    throw Error("Start and end points must be 1D");
  }
};
goog.inherits(goog.fx.dom.Fade, goog.fx.dom.PredefinedEffect);
goog.fx.dom.Fade.prototype.updateStyle = function $goog$fx$dom$Fade$$updateStyle$() {
  goog.style.setOpacity(this.element, this.coords[0])
};
goog.fx.dom.Fade.prototype.show = function $goog$fx$dom$Fade$$show$() {
  this.element.style.display = ""
};
goog.fx.dom.Fade.prototype.hide = function $goog$fx$dom$Fade$$hide$() {
  this.element.style.display = "none"
};
goog.fx.dom.FadeOut = function $goog$fx$dom$FadeOut$($element$$, $time$$, $opt_acc$$) {
  goog.fx.dom.Fade.call(this, $element$$, 1, 0, $time$$, $opt_acc$$)
};
goog.inherits(goog.fx.dom.FadeOut, goog.fx.dom.Fade);
goog.fx.dom.FadeIn = function $goog$fx$dom$FadeIn$($element$$, $time$$, $opt_acc$$) {
  goog.fx.dom.Fade.call(this, $element$$, 0, 1, $time$$, $opt_acc$$)
};
goog.inherits(goog.fx.dom.FadeIn, goog.fx.dom.Fade);
goog.fx.dom.FadeOutAndHide = function $goog$fx$dom$FadeOutAndHide$($element$$, $time$$, $opt_acc$$) {
  goog.fx.dom.Fade.call(this, $element$$, 1, 0, $time$$, $opt_acc$$)
};
goog.inherits(goog.fx.dom.FadeOutAndHide, goog.fx.dom.Fade);
goog.fx.dom.FadeOutAndHide.prototype.onBegin = function $goog$fx$dom$FadeOutAndHide$$onBegin$() {
  this.show();
  goog.fx.dom.FadeOutAndHide.superClass_.onBegin.call(this)
};
goog.fx.dom.FadeOutAndHide.prototype.onEnd = function $goog$fx$dom$FadeOutAndHide$$onEnd$() {
  this.hide();
  goog.fx.dom.FadeOutAndHide.superClass_.onEnd.call(this)
};
goog.fx.dom.FadeInAndShow = function $goog$fx$dom$FadeInAndShow$($element$$, $time$$, $opt_acc$$) {
  goog.fx.dom.Fade.call(this, $element$$, 0, 1, $time$$, $opt_acc$$)
};
goog.inherits(goog.fx.dom.FadeInAndShow, goog.fx.dom.Fade);
goog.fx.dom.FadeInAndShow.prototype.onBegin = function $goog$fx$dom$FadeInAndShow$$onBegin$() {
  this.show();
  goog.fx.dom.FadeInAndShow.superClass_.onBegin.call(this)
};
goog.fx.dom.BgColorTransform = function $goog$fx$dom$BgColorTransform$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  if(3 != $start$$.length || 3 != $end$$.length) {
    throw Error("Start and end points must be 3D");
  }
  goog.fx.dom.PredefinedEffect.apply(this, arguments)
};
goog.inherits(goog.fx.dom.BgColorTransform, goog.fx.dom.PredefinedEffect);
goog.fx.dom.BgColorTransform.prototype.setColor = function $goog$fx$dom$BgColorTransform$$setColor$() {
  for(var $color$$ = [], $i$$ = 0;$i$$ < this.coords.length;$i$$++) {
    $color$$[$i$$] = Math.round(this.coords[$i$$])
  }
  $color$$ = "rgb(" + $color$$.join(",") + ")";
  this.element.style.backgroundColor = $color$$
};
goog.fx.dom.BgColorTransform.prototype.updateStyle = function $goog$fx$dom$BgColorTransform$$updateStyle$() {
  this.setColor()
};
goog.fx.dom.bgColorFadeIn = function $goog$fx$dom$bgColorFadeIn$($element$$, $anim$$6_start$$, $time$$, $opt_eventHandler$$) {
  function $setBgColor$$() {
    $element$$.style.backgroundColor = $initialBgColor$$
  }
  var $initialBgColor$$ = $element$$.style.backgroundColor || "", $computedBgColor_end$$ = goog.style.getBackgroundColor($element$$), $computedBgColor_end$$ = $computedBgColor_end$$ && "transparent" != $computedBgColor_end$$ && "rgba(0, 0, 0, 0)" != $computedBgColor_end$$ ? goog.color.hexToRgb(goog.color.parse($computedBgColor_end$$).hex) : [255, 255, 255], $anim$$6_start$$ = new goog.fx.dom.BgColorTransform($element$$, $anim$$6_start$$, $computedBgColor_end$$, $time$$);
  $opt_eventHandler$$ ? $opt_eventHandler$$.listen($anim$$6_start$$, goog.fx.Transition.EventType.END, $setBgColor$$) : goog.events.listen($anim$$6_start$$, goog.fx.Transition.EventType.END, $setBgColor$$);
  $anim$$6_start$$.play()
};
goog.fx.dom.ColorTransform = function $goog$fx$dom$ColorTransform$($element$$, $start$$, $end$$, $time$$, $opt_acc$$) {
  if(3 != $start$$.length || 3 != $end$$.length) {
    throw Error("Start and end points must be 3D");
  }
  goog.fx.dom.PredefinedEffect.apply(this, arguments)
};
goog.inherits(goog.fx.dom.ColorTransform, goog.fx.dom.PredefinedEffect);
goog.fx.dom.ColorTransform.prototype.updateStyle = function $goog$fx$dom$ColorTransform$$updateStyle$() {
  for(var $color$$5_coordsAsInts$$ = [], $i$$ = 0;$i$$ < this.coords.length;$i$$++) {
    $color$$5_coordsAsInts$$[$i$$] = Math.round(this.coords[$i$$])
  }
  $color$$5_coordsAsInts$$ = "rgb(" + $color$$5_coordsAsInts$$.join(",") + ")";
  this.element.style.color = $color$$5_coordsAsInts$$
};
goog.ui.RangeModel = function $goog$ui$RangeModel$() {
  goog.events.EventTarget.call(this)
};
goog.inherits(goog.ui.RangeModel, goog.events.EventTarget);
goog.ui.RangeModel.prototype.value_ = 0;
goog.ui.RangeModel.prototype.minimum_ = 0;
goog.ui.RangeModel.prototype.maximum_ = 100;
goog.ui.RangeModel.prototype.extent_ = 0;
goog.ui.RangeModel.prototype.step_ = 1;
goog.ui.RangeModel.prototype.isChanging_ = !1;
goog.ui.RangeModel.prototype.mute_ = !1;
goog.ui.RangeModel.prototype.setMute = function $goog$ui$RangeModel$$setMute$($muteValue$$) {
  this.mute_ = $muteValue$$
};
goog.ui.RangeModel.prototype.setValue = function $goog$ui$RangeModel$$setValue$($value$$) {
  $value$$ = this.roundToStepWithMin($value$$);
  this.value_ != $value$$ && (this.value_ = $value$$ + this.extent_ > this.maximum_ ? this.maximum_ - this.extent_ : $value$$ < this.minimum_ ? this.minimum_ : $value$$, !this.isChanging_ && !this.mute_ && this.dispatchEvent(goog.ui.Component.EventType.CHANGE))
};
goog.ui.RangeModel.prototype.getValue = function $goog$ui$RangeModel$$getValue$() {
  return this.roundToStepWithMin(this.value_)
};
goog.ui.RangeModel.prototype.setExtent = function $goog$ui$RangeModel$$setExtent$($extent$$) {
  $extent$$ = this.roundToStepWithMin($extent$$);
  this.extent_ != $extent$$ && (this.extent_ = 0 > $extent$$ ? 0 : this.value_ + $extent$$ > this.maximum_ ? this.maximum_ - this.value_ : $extent$$, !this.isChanging_ && !this.mute_ && this.dispatchEvent(goog.ui.Component.EventType.CHANGE))
};
goog.ui.RangeModel.prototype.getExtent = function $goog$ui$RangeModel$$getExtent$() {
  return this.roundToStep(this.extent_)
};
goog.ui.RangeModel.prototype.setMinimum = function $goog$ui$RangeModel$$setMinimum$($minimum$$) {
  if(this.minimum_ != $minimum$$) {
    var $oldIsChanging$$ = this.isChanging_;
    this.isChanging_ = !0;
    this.minimum_ = $minimum$$;
    $minimum$$ + this.extent_ > this.maximum_ && (this.extent_ = this.maximum_ - this.minimum_);
    $minimum$$ > this.value_ && this.setValue($minimum$$);
    $minimum$$ > this.maximum_ && (this.extent_ = 0, this.setMaximum($minimum$$), this.setValue($minimum$$));
    this.isChanging_ = $oldIsChanging$$;
    !this.isChanging_ && !this.mute_ && this.dispatchEvent(goog.ui.Component.EventType.CHANGE)
  }
};
goog.ui.RangeModel.prototype.getMinimum = function $goog$ui$RangeModel$$getMinimum$() {
  return this.roundToStepWithMin(this.minimum_)
};
goog.ui.RangeModel.prototype.setMaximum = function $goog$ui$RangeModel$$setMaximum$($maximum$$) {
  $maximum$$ = this.roundToStepWithMin($maximum$$);
  if(this.maximum_ != $maximum$$) {
    var $oldIsChanging$$ = this.isChanging_;
    this.isChanging_ = !0;
    this.maximum_ = $maximum$$;
    $maximum$$ < this.value_ + this.extent_ && this.setValue($maximum$$ - this.extent_);
    $maximum$$ < this.minimum_ && (this.extent_ = 0, this.setMinimum($maximum$$), this.setValue(this.maximum_));
    $maximum$$ < this.minimum_ + this.extent_ && (this.extent_ = this.maximum_ - this.minimum_);
    this.isChanging_ = $oldIsChanging$$;
    !this.isChanging_ && !this.mute_ && this.dispatchEvent(goog.ui.Component.EventType.CHANGE)
  }
};
goog.ui.RangeModel.prototype.getMaximum = function $goog$ui$RangeModel$$getMaximum$() {
  return this.roundToStepWithMin(this.maximum_)
};
goog.ui.RangeModel.prototype.getStep = function $goog$ui$RangeModel$$getStep$() {
  return this.step_
};
goog.ui.RangeModel.prototype.setStep = function $goog$ui$RangeModel$$setStep$($oldIsChanging$$2_step$$) {
  this.step_ != $oldIsChanging$$2_step$$ && (this.step_ = $oldIsChanging$$2_step$$, $oldIsChanging$$2_step$$ = this.isChanging_, this.isChanging_ = !0, this.setMaximum(this.getMaximum()), this.setExtent(this.getExtent()), this.setValue(this.getValue()), this.isChanging_ = $oldIsChanging$$2_step$$, !this.isChanging_ && !this.mute_ && this.dispatchEvent(goog.ui.Component.EventType.CHANGE))
};
goog.ui.RangeModel.prototype.roundToStepWithMin = function $goog$ui$RangeModel$$roundToStepWithMin$($value$$) {
  return null == this.step_ ? $value$$ : this.minimum_ + Math.round(($value$$ - this.minimum_) / this.step_) * this.step_
};
goog.ui.RangeModel.prototype.roundToStep = function $goog$ui$RangeModel$$roundToStep$($value$$) {
  return null == this.step_ ? $value$$ : Math.round($value$$ / this.step_) * this.step_
};
goog.ui.SliderBase = function $goog$ui$SliderBase$($opt_domHelper$$) {
  goog.ui.Component.call(this, $opt_domHelper$$);
  this.rangeModel = new goog.ui.RangeModel;
  goog.events.listen(this.rangeModel, goog.ui.Component.EventType.CHANGE, this.handleRangeModelChange, !1, this)
};
goog.inherits(goog.ui.SliderBase, goog.ui.Component);
goog.ui.SliderBase.Orientation = {VERTICAL:"vertical", HORIZONTAL:"horizontal"};
goog.ui.SliderBase.prototype.orientation_ = goog.ui.SliderBase.Orientation.HORIZONTAL;
goog.ui.SliderBase.MOUSE_DOWN_INCREMENT_INTERVAL_ = 200;
goog.ui.SliderBase.ANIMATION_INTERVAL_ = 100;
goog.ui.SliderBase.prototype.isAnimating_ = !1;
goog.ui.SliderBase.prototype.moveToPointEnabled_ = !1;
goog.ui.SliderBase.prototype.blockIncrement_ = 10;
goog.ui.SliderBase.prototype.minExtent_ = 0;
goog.ui.SliderBase.prototype.isHandleMouseWheel_ = !0;
goog.ui.SliderBase.prototype.enabled_ = !0;
goog.ui.SliderBase.prototype.flipForRtl_ = !1;
goog.ui.SliderBase.prototype.enableFlipForRtl = function $goog$ui$SliderBase$$enableFlipForRtl$($flipForRtl$$) {
  this.flipForRtl_ = $flipForRtl$$
};
goog.ui.SliderBase.prototype.createDom = function $goog$ui$SliderBase$$createDom$() {
  goog.ui.SliderBase.superClass_.createDom.call(this);
  var $element$$ = this.getDomHelper().createDom("div", this.getCssClass(this.orientation_));
  this.decorateInternal($element$$)
};
goog.ui.SliderBase.SLIDER_DRAGGING_CSS_CLASS_ = "goog-slider-dragging";
goog.ui.SliderBase.THUMB_DRAGGING_CSS_CLASS_ = "goog-slider-thumb-dragging";
goog.ui.SliderBase.DISABLED_CSS_CLASS_ = "goog-slider-disabled";
goog.ui.SliderBase.prototype.decorateInternal = function $goog$ui$SliderBase$$decorateInternal$($element$$) {
  goog.ui.SliderBase.superClass_.decorateInternal.call(this, $element$$);
  goog.dom.classes.add($element$$, this.getCssClass(this.orientation_));
  this.createThumbs();
  this.setAriaRoles()
};
goog.ui.SliderBase.prototype.enterDocument = function $goog$ui$SliderBase$$enterDocument$() {
  goog.ui.SliderBase.superClass_.enterDocument.call(this);
  this.valueDragger_ = new goog.fx.Dragger(this.valueThumb);
  this.extentDragger_ = new goog.fx.Dragger(this.extentThumb);
  this.valueDragger_.enableRightPositioningForRtl(this.flipForRtl_);
  this.extentDragger_.enableRightPositioningForRtl(this.flipForRtl_);
  this.valueDragger_.defaultAction = this.extentDragger_.defaultAction = goog.nullFunction;
  this.keyHandler_ = new goog.events.KeyHandler(this.getElement());
  this.enableEventHandlers_(!0);
  this.getElement().tabIndex = 0;
  this.updateUi_()
};
goog.ui.SliderBase.prototype.enableEventHandlers_ = function $goog$ui$SliderBase$$enableEventHandlers_$($enable$$) {
  $enable$$ ? (this.getHandler().listen(this.valueDragger_, goog.fx.Dragger.EventType.BEFOREDRAG, this.handleBeforeDrag_).listen(this.extentDragger_, goog.fx.Dragger.EventType.BEFOREDRAG, this.handleBeforeDrag_).listen(this.valueDragger_, [goog.fx.Dragger.EventType.START, goog.fx.Dragger.EventType.END], this.handleThumbDragStartEnd_).listen(this.extentDragger_, [goog.fx.Dragger.EventType.START, goog.fx.Dragger.EventType.END], this.handleThumbDragStartEnd_).listen(this.keyHandler_, goog.events.KeyHandler.EventType.KEY, 
  this.handleKeyDown_).listen(this.getElement(), goog.events.EventType.MOUSEDOWN, this.handleMouseDown_), this.isHandleMouseWheel() && this.enableMouseWheelHandling_(!0)) : (this.getHandler().unlisten(this.valueDragger_, goog.fx.Dragger.EventType.BEFOREDRAG, this.handleBeforeDrag_).unlisten(this.extentDragger_, goog.fx.Dragger.EventType.BEFOREDRAG, this.handleBeforeDrag_).unlisten(this.valueDragger_, [goog.fx.Dragger.EventType.START, goog.fx.Dragger.EventType.END], this.handleThumbDragStartEnd_).unlisten(this.extentDragger_, 
  [goog.fx.Dragger.EventType.START, goog.fx.Dragger.EventType.END], this.handleThumbDragStartEnd_).unlisten(this.keyHandler_, goog.events.KeyHandler.EventType.KEY, this.handleKeyDown_).unlisten(this.getElement(), goog.events.EventType.MOUSEDOWN, this.handleMouseDown_), this.isHandleMouseWheel() && this.enableMouseWheelHandling_(!1))
};
goog.ui.SliderBase.prototype.exitDocument = function $goog$ui$SliderBase$$exitDocument$() {
  goog.ui.SliderBase.superClass_.exitDocument.call(this);
  goog.disposeAll(this.valueDragger_, this.extentDragger_, this.keyHandler_, this.mouseWheelHandler_)
};
goog.ui.SliderBase.prototype.handleBeforeDrag_ = function $goog$ui$SliderBase$$handleBeforeDrag_$($e$$) {
  var $thumbToDrag$$ = $e$$.dragger == this.valueDragger_ ? this.valueThumb : this.extentThumb, $availHeight_availWidth_value$$;
  this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL ? ($availHeight_availWidth_value$$ = this.getElement().clientHeight - $thumbToDrag$$.offsetHeight, $availHeight_availWidth_value$$ = ($availHeight_availWidth_value$$ - $e$$.top) / $availHeight_availWidth_value$$ * (this.getMaximum() - this.getMinimum()) + this.getMinimum()) : ($availHeight_availWidth_value$$ = this.getElement().clientWidth - $thumbToDrag$$.offsetWidth, $availHeight_availWidth_value$$ = $e$$.left / $availHeight_availWidth_value$$ * 
  (this.getMaximum() - this.getMinimum()) + this.getMinimum());
  $availHeight_availWidth_value$$ = $e$$.dragger == this.valueDragger_ ? Math.min(Math.max($availHeight_availWidth_value$$, this.getMinimum()), this.getValue() + this.getExtent()) : Math.min(Math.max($availHeight_availWidth_value$$, this.getValue()), this.getMaximum());
  this.setThumbPosition_($thumbToDrag$$, $availHeight_availWidth_value$$)
};
goog.ui.SliderBase.prototype.handleThumbDragStartEnd_ = function $goog$ui$SliderBase$$handleThumbDragStartEnd_$($e$$) {
  var $enable$$ = $e$$.type == goog.fx.Dragger.EventType.START;
  goog.dom.classes.enable(this.getElement(), goog.ui.SliderBase.SLIDER_DRAGGING_CSS_CLASS_, $enable$$);
  goog.dom.classes.enable($e$$.target.handle, goog.ui.SliderBase.THUMB_DRAGGING_CSS_CLASS_, $enable$$)
};
goog.ui.SliderBase.prototype.handleKeyDown_ = function $goog$ui$SliderBase$$handleKeyDown_$($e$$) {
  var $handled$$ = !0;
  switch($e$$.keyCode) {
    case goog.events.KeyCodes.HOME:
      this.animatedSetValue(this.getMinimum());
      break;
    case goog.events.KeyCodes.END:
      this.animatedSetValue(this.getMaximum());
      break;
    case goog.events.KeyCodes.PAGE_UP:
      this.moveThumbs(this.getBlockIncrement());
      break;
    case goog.events.KeyCodes.PAGE_DOWN:
      this.moveThumbs(-this.getBlockIncrement());
      break;
    case goog.events.KeyCodes.LEFT:
      var $sign$$ = this.flipForRtl_ && this.isRightToLeft() ? 1 : -1;
      this.moveThumbs($e$$.shiftKey ? $sign$$ * this.getBlockIncrement() : $sign$$ * this.getUnitIncrement());
      break;
    case goog.events.KeyCodes.DOWN:
      this.moveThumbs($e$$.shiftKey ? -this.getBlockIncrement() : -this.getUnitIncrement());
      break;
    case goog.events.KeyCodes.RIGHT:
      $sign$$ = this.flipForRtl_ && this.isRightToLeft() ? -1 : 1;
      this.moveThumbs($e$$.shiftKey ? $sign$$ * this.getBlockIncrement() : $sign$$ * this.getUnitIncrement());
      break;
    case goog.events.KeyCodes.UP:
      this.moveThumbs($e$$.shiftKey ? this.getBlockIncrement() : this.getUnitIncrement());
      break;
    default:
      $handled$$ = !1
  }
  $handled$$ && $e$$.preventDefault()
};
goog.ui.SliderBase.prototype.handleMouseDown_ = function $goog$ui$SliderBase$$handleMouseDown_$($e$$) {
  this.getElement().focus && this.getElement().focus();
  var $target$$ = $e$$.target;
  !goog.dom.contains(this.valueThumb, $target$$) && !goog.dom.contains(this.extentThumb, $target$$) && (this.moveToPointEnabled_ ? this.animatedSetValue(this.getValueFromMousePosition($e$$)) : this.startBlockIncrementing_($e$$))
};
goog.ui.SliderBase.prototype.handleMouseWheel_ = function $goog$ui$SliderBase$$handleMouseWheel_$($e$$) {
  this.moveThumbs((0 < $e$$.detail ? -1 : 1) * this.getUnitIncrement());
  $e$$.preventDefault()
};
goog.ui.SliderBase.prototype.startBlockIncrementing_ = function $goog$ui$SliderBase$$startBlockIncrementing_$($doc$$41_e$$) {
  this.storeMousePos_($doc$$41_e$$);
  this.thumbToMove_ = this.getClosestThumb_(this.getValueFromMousePosition($doc$$41_e$$));
  this.incrementing_ = this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL ? this.lastMousePosition_ < this.thumbToMove_.offsetTop : this.lastMousePosition_ > this.getOffsetStart_(this.thumbToMove_) + this.thumbToMove_.offsetWidth;
  $doc$$41_e$$ = goog.dom.getOwnerDocument(this.getElement());
  this.getHandler().listen($doc$$41_e$$, goog.events.EventType.MOUSEUP, this.stopBlockIncrementing_, !0).listen(this.getElement(), goog.events.EventType.MOUSEMOVE, this.storeMousePos_);
  this.incTimer_ || (this.incTimer_ = new goog.Timer(goog.ui.SliderBase.MOUSE_DOWN_INCREMENT_INTERVAL_), this.getHandler().listen(this.incTimer_, goog.Timer.TICK, this.handleTimerTick_));
  this.handleTimerTick_();
  this.incTimer_.start()
};
goog.ui.SliderBase.prototype.handleTimerTick_ = function $goog$ui$SliderBase$$handleTimerTick_$() {
  var $value$$;
  if(this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL) {
    var $mouseX_mouseY$$ = this.lastMousePosition_, $thumbX_thumbY$$ = this.thumbToMove_.offsetTop;
    this.incrementing_ ? $mouseX_mouseY$$ < $thumbX_thumbY$$ && ($value$$ = this.getThumbPosition_(this.thumbToMove_) + this.getBlockIncrement()) : $mouseX_mouseY$$ > $thumbX_thumbY$$ + this.thumbToMove_.offsetHeight && ($value$$ = this.getThumbPosition_(this.thumbToMove_) - this.getBlockIncrement())
  }else {
    $mouseX_mouseY$$ = this.lastMousePosition_, $thumbX_thumbY$$ = this.getOffsetStart_(this.thumbToMove_), this.incrementing_ ? $mouseX_mouseY$$ > $thumbX_thumbY$$ + this.thumbToMove_.offsetWidth && ($value$$ = this.getThumbPosition_(this.thumbToMove_) + this.getBlockIncrement()) : $mouseX_mouseY$$ < $thumbX_thumbY$$ && ($value$$ = this.getThumbPosition_(this.thumbToMove_) - this.getBlockIncrement())
  }
  goog.isDef($value$$) && this.setThumbPosition_(this.thumbToMove_, $value$$)
};
goog.ui.SliderBase.prototype.stopBlockIncrementing_ = function $goog$ui$SliderBase$$stopBlockIncrementing_$() {
  this.incTimer_ && this.incTimer_.stop();
  var $doc$$ = goog.dom.getOwnerDocument(this.getElement());
  this.getHandler().unlisten($doc$$, goog.events.EventType.MOUSEUP, this.stopBlockIncrementing_, !0).unlisten(this.getElement(), goog.events.EventType.MOUSEMOVE, this.storeMousePos_)
};
goog.ui.SliderBase.prototype.getRelativeMousePos_ = function $goog$ui$SliderBase$$getRelativeMousePos_$($coord$$4_e$$) {
  $coord$$4_e$$ = goog.style.getRelativePosition($coord$$4_e$$, this.getElement());
  return this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL ? $coord$$4_e$$.y : this.flipForRtl_ && this.isRightToLeft() ? this.getElement().clientWidth - $coord$$4_e$$.x : $coord$$4_e$$.x
};
goog.ui.SliderBase.prototype.storeMousePos_ = function $goog$ui$SliderBase$$storeMousePos_$($e$$) {
  this.lastMousePosition_ = this.getRelativeMousePos_($e$$)
};
goog.ui.SliderBase.prototype.getValueFromMousePosition = function $goog$ui$SliderBase$$getValueFromMousePosition$($e$$74_x$$78_y$$) {
  var $min$$ = this.getMinimum(), $max$$ = this.getMaximum();
  if(this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL) {
    var $thumbH$$1_thumbW$$ = this.valueThumb.offsetHeight, $availH_availW$$ = this.getElement().clientHeight - $thumbH$$1_thumbW$$, $e$$74_x$$78_y$$ = this.getRelativeMousePos_($e$$74_x$$78_y$$) - $thumbH$$1_thumbW$$ / 2;
    return($max$$ - $min$$) * ($availH_availW$$ - $e$$74_x$$78_y$$) / $availH_availW$$ + $min$$
  }
  $thumbH$$1_thumbW$$ = this.valueThumb.offsetWidth;
  $availH_availW$$ = this.getElement().clientWidth - $thumbH$$1_thumbW$$;
  $e$$74_x$$78_y$$ = this.getRelativeMousePos_($e$$74_x$$78_y$$) - $thumbH$$1_thumbW$$ / 2;
  return($max$$ - $min$$) * $e$$74_x$$78_y$$ / $availH_availW$$ + $min$$
};
goog.ui.SliderBase.prototype.getValueFromMousePosition_ = goog.ui.SliderBase.prototype.getValueFromMousePosition;
goog.ui.SliderBase.prototype.getThumbPosition_ = function $goog$ui$SliderBase$$getThumbPosition_$($thumb$$) {
  if($thumb$$ == this.valueThumb) {
    return this.rangeModel.getValue()
  }
  if($thumb$$ == this.extentThumb) {
    return this.rangeModel.getValue() + this.rangeModel.getExtent()
  }
  throw Error("Illegal thumb element. Neither minThumb nor maxThumb");
};
goog.ui.SliderBase.prototype.moveThumbs = function $goog$ui$SliderBase$$moveThumbs$($delta$$) {
  var $newMinPos$$ = this.getThumbPosition_(this.valueThumb) + $delta$$, $delta$$ = this.getThumbPosition_(this.extentThumb) + $delta$$, $newMinPos$$ = goog.math.clamp($newMinPos$$, this.getMinimum(), this.getMaximum() - this.minExtent_), $delta$$ = goog.math.clamp($delta$$, this.getMinimum() + this.minExtent_, this.getMaximum());
  this.setValueAndExtent($newMinPos$$, $delta$$ - $newMinPos$$)
};
goog.ui.SliderBase.prototype.setThumbPosition_ = function $goog$ui$SliderBase$$setThumbPosition_$($thumb$$, $position$$) {
  var $intermediateExtent$$ = null;
  $thumb$$ == this.extentThumb && ($position$$ <= this.rangeModel.getMaximum() && $position$$ >= this.rangeModel.getValue() + this.minExtent_) && ($intermediateExtent$$ = $position$$ - this.rangeModel.getValue());
  var $currentExtent_newExtent$$ = $intermediateExtent$$ || this.rangeModel.getExtent();
  $thumb$$ == this.valueThumb && ($position$$ >= this.getMinimum() && $position$$ <= this.rangeModel.getValue() + $currentExtent_newExtent$$ - this.minExtent_) && ($currentExtent_newExtent$$ -= $position$$ - this.rangeModel.getValue(), this.rangeModel.roundToStepWithMin($position$$) + this.rangeModel.roundToStepWithMin($currentExtent_newExtent$$) == this.rangeModel.roundToStepWithMin($position$$ + $currentExtent_newExtent$$) && (this.setValueAndExtent($position$$, $currentExtent_newExtent$$), $intermediateExtent$$ = 
  null));
  null != $intermediateExtent$$ && this.rangeModel.setExtent($intermediateExtent$$)
};
goog.ui.SliderBase.prototype.setValueAndExtent = function $goog$ui$SliderBase$$setValueAndExtent$($value$$, $extent$$) {
  this.getMinimum() <= $value$$ && ($value$$ <= this.getMaximum() - $extent$$ && this.minExtent_ <= $extent$$ && $extent$$ <= this.getMaximum() - $value$$) && !($value$$ == this.getValue() && $extent$$ == this.getExtent()) && (this.rangeModel.setMute(!0), this.rangeModel.setExtent(0), this.rangeModel.setValue($value$$), this.rangeModel.setExtent($extent$$), this.rangeModel.setMute(!1), this.handleRangeModelChange(null))
};
goog.ui.SliderBase.prototype.getMinimum = function $goog$ui$SliderBase$$getMinimum$() {
  return this.rangeModel.getMinimum()
};
goog.ui.SliderBase.prototype.setMinimum = function $goog$ui$SliderBase$$setMinimum$($min$$) {
  this.rangeModel.setMinimum($min$$)
};
goog.ui.SliderBase.prototype.getMaximum = function $goog$ui$SliderBase$$getMaximum$() {
  return this.rangeModel.getMaximum()
};
goog.ui.SliderBase.prototype.setMaximum = function $goog$ui$SliderBase$$setMaximum$($max$$) {
  this.rangeModel.setMaximum($max$$)
};
goog.ui.SliderBase.prototype.getValueThumb = function $goog$ui$SliderBase$$getValueThumb$() {
  return this.valueThumb
};
goog.ui.SliderBase.prototype.getExtentThumb = function $goog$ui$SliderBase$$getExtentThumb$() {
  return this.extentThumb
};
goog.ui.SliderBase.prototype.getClosestThumb_ = function $goog$ui$SliderBase$$getClosestThumb_$($position$$) {
  return $position$$ <= this.rangeModel.getValue() + this.rangeModel.getExtent() / 2 ? this.valueThumb : this.extentThumb
};
goog.ui.SliderBase.prototype.handleRangeModelChange = function $goog$ui$SliderBase$$handleRangeModelChange$() {
  this.updateUi_();
  this.updateAriaStates();
  this.dispatchEvent(goog.ui.Component.EventType.CHANGE)
};
goog.ui.SliderBase.prototype.updateUi_ = function $goog$ui$SliderBase$$updateUi_$() {
  if(this.valueThumb && !this.isAnimating_) {
    var $highlightPositioning_minCoord$$ = this.getThumbCoordinateForValue(this.getThumbPosition_(this.valueThumb)), $maxCoord$$ = this.getThumbCoordinateForValue(this.getThumbPosition_(this.extentThumb));
    if(this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL) {
      this.valueThumb.style.top = $highlightPositioning_minCoord$$.y + "px", this.extentThumb.style.top = $maxCoord$$.y + "px", this.rangeHighlight && ($highlightPositioning_minCoord$$ = this.calculateRangeHighlightPositioning_($maxCoord$$.y, $highlightPositioning_minCoord$$.y, this.valueThumb.offsetHeight), this.rangeHighlight.style.top = $highlightPositioning_minCoord$$.offset + "px", this.rangeHighlight.style.height = $highlightPositioning_minCoord$$.size + "px")
    }else {
      var $pos$$ = this.flipForRtl_ && this.isRightToLeft() ? "right" : "left";
      this.valueThumb.style[$pos$$] = $highlightPositioning_minCoord$$.x + "px";
      this.extentThumb.style[$pos$$] = $maxCoord$$.x + "px";
      this.rangeHighlight && ($highlightPositioning_minCoord$$ = this.calculateRangeHighlightPositioning_($highlightPositioning_minCoord$$.x, $maxCoord$$.x, this.valueThumb.offsetWidth), this.rangeHighlight.style[$pos$$] = $highlightPositioning_minCoord$$.offset + "px", this.rangeHighlight.style.width = $highlightPositioning_minCoord$$.size + "px")
    }
  }
};
goog.ui.SliderBase.prototype.calculateRangeHighlightPositioning_ = function $goog$ui$SliderBase$$calculateRangeHighlightPositioning_$($firstThumbPos$$, $secondThumbPos$$, $thumbSize$$) {
  var $highlightInset$$ = Math.ceil($thumbSize$$ / 2);
  return{offset:$firstThumbPos$$ + $highlightInset$$, size:Math.max($secondThumbPos$$ - $firstThumbPos$$ + $thumbSize$$ - 2 * $highlightInset$$, 0)}
};
goog.ui.SliderBase.prototype.getThumbCoordinateForValue = function $goog$ui$SliderBase$$getThumbCoordinateForValue$($bottom$$6_left$$12_ratio_val$$) {
  var $coord$$ = new goog.math.Coordinate;
  if(this.valueThumb) {
    var $h$$14_min$$5_thumbHeight_w$$ = this.getMinimum(), $max$$ = this.getMaximum(), $bottom$$6_left$$12_ratio_val$$ = $bottom$$6_left$$12_ratio_val$$ == $h$$14_min$$5_thumbHeight_w$$ && $h$$14_min$$5_thumbHeight_w$$ == $max$$ ? 0 : ($bottom$$6_left$$12_ratio_val$$ - $h$$14_min$$5_thumbHeight_w$$) / ($max$$ - $h$$14_min$$5_thumbHeight_w$$);
    this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL ? ($h$$14_min$$5_thumbHeight_w$$ = this.valueThumb.offsetHeight, $h$$14_min$$5_thumbHeight_w$$ = this.getElement().clientHeight - $h$$14_min$$5_thumbHeight_w$$, $bottom$$6_left$$12_ratio_val$$ = Math.round($bottom$$6_left$$12_ratio_val$$ * $h$$14_min$$5_thumbHeight_w$$), $coord$$.y = $h$$14_min$$5_thumbHeight_w$$ - $bottom$$6_left$$12_ratio_val$$) : ($h$$14_min$$5_thumbHeight_w$$ = this.getElement().clientWidth - this.valueThumb.offsetWidth, 
    $bottom$$6_left$$12_ratio_val$$ = Math.round($bottom$$6_left$$12_ratio_val$$ * $h$$14_min$$5_thumbHeight_w$$), $coord$$.x = $bottom$$6_left$$12_ratio_val$$)
  }
  return $coord$$
};
goog.ui.SliderBase.prototype.getThumbCoordinateForValue_ = goog.ui.SliderBase.prototype.getThumbCoordinateForValue;
goog.ui.SliderBase.prototype.animatedSetValue = function $goog$ui$SliderBase$$animatedSetValue$($coord$$6_v$$) {
  $coord$$6_v$$ = goog.math.clamp($coord$$6_v$$, this.getMinimum(), this.getMaximum());
  this.isAnimating_ && this.currentAnimation_.stop(!0);
  var $animations$$ = new goog.fx.AnimationParallelQueue, $end$$, $thumb$$ = this.getClosestThumb_($coord$$6_v$$), $previousValue$$ = this.getValue(), $previousExtent$$ = this.getExtent();
  $end$$ = this.getThumbPosition_($thumb$$);
  var $previousCoord_slide$$ = this.getThumbCoordinateForValue($end$$), $stepSize$$ = this.getStep();
  Math.abs($coord$$6_v$$ - $end$$) < $stepSize$$ && ($coord$$6_v$$ = goog.math.clamp($end$$ + ($coord$$6_v$$ > $end$$ ? $stepSize$$ : -$stepSize$$), this.getMinimum(), this.getMaximum()));
  this.setThumbPosition_($thumb$$, $coord$$6_v$$);
  $coord$$6_v$$ = this.getThumbCoordinateForValue(this.getThumbPosition_($thumb$$));
  $end$$ = this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL ? [this.getOffsetStart_($thumb$$), $coord$$6_v$$.y] : [$coord$$6_v$$.x, $thumb$$.offsetTop];
  $previousCoord_slide$$ = new goog.fx.dom.Slide($thumb$$, [$previousCoord_slide$$.x, $previousCoord_slide$$.y], $end$$, goog.ui.SliderBase.ANIMATION_INTERVAL_);
  $previousCoord_slide$$.enableRightPositioningForRtl(this.flipForRtl_);
  $animations$$.add($previousCoord_slide$$);
  this.rangeHighlight && this.addRangeHighlightAnimations_($thumb$$, $previousValue$$, $previousExtent$$, $coord$$6_v$$, $animations$$);
  this.currentAnimation_ = $animations$$;
  this.getHandler().listen($animations$$, goog.fx.Transition.EventType.END, this.endAnimation_);
  this.isAnimating_ = !0;
  $animations$$.play(!1)
};
goog.ui.SliderBase.prototype.addRangeHighlightAnimations_ = function $goog$ui$SliderBase$$addRangeHighlightAnimations_$($previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$, $minCoord$$1_previousValue$$, $maxCoord$$1_previousExtent$$, $newCoord_slide$$, $animations$$) {
  var $highlightPositioning$$ = this.getThumbCoordinateForValue($minCoord$$1_previousValue$$), $previousMaxCoord$$ = this.getThumbCoordinateForValue($minCoord$$1_previousValue$$ + $maxCoord$$1_previousExtent$$), $minCoord$$1_previousValue$$ = $highlightPositioning$$, $maxCoord$$1_previousExtent$$ = $previousMaxCoord$$;
  $previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$ == this.valueThumb ? $minCoord$$1_previousValue$$ = $newCoord_slide$$ : $maxCoord$$1_previousExtent$$ = $newCoord_slide$$;
  this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL ? ($previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$ = this.calculateRangeHighlightPositioning_($previousMaxCoord$$.y, $highlightPositioning$$.y, this.valueThumb.offsetHeight), $highlightPositioning$$ = this.calculateRangeHighlightPositioning_($maxCoord$$1_previousExtent$$.y, $minCoord$$1_previousValue$$.y, this.valueThumb.offsetHeight), $newCoord_slide$$ = new goog.fx.dom.Slide(this.rangeHighlight, [this.getOffsetStart_(this.rangeHighlight), 
  $previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$.offset], [this.getOffsetStart_(this.rangeHighlight), $highlightPositioning$$.offset], goog.ui.SliderBase.ANIMATION_INTERVAL_), $previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$ = new goog.fx.dom.ResizeHeight(this.rangeHighlight, $previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$.size, $highlightPositioning$$.size, goog.ui.SliderBase.ANIMATION_INTERVAL_)) : ($previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$ = 
  this.calculateRangeHighlightPositioning_($highlightPositioning$$.x, $previousMaxCoord$$.x, this.valueThumb.offsetWidth), $highlightPositioning$$ = this.calculateRangeHighlightPositioning_($minCoord$$1_previousValue$$.x, $maxCoord$$1_previousExtent$$.x, this.valueThumb.offsetWidth), $newCoord_slide$$ = new goog.fx.dom.Slide(this.rangeHighlight, [$previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$.offset, this.rangeHighlight.offsetTop], [$highlightPositioning$$.offset, this.rangeHighlight.offsetTop], 
  goog.ui.SliderBase.ANIMATION_INTERVAL_), $previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$ = new goog.fx.dom.ResizeWidth(this.rangeHighlight, $previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$.size, $highlightPositioning$$.size, goog.ui.SliderBase.ANIMATION_INTERVAL_));
  $newCoord_slide$$.enableRightPositioningForRtl(this.flipForRtl_);
  $previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$.enableRightPositioningForRtl(this.flipForRtl_);
  $animations$$.add($newCoord_slide$$);
  $animations$$.add($previousHighlightPositioning_resizeHeight_resizeWidth_thumb$$)
};
goog.ui.SliderBase.prototype.endAnimation_ = function $goog$ui$SliderBase$$endAnimation_$() {
  this.isAnimating_ = !1
};
goog.ui.SliderBase.prototype.setOrientation = function $goog$ui$SliderBase$$setOrientation$($orient_pos$$) {
  if(this.orientation_ != $orient_pos$$) {
    var $oldCss$$ = this.getCssClass(this.orientation_), $newCss$$ = this.getCssClass($orient_pos$$);
    this.orientation_ = $orient_pos$$;
    this.getElement() && (goog.dom.classes.swap(this.getElement(), $oldCss$$, $newCss$$), $orient_pos$$ = this.flipForRtl_ && this.isRightToLeft() ? "right" : "left", this.valueThumb.style[$orient_pos$$] = this.valueThumb.style.top = "", this.extentThumb.style[$orient_pos$$] = this.extentThumb.style.top = "", this.rangeHighlight && (this.rangeHighlight.style[$orient_pos$$] = this.rangeHighlight.style.top = "", this.rangeHighlight.style.width = this.rangeHighlight.style.height = ""), this.updateUi_())
  }
};
goog.ui.SliderBase.prototype.getOrientation = function $goog$ui$SliderBase$$getOrientation$() {
  return this.orientation_
};
goog.ui.SliderBase.prototype.disposeInternal = function $goog$ui$SliderBase$$disposeInternal$() {
  goog.ui.SliderBase.superClass_.disposeInternal.call(this);
  this.incTimer_ && this.incTimer_.dispose();
  delete this.incTimer_;
  this.currentAnimation_ && this.currentAnimation_.dispose();
  delete this.currentAnimation_;
  delete this.valueThumb;
  delete this.extentThumb;
  this.rangeHighlight && delete this.rangeHighlight;
  this.rangeModel.dispose();
  delete this.rangeModel;
  this.keyHandler_ && (this.keyHandler_.dispose(), delete this.keyHandler_);
  this.mouseWheelHandler_ && (this.mouseWheelHandler_.dispose(), delete this.mouseWheelHandler_);
  this.valueDragger_ && (this.valueDragger_.dispose(), delete this.valueDragger_);
  this.extentDragger_ && (this.extentDragger_.dispose(), delete this.extentDragger_)
};
goog.ui.SliderBase.prototype.getBlockIncrement = function $goog$ui$SliderBase$$getBlockIncrement$() {
  return this.blockIncrement_
};
goog.ui.SliderBase.prototype.setBlockIncrement = function $goog$ui$SliderBase$$setBlockIncrement$($value$$) {
  this.blockIncrement_ = $value$$
};
goog.ui.SliderBase.prototype.setMinExtent = function $goog$ui$SliderBase$$setMinExtent$($value$$) {
  this.minExtent_ = $value$$
};
goog.ui.SliderBase.prototype.unitIncrement_ = 1;
goog.ui.SliderBase.prototype.getUnitIncrement = function $goog$ui$SliderBase$$getUnitIncrement$() {
  return this.unitIncrement_
};
goog.ui.SliderBase.prototype.setUnitIncrement = function $goog$ui$SliderBase$$setUnitIncrement$($value$$) {
  this.unitIncrement_ = $value$$
};
goog.ui.SliderBase.prototype.getStep = function $goog$ui$SliderBase$$getStep$() {
  return this.rangeModel.getStep()
};
goog.ui.SliderBase.prototype.setStep = function $goog$ui$SliderBase$$setStep$($step$$) {
  this.rangeModel.setStep($step$$)
};
goog.ui.SliderBase.prototype.getMoveToPointEnabled = function $goog$ui$SliderBase$$getMoveToPointEnabled$() {
  return this.moveToPointEnabled_
};
goog.ui.SliderBase.prototype.setMoveToPointEnabled = function $goog$ui$SliderBase$$setMoveToPointEnabled$($val$$) {
  this.moveToPointEnabled_ = $val$$
};
goog.ui.SliderBase.prototype.getValue = function $goog$ui$SliderBase$$getValue$() {
  return this.rangeModel.getValue()
};
goog.ui.SliderBase.prototype.setValue = function $goog$ui$SliderBase$$setValue$($value$$) {
  this.setThumbPosition_(this.valueThumb, $value$$)
};
goog.ui.SliderBase.prototype.getExtent = function $goog$ui$SliderBase$$getExtent$() {
  return this.rangeModel.getExtent()
};
goog.ui.SliderBase.prototype.setExtent = function $goog$ui$SliderBase$$setExtent$($extent$$) {
  this.setThumbPosition_(this.extentThumb, this.rangeModel.getValue() + $extent$$)
};
goog.ui.SliderBase.prototype.setVisible = function $goog$ui$SliderBase$$setVisible$($visible$$) {
  goog.style.showElement(this.getElement(), $visible$$);
  $visible$$ && this.updateUi_()
};
goog.ui.SliderBase.prototype.setAriaRoles = function $goog$ui$SliderBase$$setAriaRoles$() {
  goog.dom.a11y.setRole(this.getElement(), goog.dom.a11y.Role.SLIDER);
  this.updateAriaStates()
};
goog.ui.SliderBase.prototype.updateAriaStates = function $goog$ui$SliderBase$$updateAriaStates$() {
  var $element$$ = this.getElement();
  $element$$ && (goog.dom.a11y.setState($element$$, goog.dom.a11y.State.VALUEMIN, this.getMinimum()), goog.dom.a11y.setState($element$$, goog.dom.a11y.State.VALUEMAX, this.getMaximum()), goog.dom.a11y.setState($element$$, goog.dom.a11y.State.VALUENOW, this.getValue()))
};
goog.ui.SliderBase.prototype.setHandleMouseWheel = function $goog$ui$SliderBase$$setHandleMouseWheel$($enable$$) {
  this.isInDocument() && $enable$$ != this.isHandleMouseWheel() && this.enableMouseWheelHandling_($enable$$);
  this.isHandleMouseWheel_ = $enable$$
};
goog.ui.SliderBase.prototype.isHandleMouseWheel = function $goog$ui$SliderBase$$isHandleMouseWheel$() {
  return this.isHandleMouseWheel_
};
goog.ui.SliderBase.prototype.enableMouseWheelHandling_ = function $goog$ui$SliderBase$$enableMouseWheelHandling_$($enable$$) {
  $enable$$ ? (this.mouseWheelHandler_ || (this.mouseWheelHandler_ = new goog.events.MouseWheelHandler(this.getElement())), this.getHandler().listen(this.mouseWheelHandler_, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.handleMouseWheel_)) : this.getHandler().unlisten(this.mouseWheelHandler_, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.handleMouseWheel_)
};
goog.ui.SliderBase.prototype.setEnabled = function $goog$ui$SliderBase$$setEnabled$($enable$$) {
  if(this.enabled_ != $enable$$ && this.dispatchEvent($enable$$ ? goog.ui.Component.EventType.ENABLE : goog.ui.Component.EventType.DISABLE)) {
    this.enabled_ = $enable$$, this.enableEventHandlers_($enable$$), $enable$$ || this.stopBlockIncrementing_(), goog.dom.classes.enable(this.getElement(), goog.ui.SliderBase.DISABLED_CSS_CLASS_, !$enable$$)
  }
};
goog.ui.SliderBase.prototype.isEnabled = function $goog$ui$SliderBase$$isEnabled$() {
  return this.enabled_
};
goog.ui.SliderBase.prototype.getOffsetStart_ = function $goog$ui$SliderBase$$getOffsetStart_$($element$$) {
  return this.flipForRtl_ ? goog.style.bidi.getOffsetStart($element$$) : $element$$.offsetLeft
};
goog.ui.Slider = function $goog$ui$Slider$($opt_domHelper$$) {
  goog.ui.SliderBase.call(this, $opt_domHelper$$);
  this.rangeModel.setExtent(0)
};
goog.inherits(goog.ui.Slider, goog.ui.SliderBase);
goog.ui.Slider.Orientation = goog.ui.SliderBase.Orientation;
goog.ui.Slider.CSS_CLASS_PREFIX = "goog-slider";
goog.ui.Slider.THUMB_CSS_CLASS = goog.ui.Slider.CSS_CLASS_PREFIX + "-thumb";
goog.ui.Slider.prototype.getCssClass = function $goog$ui$Slider$$getCssClass$($orient$$) {
  return $orient$$ == goog.ui.SliderBase.Orientation.VERTICAL ? goog.ui.Slider.CSS_CLASS_PREFIX + "-vertical" : goog.ui.Slider.CSS_CLASS_PREFIX + "-horizontal"
};
goog.ui.Slider.prototype.createThumbs = function $goog$ui$Slider$$createThumbs$() {
  var $element$$ = this.getElement(), $thumb$$ = goog.dom.getElementsByTagNameAndClass(null, goog.ui.Slider.THUMB_CSS_CLASS, $element$$)[0];
  $thumb$$ || ($thumb$$ = this.createThumb_(), $element$$.appendChild($thumb$$));
  this.valueThumb = this.extentThumb = $thumb$$
};
goog.ui.Slider.prototype.createThumb_ = function $goog$ui$Slider$$createThumb_$() {
  var $thumb$$ = this.getDomHelper().createDom("div", goog.ui.Slider.THUMB_CSS_CLASS);
  goog.dom.a11y.setRole($thumb$$, goog.dom.a11y.Role.BUTTON);
  return $thumb$$
};
vgps3.chart.Sliders = function $vgps3$chart$Sliders$($opt_domHelper$$) {
  goog.ui.Component.call(this, $opt_domHelper$$)
};
goog.inherits(vgps3.chart.Sliders, goog.ui.Component);
vgps3.chart.Sliders.prototype.addSlider = function $vgps3$chart$Sliders$$addSlider$($label$$, $element$$, $color$$) {
  var $slider$$ = new goog.ui.Slider, $thumb$$;
  this.addChild($slider$$, !0);
  $slider$$.setMoveToPointEnabled(!0);
  $slider$$.setValue(100 * goog.style.getOpacity($element$$));
  $thumb$$ = goog.dom.getElementsByTagNameAndClass(null, goog.ui.Slider.THUMB_CSS_CLASS, $slider$$.getElement())[0];
  goog.style.setStyle($thumb$$, "background-color", $color$$);
  goog.style.setOpacity($thumb$$, goog.style.getOpacity($element$$));
  this.getHandler().listen($slider$$, goog.ui.Component.EventType.CHANGE, function() {
    var $opacity$$ = $slider$$.getValue() / 100;
    goog.style.setOpacity($element$$, $opacity$$);
    goog.style.setOpacity($thumb$$, Math.max(0.2, $opacity$$))
  })
};
vgps3.chart.Sliders.prototype.getTitleElement = function $vgps3$chart$Sliders$$getTitleElement$() {
  if(!this.isInDocument()) {
    throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
  }
  return this.title_
};
vgps3.chart.Sliders.prototype.createDom = function $vgps3$chart$Sliders$$createDom$() {
  this.element_ = this.dom_.createElement("div");
  goog.dom.append(this.element_, this.title_ = goog.dom.createDom("div", "vgps3-sliders-title", goog.dom.htmlToDocumentFragment("<h1>VisuGps?</h1>")));
  goog.style.setStyle(this.element_, {width:"100%", height:"100%"})
};
vgps3.chart.Sliders.prototype.canDecorate = function $vgps3$chart$Sliders$$canDecorate$() {
  return!1
};
vgps3.chart.Sliders.disposeInternal = function $vgps3$chart$Sliders$disposeInternal$() {
  delete this.title_
};
vgps3.chart.ClickEvent = function $vgps3$chart$ClickEvent$($position$$) {
  goog.events.Event.call(this, vgps3.chart.EventType.CLICK);
  this.position = $position$$
};
goog.inherits(vgps3.chart.ClickEvent, goog.events.Event);
vgps3.chart.MoveEvent = function $vgps3$chart$MoveEvent$($position$$) {
  goog.events.Event.call(this, vgps3.chart.EventType.MOVE);
  this.position = $position$$
};
goog.inherits(vgps3.chart.MoveEvent, goog.events.Event);
vgps3.chart.WheelEvent = function $vgps3$chart$WheelEvent$($position$$, $direction$$) {
  goog.events.Event.call(this, vgps3.chart.EventType.WHEEL);
  this.position = $position$$;
  this.direction = $direction$$
};
goog.inherits(vgps3.chart.WheelEvent, goog.events.Event);
vgps3.chart.AboutEvent = function $vgps3$chart$AboutEvent$() {
  goog.events.Event.call(this, vgps3.chart.EventType.ABOUT)
};
goog.inherits(vgps3.chart.AboutEvent, goog.events.Event);
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
goog.async.Deferred = function $goog$async$Deferred$($opt_canceller$$, $opt_defaultScope$$) {
  this.chain_ = [];
  this.canceller_ = $opt_canceller$$;
  this.defaultScope_ = $opt_defaultScope$$ || null
};
goog.async.Deferred.prototype.fired_ = !1;
goog.async.Deferred.prototype.hadError_ = !1;
goog.async.Deferred.prototype.paused_ = 0;
goog.async.Deferred.prototype.silentlyCancelled_ = !1;
goog.async.Deferred.prototype.chained_ = !1;
goog.async.Deferred.prototype.branches_ = 0;
goog.async.Deferred.prototype.cancel = function $goog$async$Deferred$$cancel$($opt_deepCancel$$) {
  if(this.hasFired()) {
    this.result_ instanceof goog.async.Deferred && this.result_.cancel()
  }else {
    if(this.parent_) {
      var $parent$$ = this.parent_;
      delete this.parent_;
      $opt_deepCancel$$ ? $parent$$.cancel($opt_deepCancel$$) : $parent$$.branchCancel_()
    }
    this.canceller_ ? this.canceller_.call(this.defaultScope_, this) : this.silentlyCancelled_ = !0;
    this.hasFired() || this.errback(new goog.async.Deferred.CancelledError(this))
  }
};
goog.async.Deferred.prototype.branchCancel_ = function $goog$async$Deferred$$branchCancel_$() {
  this.branches_--;
  0 >= this.branches_ && this.cancel()
};
goog.async.Deferred.prototype.pause_ = function $goog$async$Deferred$$pause_$() {
  this.paused_++
};
goog.async.Deferred.prototype.unpause_ = function $goog$async$Deferred$$unpause_$() {
  this.paused_--;
  0 == this.paused_ && this.hasFired() && this.fire_()
};
goog.async.Deferred.prototype.continue_ = function $goog$async$Deferred$$continue_$($isSuccess$$, $res$$) {
  this.resback_($isSuccess$$, $res$$);
  this.unpause_()
};
goog.async.Deferred.prototype.resback_ = function $goog$async$Deferred$$resback_$($isSuccess$$, $res$$) {
  this.fired_ = !0;
  this.result_ = $res$$;
  this.hadError_ = !$isSuccess$$;
  this.fire_()
};
goog.async.Deferred.prototype.check_ = function $goog$async$Deferred$$check_$() {
  if(this.hasFired()) {
    if(!this.silentlyCancelled_) {
      throw new goog.async.Deferred.AlreadyCalledError(this);
    }
    this.silentlyCancelled_ = !1
  }
};
goog.async.Deferred.prototype.callback = function $goog$async$Deferred$$callback$($opt_result$$) {
  this.check_();
  this.assertNotDeferred_($opt_result$$);
  this.resback_(!0, $opt_result$$)
};
goog.async.Deferred.prototype.errback = function $goog$async$Deferred$$errback$($opt_result$$) {
  this.check_();
  this.assertNotDeferred_($opt_result$$);
  this.resback_(!1, $opt_result$$)
};
goog.async.Deferred.prototype.assertNotDeferred_ = function $goog$async$Deferred$$assertNotDeferred_$($obj$$) {
  goog.asserts.assert(!($obj$$ instanceof goog.async.Deferred), "Deferred instances can only be chained if they are the result of a callback")
};
goog.async.Deferred.prototype.addCallback = function $goog$async$Deferred$$addCallback$($cb$$, $opt_scope$$) {
  return this.addCallbacks($cb$$, null, $opt_scope$$)
};
goog.async.Deferred.prototype.addErrback = function $goog$async$Deferred$$addErrback$($eb$$, $opt_scope$$) {
  return this.addCallbacks(null, $eb$$, $opt_scope$$)
};
goog.async.Deferred.prototype.addCallbacks = function $goog$async$Deferred$$addCallbacks$($cb$$, $eb$$, $opt_scope$$) {
  goog.asserts.assert(!this.chained_, "Chained Deferreds can not be re-used");
  this.chain_.push([$cb$$, $eb$$, $opt_scope$$]);
  this.hasFired() && this.fire_();
  return this
};
goog.async.Deferred.prototype.chainDeferred = function $goog$async$Deferred$$chainDeferred$($otherDeferred$$) {
  this.addCallbacks($otherDeferred$$.callback, $otherDeferred$$.errback, $otherDeferred$$);
  return this
};
goog.async.Deferred.prototype.awaitDeferred = function $goog$async$Deferred$$awaitDeferred$($otherDeferred$$) {
  return this.addCallback(goog.bind($otherDeferred$$.branch, $otherDeferred$$))
};
goog.async.Deferred.prototype.branch = function $goog$async$Deferred$$branch$($opt_propagateCancel$$) {
  var $d$$ = new goog.async.Deferred;
  this.chainDeferred($d$$);
  $opt_propagateCancel$$ && ($d$$.parent_ = this, this.branches_++);
  return $d$$
};
goog.async.Deferred.prototype.addBoth = function $goog$async$Deferred$$addBoth$($f$$, $opt_scope$$) {
  return this.addCallbacks($f$$, $f$$, $opt_scope$$)
};
goog.async.Deferred.prototype.hasFired = function $goog$async$Deferred$$hasFired$() {
  return this.fired_
};
goog.async.Deferred.prototype.isError = function $goog$async$Deferred$$isError$($res$$) {
  return $res$$ instanceof Error
};
goog.async.Deferred.prototype.hasErrback_ = function $goog$async$Deferred$$hasErrback_$() {
  return goog.array.some(this.chain_, function($chainRow$$) {
    return goog.isFunction($chainRow$$[1])
  })
};
goog.async.Deferred.prototype.fire_ = function $goog$async$Deferred$$fire_$() {
  this.unhandledExceptionTimeoutId_ && (this.hasFired() && this.hasErrback_()) && (goog.global.clearTimeout(this.unhandledExceptionTimeoutId_), delete this.unhandledExceptionTimeoutId_);
  this.parent_ && (this.parent_.branches_--, delete this.parent_);
  for(var $res$$ = this.result_, $unhandledException$$ = !1, $isChained$$ = !1;this.chain_.length && 0 == this.paused_;) {
    var $chainEntry_scope$$ = this.chain_.shift(), $callback$$46_f$$ = $chainEntry_scope$$[0], $errback$$ = $chainEntry_scope$$[1], $chainEntry_scope$$ = $chainEntry_scope$$[2];
    if($callback$$46_f$$ = this.hadError_ ? $errback$$ : $callback$$46_f$$) {
      try {
        var $ret$$ = $callback$$46_f$$.call($chainEntry_scope$$ || this.defaultScope_, $res$$);
        goog.isDef($ret$$) && (this.hadError_ = this.hadError_ && ($ret$$ == $res$$ || this.isError($ret$$)), this.result_ = $res$$ = $ret$$);
        $res$$ instanceof goog.async.Deferred && ($isChained$$ = !0, this.pause_())
      }catch($ex$$) {
        $res$$ = $ex$$, this.hadError_ = !0, this.hasErrback_() || ($unhandledException$$ = !0)
      }
    }
  }
  this.result_ = $res$$;
  $isChained$$ && this.paused_ && ($res$$.addCallbacks(goog.bind(this.continue_, this, !0), goog.bind(this.continue_, this, !1)), $res$$.chained_ = !0);
  $unhandledException$$ && (this.unhandledExceptionTimeoutId_ = goog.global.setTimeout(function() {
    throw $res$$;
  }, 0))
};
goog.async.Deferred.succeed = function $goog$async$Deferred$succeed$($res$$) {
  var $d$$ = new goog.async.Deferred;
  $d$$.callback($res$$);
  return $d$$
};
goog.async.Deferred.fail = function $goog$async$Deferred$fail$($res$$) {
  var $d$$ = new goog.async.Deferred;
  $d$$.errback($res$$);
  return $d$$
};
goog.async.Deferred.cancelled = function $goog$async$Deferred$cancelled$() {
  var $d$$ = new goog.async.Deferred;
  $d$$.cancel();
  return $d$$
};
goog.async.Deferred.when = function $goog$async$Deferred$when$($value$$, $callback$$, $opt_scope$$) {
  return $value$$ instanceof goog.async.Deferred ? $value$$.branch(!0).addCallback($callback$$, $opt_scope$$) : goog.async.Deferred.succeed($value$$).addCallback($callback$$, $opt_scope$$)
};
goog.async.Deferred.AlreadyCalledError = function $goog$async$Deferred$AlreadyCalledError$($deferred$$) {
  goog.debug.Error.call(this);
  this.deferred = $deferred$$
};
goog.inherits(goog.async.Deferred.AlreadyCalledError, goog.debug.Error);
goog.async.Deferred.AlreadyCalledError.prototype.message = "Deferred has already fired";
goog.async.Deferred.AlreadyCalledError.prototype.name = "AlreadyCalledError";
goog.async.Deferred.CancelledError = function $goog$async$Deferred$CancelledError$($deferred$$) {
  goog.debug.Error.call(this);
  this.deferred = $deferred$$
};
goog.inherits(goog.async.Deferred.CancelledError, goog.debug.Error);
goog.async.Deferred.CancelledError.prototype.message = "Deferred was cancelled";
goog.async.Deferred.CancelledError.prototype.name = "CancelledError";
goog.net.jsloader = {};
goog.net.jsloader.GLOBAL_VERIFY_OBJS_ = "closure_verification";
goog.net.jsloader.DEFAULT_TIMEOUT = 5E3;
goog.net.jsloader.scriptsToLoad_ = [];
goog.net.jsloader.loadMany = function $goog$net$jsloader$loadMany$($uris$$, $opt_options$$) {
  if($uris$$.length) {
    var $isAnotherModuleLoading$$ = goog.net.jsloader.scriptsToLoad_.length;
    goog.array.extend(goog.net.jsloader.scriptsToLoad_, $uris$$);
    if(!$isAnotherModuleLoading$$) {
      var $uris$$ = goog.net.jsloader.scriptsToLoad_, $popAndLoadNextScript$$ = function $$popAndLoadNextScript$$$() {
        var $deferred$$2_uri$$ = $uris$$.shift(), $deferred$$2_uri$$ = goog.net.jsloader.load($deferred$$2_uri$$, $opt_options$$);
        $uris$$.length && $deferred$$2_uri$$.addBoth($popAndLoadNextScript$$)
      };
      $popAndLoadNextScript$$()
    }
  }
};
goog.net.jsloader.load = function $goog$net$jsloader$load$($uri$$, $opt_options$$) {
  var $options$$ = $opt_options$$ || {}, $doc$$ = $options$$.document || document, $script$$ = goog.dom.createElement(goog.dom.TagName.SCRIPT), $request$$ = {script_:$script$$, timeout_:void 0}, $deferred$$ = new goog.async.Deferred(goog.net.jsloader.cancel_, $request$$), $timeout$$ = null, $timeoutDuration$$ = goog.isDefAndNotNull($options$$.timeout) ? $options$$.timeout : goog.net.jsloader.DEFAULT_TIMEOUT;
  0 < $timeoutDuration$$ && ($timeout$$ = window.setTimeout(function() {
    goog.net.jsloader.cleanup_($script$$, !0);
    $deferred$$.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.TIMEOUT, "Timeout reached for loading script " + $uri$$))
  }, $timeoutDuration$$), $request$$.timeout_ = $timeout$$);
  $script$$.onload = $script$$.onreadystatechange = function $$script$$$onreadystatechange$() {
    if(!$script$$.readyState || "loaded" == $script$$.readyState || "complete" == $script$$.readyState) {
      goog.net.jsloader.cleanup_($script$$, $options$$.cleanupWhenDone || !1, $timeout$$), $deferred$$.callback(null)
    }
  };
  $script$$.onerror = function $$script$$$onerror$() {
    goog.net.jsloader.cleanup_($script$$, !0, $timeout$$);
    $deferred$$.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.LOAD_ERROR, "Error while loading script " + $uri$$))
  };
  goog.dom.setProperties($script$$, {type:"text/javascript", charset:"UTF-8", src:$uri$$});
  goog.net.jsloader.getScriptParentElement_($doc$$).appendChild($script$$);
  return $deferred$$
};
goog.net.jsloader.loadAndVerify = function $goog$net$jsloader$loadAndVerify$($uri$$, $verificationObjName$$, $options$$) {
  goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] || (goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] = {});
  var $verifyObjs$$ = goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_];
  if(goog.isDef($verifyObjs$$[$verificationObjName$$])) {
    return goog.async.Deferred.fail(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_OBJECT_ALREADY_EXISTS, "Verification object " + $verificationObjName$$ + " already defined."))
  }
  var $options$$ = goog.net.jsloader.load($uri$$, $options$$), $deferred$$ = new goog.async.Deferred($options$$.cancel);
  $options$$.addCallback(function() {
    var $result$$ = $verifyObjs$$[$verificationObjName$$];
    goog.isDef($result$$) ? ($deferred$$.callback($result$$), delete $verifyObjs$$[$verificationObjName$$]) : $deferred$$.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_ERROR, "Script " + $uri$$ + " loaded, but verification object " + $verificationObjName$$ + " was not defined."))
  });
  $options$$.addErrback(function($error$$) {
    goog.isDef($verifyObjs$$[$verificationObjName$$]) && delete $verifyObjs$$[$verificationObjName$$];
    $deferred$$.errback($error$$)
  });
  return $deferred$$
};
goog.net.jsloader.getScriptParentElement_ = function $goog$net$jsloader$getScriptParentElement_$($doc$$) {
  var $headElements$$ = $doc$$.getElementsByTagName(goog.dom.TagName.HEAD);
  return!$headElements$$ || goog.array.isEmpty($headElements$$) ? $doc$$.documentElement : $headElements$$[0]
};
goog.net.jsloader.cancel_ = function $goog$net$jsloader$cancel_$() {
  if(this && this.script_) {
    var $scriptNode$$ = this.script_;
    $scriptNode$$ && "SCRIPT" == $scriptNode$$.tagName && goog.net.jsloader.cleanup_($scriptNode$$, !0, this.timeout_)
  }
};
goog.net.jsloader.cleanup_ = function $goog$net$jsloader$cleanup_$($scriptNode$$, $removeScriptNode$$, $opt_timeout$$) {
  goog.isDefAndNotNull($opt_timeout$$) && goog.global.clearTimeout($opt_timeout$$);
  $scriptNode$$.onload = goog.nullFunction;
  $scriptNode$$.onerror = goog.nullFunction;
  $scriptNode$$.onreadystatechange = goog.nullFunction;
  $removeScriptNode$$ && window.setTimeout(function() {
    goog.dom.removeNode($scriptNode$$)
  }, 0)
};
goog.net.jsloader.ErrorCode = {LOAD_ERROR:0, TIMEOUT:1, VERIFY_ERROR:2, VERIFY_OBJECT_ALREADY_EXISTS:3};
goog.net.jsloader.Error = function $goog$net$jsloader$Error$($code$$, $opt_message$$) {
  var $msg$$ = "Jsloader error (code #" + $code$$ + ")";
  $opt_message$$ && ($msg$$ += ": " + $opt_message$$);
  goog.debug.Error.call(this, $msg$$);
  this.code = $code$$
};
goog.inherits(goog.net.jsloader.Error, goog.debug.Error);
vgps3.chart.Chart = function $vgps3$chart$Chart$() {
  this.vgps_ = null;
  this.overlays_ = new vgps3.chart.Overlays;
  this.sliders_ = new vgps3.chart.Sliders;
  this.chartLoaded_ = new goog.async.Deferred;
  var $chart$$ = this;
  google && google.load ? this.loadApi_(this.chartLoaded_) : goog.net.jsloader.load(vgps3.chart.LOADER_URL).addCallback(function() {
    $chart$$.loadApi_()
  })
};
vgps3.chart.Chart.prototype.init = function $vgps3$chart$Chart$$init$($vgps$$) {
  this.vgps_ = $vgps$$;
  this.vgps_.addEventListener(vgps3.track.EventType.LOAD, goog.bind(this.mapLoadHandler_, this))
};
vgps3.chart.Chart.prototype.moveTo = function $vgps3$chart$Chart$$moveTo$($position$$) {
  this.overlays_.moveTo($position$$)
};
vgps3.chart.Chart.prototype.handleMouseEvents_ = function $vgps3$chart$Chart$$handleMouseEvents_$($event$$) {
  $event$$.preventDefault();
  this.vgps_.dispatchEvent($event$$.type === goog.events.EventType.MOUSEDOWN ? new vgps3.chart.ClickEvent(this.overlays_.getPosition()) : new vgps3.chart.MoveEvent(this.overlays_.getPosition()))
};
vgps3.chart.Chart.prototype.handleMouseWheel_ = function $vgps3$chart$Chart$$handleMouseWheel_$($event$$) {
  $event$$.preventDefault();
  this.vgps_.dispatchEvent(new vgps3.chart.WheelEvent(this.overlays_.getPosition(), 0 < $event$$.deltaY ? 1 : -1))
};
vgps3.chart.Chart.prototype.mapLoadHandler_ = function $vgps3$chart$Chart$$mapLoadHandler_$($event$$) {
  var $track$$ = $event$$.track, $charts$$ = this;
  this.overlays_.render(goog.dom.getElement("charts"));
  this.sliders_.render(goog.dom.getElement("sliders"));
  this.mouseWheelHandler_ = new goog.events.MouseWheelHandler(this.overlays_.getElement());
  goog.events.listen(this.mouseWheelHandler_, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, goog.bind($charts$$.handleMouseWheel_, $charts$$));
  goog.events.listen(this.overlays_.getElement(), [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEMOVE], goog.bind($charts$$.handleMouseEvents_, $charts$$));
  goog.events.listen(this.sliders_.getTitleElement(), goog.events.EventType.CLICK, function() {
    $charts$$.vgps_.dispatchEvent(new vgps3.chart.AboutEvent)
  });
  this.chartLoaded_.addCallback(function() {
    var $chart$$, $data$$41_options$$;
    $data$$41_options$$ = new google.visualization.DataTable;
    var $chartIndex$$3_view$$;
    $data$$41_options$$.addColumn("string", "time");
    $data$$41_options$$.addColumn("number", "elev");
    $data$$41_options$$.addColumn("number", "elevGnd");
    $data$$41_options$$.addColumn("number", "Vx");
    $data$$41_options$$.addColumn("number", "Vz");
    for($chartIndex$$3_view$$ = 0;$chartIndex$$3_view$$ < $track$$.nbChartPt;$chartIndex$$3_view$$++) {
      $data$$41_options$$.addRow([$track$$.time.hour[$chartIndex$$3_view$$] + "h" + $track$$.time.min[$chartIndex$$3_view$$], $track$$.elev[$chartIndex$$3_view$$], $track$$.elevGnd[$chartIndex$$3_view$$], $track$$.speed[$chartIndex$$3_view$$], $track$$.vario[$chartIndex$$3_view$$]])
    }
    $chartIndex$$3_view$$ = new google.visualization.DataView($data$$41_options$$);
    $data$$41_options$$ = goog.object.clone(vgps3.chart.CHART_OPTIONS);
    goog.object.extend($data$$41_options$$, {hAxis:{showTextEvery:Math.round($track$$.nbChartPt / 6)}});
    $chartIndex$$3_view$$.setColumns([0, 1, 2]);
    $chart$$ = $charts$$.overlays_.addLayer();
    $charts$$.sliders_.addSlider("h", $chart$$, "red");
    $chart$$ = new google.visualization.AreaChart($chart$$);
    $chart$$.draw($chartIndex$$3_view$$, $data$$41_options$$);
    $data$$41_options$$.curve = "none";
    $data$$41_options$$.series = [{color:"green"}];
    $chartIndex$$3_view$$.setColumns([0, 3]);
    $chart$$ = $charts$$.overlays_.addLayer();
    $charts$$.sliders_.addSlider("Vx", $chart$$, "green");
    $chart$$ = new google.visualization.LineChart($chart$$);
    $chart$$.draw($chartIndex$$3_view$$, $data$$41_options$$);
    $chartIndex$$3_view$$.setColumns([0, 4]);
    $data$$41_options$$.series = [{color:"blue"}];
    $chart$$ = $charts$$.overlays_.addLayer();
    $charts$$.sliders_.addSlider("Vz", $chart$$, "blue");
    $chart$$ = new google.visualization.LineChart($chart$$);
    $chart$$.draw($chartIndex$$3_view$$, $data$$41_options$$)
  })
};
vgps3.chart.Chart.prototype.loadApi_ = function $vgps3$chart$Chart$$loadApi_$() {
  var $chart$$ = this;
  google.load("visualization", "1.0", {packages:["corechart"], callback:function() {
    $chart$$.chartLoaded_.callback()
  }})
};
vgps3.chart.LOADER_URL = "https://www.google.com/jsapi";
vgps3.chart.EventType = {CLICK:"vgps3.chart.click", MOVE:"vgps3.chart.move", WHEEL:"vgps3.chart.wheel", ABOUT:"vgps3.chart.about"};
vgps3.chart.CHART_OPTIONS = {theme:"maximized", fontName:"verdana", fontSize:"10", lineWidth:1, enableInteractivity:!1, vAxis:{viewWindowMode:"maximized"}, series:{"0":{color:"#ff0000", areaOpacity:0}, 1:{color:"#755445", areaOpacity:1}}, legend:{position:"none"}};
vgps3.ign = {};
vgps3.ign.Map = function $vgps3$ign$Map$() {
};
vgps3.ign.Map.prototype.init = function $vgps3$ign$Map$$init$($vgps$$) {
  $vgps$$.getGoogleMap().mapTypes.set("ign_terrain", this.getIgnMapType_())
};
vgps3.ign.Map.prototype.getIgnMapType_ = function $vgps3$ign$Map$$getIgnMapType_$() {
  return new google.maps.ImageMapType({getTileUrl:function($coord$$, $zoom$$) {
    var $numTiles$$ = 1 << $zoom$$;
    return 0 > $coord$$.y || $coord$$.y >= $numTiles$$ ? null : vgps3.ign.TILES_URL.replace("{zoom}", $zoom$$).replace("{x}", (($coord$$.x % $numTiles$$ + $numTiles$$) % $numTiles$$).toString(10)).replace("{y}", $coord$$.y).replace("{layer}", "GEOGRAPHICALGRIDSYSTEMS.MAPS")
  }, tileSize:new google.maps.Size(256, 256), minZoom:6, maxZoom:17, name:"IGN", alt:"Cartes IGN France"})
};
vgps3.ign.API_KEY = "tyujsdxmzox31ituc2uw0qwl";
vgps3.ign.TILES_URL = "http://gpp3-wxs.ign.fr/" + vgps3.ign.API_KEY + "/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER={layer}&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={zoom}&TILEROW={y}&TILECOL={x};";
vgps3.route = {};
vgps3.route.Route = function $vgps3$route$Route$() {
};
vgps3.route.Route.prototype.init = function $vgps3$route$Route$$init$($vgps$$) {
  this.gMap_ = $vgps$$.getGoogleMap()
};
vgps3.route.Route.prototype.draw = function $vgps3$route$Route$$draw$($closed_type$$, $turnpoints$$, $start$$, $end$$) {
  var $startIcon$$ = new google.maps.MarkerImage(vgps3.route.START_ICON_URL, new google.maps.Size(12, 20)), $endIcon$$ = new google.maps.MarkerImage(vgps3.route.END_ICON_URL, new google.maps.Size(12, 20)), $icon$$ = new google.maps.MarkerImage(vgps3.route.ICON_URL, new google.maps.Size(12, 20)), $closed_type$$ = "c" === $closed_type$$.substr(-1);
  new google.maps.Polyline({clickable:!1, map:this.gMap_, path:$turnpoints$$, strokeColor:"#00f", strokeOpacity:0.8, strokeWeight:1});
  new google.maps.Marker({clickable:!1, position:$closed_type$$ && goog.isDef($start$$) ? $start$$ : $turnpoints$$[0], map:this.gMap_, icon:$startIcon$$});
  new google.maps.Marker({clickable:!1, position:$closed_type$$ && goog.isDef($end$$) ? $end$$ : $turnpoints$$[$turnpoints$$.length - 1], map:this.gMap_, icon:$endIcon$$});
  $closed_type$$ && $turnpoints$$.push($turnpoints$$[0]);
  goog.array.forEach($closed_type$$ ? $turnpoints$$ : goog.array.slice($turnpoints$$, 1, -1), function($tp$$) {
    new google.maps.Marker({clickable:!1, position:$tp$$, map:this.gMap_, icon:$icon$$})
  }, this)
};
vgps3.route.START_ICON_URL = "http://labs.google.com/ridefinder/images/mm_20_green.png";
vgps3.route.END_ICON_URL = "http://labs.google.com/ridefinder/images/mm_20_red.png";
vgps3.route.ICON_URL = "http://labs.google.com/ridefinder/images/mm_20_orange.png";
var GoogleEarth = function $GoogleEarth$($map$$) {
  if(!google || !google.earth) {
    throw"google.earth not loaded";
  }
  if(!google.earth.isSupported()) {
    throw"Google Earth API is not supported on this system";
  }
  if(!google.earth.isInstalled()) {
    throw"Google Earth API is not installed on this system";
  }
  this.RED_ICON_ = "http://maps.google.com/mapfiles/kml/paddle/red-circle.png";
  this.map_ = $map$$;
  this.mapDiv_ = $map$$.getDiv();
  this.earthVisible_ = !1;
  this.earthTitle_ = "Earth";
  this.moveEvents_ = [];
  this.overlays_ = {};
  this.lastClickedPlacemark_ = null;
  this.displayCounter_ = 0;
  this.addEarthMapType_();
  this.addEarthControl_()
};
window.GoogleEarth = GoogleEarth;
GoogleEarth.MAP_TYPE_ID = "GoogleEarthAPI";
GoogleEarth.MAP_TYPE_ID = GoogleEarth.MAP_TYPE_ID;
GoogleEarth.INFO_WINDOW_OPENED_EVENT_ = "GEInfoWindowOpened";
GoogleEarth.MAX_EARTH_ZOOM_ = 27;
GoogleEarth.prototype.getInstance = function $GoogleEarth$$getInstance$() {
  return this.instance_
};
GoogleEarth.prototype.getInstance = GoogleEarth.prototype.getInstance;
GoogleEarth.prototype.addEarthMapType_ = function $GoogleEarth$$addEarthMapType_$() {
  var $map$$ = this.map_, $earthMapType$$ = {tileSize:new google.maps.Size(256, 256), maxZoom:19, name:this.earthTitle_, alt:this.earthTitle_, getTile:function($tileCoord$$, $zoom$$, $ownerDocument$$) {
    return $ownerDocument$$.createElement("DIV")
  }};
  $map$$.mapTypes.set(GoogleEarth.MAP_TYPE_ID, $earthMapType$$);
  $map$$.setOptions({mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, GoogleEarth.MAP_TYPE_ID]}});
  var $that$$ = this;
  google.maps.event.addListener($map$$, "maptypeid_changed", function() {
    $that$$.mapTypeChanged_()
  })
};
GoogleEarth.prototype.mapTypeChanged_ = function $GoogleEarth$$mapTypeChanged_$() {
  this.map_.getMapTypeId() == GoogleEarth.MAP_TYPE_ID ? this.showEarth_() : this.switchToMapView_()
};
GoogleEarth.prototype.showEarth_ = function $GoogleEarth$$showEarth_$() {
  var $mapTypeControlDiv$$ = this.findMapTypeControlDiv_();
  this.setZIndexes_($mapTypeControlDiv$$);
  this.addShim_($mapTypeControlDiv$$);
  this.controlDiv_.style.display = "";
  this.earthVisible_ = !0;
  this.instance_ ? this.refresh_() : this.initializeEarth_()
};
GoogleEarth.prototype.refresh_ = function $GoogleEarth$$refresh_$() {
  this.overlays_ = {};
  this.flyToMapView_(!0);
  this.clearPlacemarks_();
  this.displayCounter_++;
  this.clearMoveEvents_();
  this.addMapOverlays_()
};
GoogleEarth.prototype.clearMoveEvents_ = function $GoogleEarth$$clearMoveEvents_$() {
  for(var $i$$ = 0, $evnt$$;$evnt$$ = this.moveEvents_[$i$$];$i$$++) {
    google.maps.event.removeListener($evnt$$)
  }
};
GoogleEarth.prototype.clearPlacemarks_ = function $GoogleEarth$$clearPlacemarks_$() {
  for(var $features$$ = this.instance_.getFeatures();$features$$.getFirstChild();) {
    $features$$.removeChild($features$$.getFirstChild())
  }
};
GoogleEarth.prototype.flyToMapView_ = function $GoogleEarth$$flyToMapView_$($tilt$$) {
  var $center$$ = this.map_.getCenter(), $lookAt$$ = this.instance_.createLookAt(""), $range$$ = Math.pow(2, GoogleEarth.MAX_EARTH_ZOOM_ - this.map_.getZoom());
  $lookAt$$.setRange($range$$);
  $lookAt$$.setLatitude($center$$.lat());
  $lookAt$$.setLongitude($center$$.lng());
  $lookAt$$.setHeading(0);
  $lookAt$$.setAltitude(0);
  var $ge$$ = this.instance_;
  $tilt$$ ? ($ge$$.getOptions().setFlyToSpeed(5), $ge$$.getView().setAbstractView($lookAt$$), $lookAt$$.setTilt(15), $ge$$.getOptions().setFlyToSpeed(0.75), window.setTimeout(function() {
    $ge$$.getView().setAbstractView($lookAt$$)
  }, 200), window.setTimeout(function() {
    $ge$$.getOptions().setFlyToSpeed(1)
  }, 250)) : $ge$$.getView().setAbstractView($lookAt$$)
};
GoogleEarth.getKMLColor_ = function $GoogleEarth$getKMLColor_$($hex$$, $opacity$$) {
  "#" == $hex$$[0] && ($hex$$ = $hex$$.substring(1, 9));
  "undefined" == typeof $opacity$$ ? $opacity$$ = "FF" : ($opacity$$ = parseInt(255 * parseFloat($opacity$$), 10).toString(16), 1 == $opacity$$.length && ($opacity$$ = "0" + $opacity$$));
  var $R$$ = $hex$$.substring(0, 2), $G$$ = $hex$$.substring(2, 4), $B$$ = $hex$$.substring(4, 6);
  return[$opacity$$, $B$$, $G$$, $R$$].join("")
};
GoogleEarth.prototype.generatePlacemarkId_ = function $GoogleEarth$$generatePlacemarkId_$($overlay$$) {
  return this.displayCounter_ + "GEV3_" + $overlay$$.__gme_id
};
GoogleEarth.prototype.createPlacemark_ = function $GoogleEarth$$createPlacemark_$($overlay$$) {
  var $placemarkId$$ = this.generatePlacemarkId_($overlay$$);
  this.overlays_[$placemarkId$$] = $overlay$$;
  return this.instance_.createPlacemark($placemarkId$$)
};
GoogleEarth.prototype.createRectangle_ = function $GoogleEarth$$createRectangle_$($coords_rectangle_style$$) {
  var $ge$$ = this.instance_, $bounds$$6_sw$$ = $coords_rectangle_style$$.getBounds(), $ne$$ = $bounds$$6_sw$$.getNorthEast(), $bounds$$6_sw$$ = $bounds$$6_sw$$.getSouthWest(), $placemark$$ = this.createPlacemark_($coords_rectangle_style$$);
  $placemark$$.setGeometry($ge$$.createPolygon(""));
  var $ring$$ = $ge$$.createLinearRing(""), $coords_rectangle_style$$ = this.createStyle_($coords_rectangle_style$$);
  $placemark$$.setStyleSelector($coords_rectangle_style$$);
  $coords_rectangle_style$$ = $ring$$.getCoordinates();
  $coords_rectangle_style$$.pushLatLngAlt($ne$$.lat(), $ne$$.lng(), 0);
  $coords_rectangle_style$$.pushLatLngAlt($ne$$.lat(), $bounds$$6_sw$$.lng(), 0);
  $coords_rectangle_style$$.pushLatLngAlt($bounds$$6_sw$$.lat(), $bounds$$6_sw$$.lng(), 0);
  $coords_rectangle_style$$.pushLatLngAlt($bounds$$6_sw$$.lat(), $ne$$.lng(), 0);
  $coords_rectangle_style$$.pushLatLngAlt($ne$$.lat(), $ne$$.lng(), 0);
  $placemark$$.getGeometry().setOuterBoundary($ring$$);
  $placemark$$.setName("placemark");
  $ge$$.getFeatures().appendChild($placemark$$)
};
GoogleEarth.prototype.addGroundOverlay_ = function $GoogleEarth$$addGroundOverlay_$($groundOverlay$$) {
  var $bounds$$7_sw$$ = $groundOverlay$$.getBounds(), $ne$$ = $bounds$$7_sw$$.getNorthEast(), $bounds$$7_sw$$ = $bounds$$7_sw$$.getSouthWest(), $ge$$ = this.instance_, $overlay$$ = $ge$$.createGroundOverlay("");
  $overlay$$.setLatLonBox($ge$$.createLatLonBox(""));
  $overlay$$.getLatLonBox().setBox($ne$$.lat(), $bounds$$7_sw$$.lat(), $ne$$.lng(), $bounds$$7_sw$$.lng(), 0);
  $overlay$$.setIcon($ge$$.createIcon(""));
  $overlay$$.getIcon().setHref($groundOverlay$$.getUrl());
  $ge$$.getFeatures().appendChild($overlay$$)
};
GoogleEarth.prototype.addKML_ = function $GoogleEarth$$addKML_$($url$$) {
  var $ge$$ = this.instance_;
  google.earth.fetchKml($ge$$, $url$$, function($kml$$) {
    $kml$$ ? $ge$$.getFeatures().appendChild($kml$$) : window.setTimeout(function() {
      alert("Bad or null KML.")
    }, 0)
  })
};
GoogleEarth.prototype.updatePlacemark_ = function $GoogleEarth$$updatePlacemark_$($geom_placemarkId$$) {
  var $marker_position$$ = this.overlays_[$geom_placemarkId$$], $geom_placemarkId$$ = this.instance_.getElementById($geom_placemarkId$$).getGeometry(), $marker_position$$ = $marker_position$$.getPosition();
  $geom_placemarkId$$.setLatitude($marker_position$$.lat());
  $geom_placemarkId$$.setLongitude($marker_position$$.lng())
};
GoogleEarth.prototype.createPoint_ = function $GoogleEarth$$createPoint_$($marker$$) {
  if($marker$$.getPosition()) {
    var $ge$$ = this.instance_, $placemark$$ = this.createPlacemark_($marker$$);
    $marker$$.getTitle() && $placemark$$.setName($marker$$.getTitle());
    var $icon$$2_point$$ = $ge$$.createIcon("");
    $marker$$.getIcon() ? $icon$$2_point$$.setHref($marker$$.getIcon()) : $icon$$2_point$$.setHref(this.RED_ICON_);
    var $style$$ = $ge$$.createStyle("");
    $style$$.getIconStyle().setIcon($icon$$2_point$$);
    $placemark$$.setStyleSelector($style$$);
    $icon$$2_point$$ = $ge$$.createPoint("");
    $icon$$2_point$$.setLatitude($marker$$.getPosition().lat());
    $icon$$2_point$$.setLongitude($marker$$.getPosition().lng());
    $placemark$$.setGeometry($icon$$2_point$$);
    $ge$$.getFeatures().appendChild($placemark$$);
    var $that$$ = this, $ge$$ = google.maps.event.addListener($marker$$, "position_changed", function() {
      var $placemarkId$$ = $that$$.generatePlacemarkId_($marker$$);
      $that$$.updatePlacemark_($placemarkId$$)
    });
    this.moveEvents_.push($ge$$)
  }
};
GoogleEarth.prototype.createPolygon_ = function $GoogleEarth$$createPolygon_$($path$$12_polygon$$) {
  var $ge$$ = this.instance_, $placemark$$ = this.createPlacemark_($path$$12_polygon$$), $coords$$1_poly$$ = $ge$$.createPolygon("");
  $placemark$$.setGeometry($coords$$1_poly$$);
  var $i$$128_outer_style$$ = this.createStyle_($path$$12_polygon$$);
  $placemark$$.setStyleSelector($i$$128_outer_style$$);
  $i$$128_outer_style$$ = $ge$$.createLinearRing("");
  $coords$$1_poly$$.setOuterBoundary($i$$128_outer_style$$);
  for(var $coords$$1_poly$$ = $i$$128_outer_style$$.getCoordinates(), $path$$12_polygon$$ = $path$$12_polygon$$.getPath().getArray(), $i$$128_outer_style$$ = 0, $latLng$$;$latLng$$ = $path$$12_polygon$$[$i$$128_outer_style$$];$i$$128_outer_style$$++) {
    $coords$$1_poly$$.pushLatLngAlt($latLng$$.lat(), $latLng$$.lng(), 0)
  }
  $ge$$.getFeatures().appendChild($placemark$$)
};
GoogleEarth.computeOffset_ = function $GoogleEarth$computeOffset_$($from$$, $distance$$, $dLng_heading$$) {
  var $distance$$ = $distance$$ / 6378137, $dLng_heading$$ = $dLng_heading$$ * (Math.PI / 180), $fromLat_sinLat$$ = $from$$.lat() * (Math.PI / 180), $from$$ = $from$$.lng() * (Math.PI / 180), $cosDistance$$ = Math.cos($distance$$), $distance$$ = Math.sin($distance$$), $sinFromLat$$ = Math.sin($fromLat_sinLat$$), $cosFromLat$$ = Math.cos($fromLat_sinLat$$), $fromLat_sinLat$$ = $cosDistance$$ * $sinFromLat$$ + $distance$$ * $cosFromLat$$ * Math.cos($dLng_heading$$), $dLng_heading$$ = Math.atan2($distance$$ * 
  $cosFromLat$$ * Math.sin($dLng_heading$$), $cosDistance$$ - $sinFromLat$$ * $fromLat_sinLat$$);
  return new google.maps.LatLng(Math.asin($fromLat_sinLat$$) / (Math.PI / 180), ($from$$ + $dLng_heading$$) / (Math.PI / 180))
};
GoogleEarth.prototype.createCircle_ = function $GoogleEarth$$createCircle_$($circle_i$$129_style$$) {
  var $ge$$ = this.instance_, $center$$ = $circle_i$$129_style$$.getCenter(), $radius$$ = $circle_i$$129_style$$.getRadius(), $placemark$$ = this.createPlacemark_($circle_i$$129_style$$);
  $placemark$$.setGeometry($ge$$.createPolygon(""));
  var $ring$$ = $ge$$.createLinearRing(""), $circle_i$$129_style$$ = this.createStyle_($circle_i$$129_style$$);
  $placemark$$.setStyleSelector($circle_i$$129_style$$);
  for($circle_i$$129_style$$ = 0;25 > $circle_i$$129_style$$;$circle_i$$129_style$$++) {
    var $offset$$ = GoogleEarth.computeOffset_($center$$, $radius$$, 14.4 * $circle_i$$129_style$$);
    $ring$$.getCoordinates().pushLatLngAlt($offset$$.lat(), $offset$$.lng(), 0)
  }
  $placemark$$.getGeometry().setOuterBoundary($ring$$);
  $placemark$$.setName("placemark");
  $ge$$.getFeatures().appendChild($placemark$$)
};
GoogleEarth.prototype.createPolyline_ = function $GoogleEarth$$createPolyline_$($path$$) {
  var $ge$$ = this.instance_, $placemark$$ = this.createPlacemark_($path$$), $coords$$ = $ge$$.createLineString("");
  $coords$$.setTessellate(!0);
  $placemark$$.setGeometry($coords$$);
  var $i$$130_style$$ = this.createStyle_($path$$);
  $placemark$$.setStyleSelector($i$$130_style$$);
  for(var $coords$$ = $coords$$.getCoordinates(), $path$$ = $path$$.getPath().getArray(), $i$$130_style$$ = 0, $latLng$$;$latLng$$ = $path$$[$i$$130_style$$];$i$$130_style$$++) {
    $coords$$.pushLatLngAlt($latLng$$.lat(), $latLng$$.lng(), 0)
  }
  $ge$$.getFeatures().appendChild($placemark$$)
};
GoogleEarth.prototype.createStyle_ = function $GoogleEarth$$createStyle_$($fillColor_overlay$$) {
  var $style$$ = this.instance_.createStyle(""), $polyStyle$$ = $style$$.getPolyStyle(), $lineStyle$$ = $style$$.getLineStyle();
  $lineStyle$$.setWidth(this.getMVCVal_($fillColor_overlay$$, "strokeWeight", 3));
  var $strokeOpacity$$ = this.getMVCVal_($fillColor_overlay$$, "strokeOpacity", 1), $fillOpacity$$ = this.getMVCVal_($fillColor_overlay$$, "fillOpacity", 0.3), $strokeColor$$ = this.getMVCVal_($fillColor_overlay$$, "strokeColor", "#000000"), $fillColor_overlay$$ = this.getMVCVal_($fillColor_overlay$$, "fillColor", "#000000");
  $lineStyle$$.getColor().set(GoogleEarth.getKMLColor_($strokeColor$$, $strokeOpacity$$));
  $polyStyle$$.getColor().set(GoogleEarth.getKMLColor_($fillColor_overlay$$, $fillOpacity$$));
  return $style$$
};
GoogleEarth.prototype.getMVCVal_ = function $GoogleEarth$$getMVCVal_$($mvcObject_val$$, $property$$, $def$$) {
  $mvcObject_val$$ = $mvcObject_val$$.get($property$$);
  return"undefined" == typeof $mvcObject_val$$ ? $def$$ : $mvcObject_val$$
};
GoogleEarth.prototype.addMapOverlays_ = function $GoogleEarth$$addMapOverlays_$() {
  for(var $overlays$$ = this.getOverlays_(), $i$$ = 0, $circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$;$circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$ = $overlays$$.Marker[$i$$];$i$$++) {
    this.createPoint_($circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$)
  }
  for($i$$ = 0;$circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$ = $overlays$$.Polygon[$i$$];$i$$++) {
    this.createPolygon_($circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$)
  }
  for($i$$ = 0;$circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$ = $overlays$$.Polyline[$i$$];$i$$++) {
    this.createPolyline_($circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$)
  }
  for($i$$ = 0;$circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$ = $overlays$$.Rectangle[$i$$];$i$$++) {
    this.createRectangle_($circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$)
  }
  for($i$$ = 0;$circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$ = $overlays$$.Circle[$i$$];$i$$++) {
    this.createCircle_($circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$)
  }
  for($i$$ = 0;$circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$ = $overlays$$.KmlLayer[$i$$];$i$$++) {
    this.addKML_($circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$.getUrl())
  }
  for($i$$ = 0;$circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$ = $overlays$$.GroundOverlay[$i$$];$i$$++) {
    this.addGroundOverlay_($circle$$1_kml$$1_marker$$2_overlay$$5_polygon$$2_polyline$$1_rectangle$$)
  }
};
GoogleEarth.prototype.initializeEarth_ = function $GoogleEarth$$initializeEarth_$() {
  var $that$$ = this;
  google.earth.createInstance(this.earthDiv_, function($instance$$) {
    $that$$.instance_ = $instance$$;
    $that$$.addEarthEvents_();
    $that$$.refresh_()
  }, function($e$$) {
    $that$$.hideEarth_();
    $that$$.map_.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    throw"Google Earth API failed to initialize: " + $e$$;
  })
};
GoogleEarth.prototype.addEarthEvents_ = function $GoogleEarth$$addEarthEvents_$() {
  var $ge$$ = this.instance_;
  $ge$$.getWindow().setVisibility(!0);
  var $layerRoot_navControl_screen$$ = $ge$$.getNavigationControl();
  $layerRoot_navControl_screen$$.setVisibility($ge$$.VISIBILITY_AUTO);
  $layerRoot_navControl_screen$$ = $layerRoot_navControl_screen$$.getScreenXY();
  $layerRoot_navControl_screen$$.setYUnits($ge$$.UNITS_INSET_PIXELS);
  $layerRoot_navControl_screen$$.setXUnits($ge$$.UNITS_PIXELS);
  $layerRoot_navControl_screen$$ = $ge$$.getLayerRoot();
  $layerRoot_navControl_screen$$.enableLayerById($ge$$.LAYER_BORDERS, !0);
  $layerRoot_navControl_screen$$.enableLayerById($ge$$.LAYER_ROADS, !0);
  var $that$$ = this;
  google.maps.event.addListener(this.map_, GoogleEarth.INFO_WINDOW_OPENED_EVENT_, function($infowindow$$) {
    if($that$$.earthVisible_) {
      var $balloon$$ = $that$$.instance_.createHtmlStringBalloon("");
      $balloon$$.setFeature($that$$.lastClickedPlacemark_);
      $balloon$$.setContentString($infowindow$$.getContent());
      $that$$.instance_.setBalloon($balloon$$)
    }
  });
  google.earth.addEventListener($ge$$.getGlobe(), "click", function($event$$) {
    var $target$$ = $event$$.getTarget(), $overlay$$ = $that$$.overlays_[$target$$.getId()];
    if($overlay$$) {
      $event$$.preventDefault();
      for(var $event$$ = $that$$.getOverlaysForType_("InfoWindow"), $i$$ = 0, $infoWindow$$;$infoWindow$$ = $event$$[$i$$];$i$$++) {
        $infoWindow$$.close()
      }
      $that$$.lastClickedPlacemark_ = $target$$;
      google.maps.event.trigger($overlay$$, "click")
    }
  })
};
GoogleEarth.prototype.matchMapToEarth_ = function $GoogleEarth$$matchMapToEarth_$() {
  var $center$$3_lookAt$$ = this.instance_.getView().copyAsLookAt(this.instance_.ALTITUDE_RELATIVE_TO_GROUND), $range$$7_zoom$$ = $center$$3_lookAt$$.getRange(), $range$$7_zoom$$ = Math.round(GoogleEarth.MAX_EARTH_ZOOM_ - Math.log($range$$7_zoom$$) / Math.log(2));
  !this.map_.getZoom() == $range$$7_zoom$$ ? this.map_.setZoom($range$$7_zoom$$ - 1) : this.map_.setZoom($range$$7_zoom$$);
  $center$$3_lookAt$$ = new google.maps.LatLng($center$$3_lookAt$$.getLatitude(), $center$$3_lookAt$$.getLongitude());
  this.map_.panTo($center$$3_lookAt$$)
};
GoogleEarth.prototype.switchToMapView_ = function $GoogleEarth$$switchToMapView_$() {
  if(this.earthVisible_) {
    this.matchMapToEarth_();
    var $that$$ = this;
    window.setTimeout(function() {
      $that$$.flyToMapView_()
    }, 50);
    window.setTimeout(function() {
      $that$$.hideEarth_()
    }, 2200)
  }
};
GoogleEarth.prototype.hideEarth_ = function $GoogleEarth$$hideEarth_$() {
  this.unsetZIndexes_();
  this.removeShim_();
  this.controlDiv_.style.display = "none";
  this.earthVisible_ = !1
};
GoogleEarth.prototype.setZIndexes_ = function $GoogleEarth$$setZIndexes_$($mapTypeControlDiv$$) {
  for(var $oldIndex$$ = $mapTypeControlDiv$$.style.zIndex, $siblings$$ = this.controlDiv_.parentNode.childNodes, $i$$ = 0, $sibling$$;$sibling$$ = $siblings$$[$i$$];$i$$++) {
    $sibling$$.__gme_ozi = $sibling$$.style.zIndex, $sibling$$.style.zIndex = -1
  }
  $mapTypeControlDiv$$.__gme_ozi = $oldIndex$$;
  this.controlDiv_.style.zIndex = $mapTypeControlDiv$$.style.zIndex = 0
};
GoogleEarth.prototype.unsetZIndexes_ = function $GoogleEarth$$unsetZIndexes_$() {
  for(var $siblings$$ = this.controlDiv_.parentNode.childNodes, $i$$ = 0, $sibling$$;$sibling$$ = $siblings$$[$i$$];$i$$++) {
    $sibling$$.style.zIndex = $sibling$$.__gme_ozi
  }
};
GoogleEarth.prototype.addShim_ = function $GoogleEarth$$addShim_$($mapTypeControlDiv$$) {
  var $iframeShim$$ = this.iframeShim_ = document.createElement("IFRAME");
  $iframeShim$$.src = "javascript:false;";
  $iframeShim$$.scrolling = "no";
  $iframeShim$$.frameBorder = "0";
  var $style$$ = $iframeShim$$.style;
  $style$$.zIndex = -1E5;
  $style$$.width = $style$$.height = "100%";
  $style$$.position = "absolute";
  $style$$.left = $style$$.top = 0;
  $mapTypeControlDiv$$.appendChild($iframeShim$$)
};
GoogleEarth.prototype.removeShim_ = function $GoogleEarth$$removeShim_$() {
  this.iframeShim_.parentNode.removeChild(this.iframeShim_);
  this.iframeShim_ = null
};
GoogleEarth.prototype.findMapTypeControlDiv_ = function $GoogleEarth$$findMapTypeControlDiv_$() {
  for(var $regex$$ = RegExp("title=['\"]?" + this.earthTitle_ + "[\"']?"), $siblings$$ = this.controlDiv_.parentNode.childNodes, $i$$ = 0, $sibling$$;$sibling$$ = $siblings$$[$i$$];$i$$++) {
    if($regex$$.test($sibling$$.innerHTML)) {
      return $sibling$$
    }
  }
};
GoogleEarth.prototype.addEarthControl_ = function $GoogleEarth$$addEarthControl_$() {
  var $earthDiv_mapDiv$$ = this.mapDiv_, $control$$ = this.controlDiv_ = document.createElement("DIV");
  $control$$.style.position = "absolute";
  $control$$.style.width = 0;
  $control$$.style.height = 0;
  $control$$.index = 0;
  $control$$.style.display = "none";
  var $inner$$ = this.innerDiv_ = document.createElement("DIV");
  $inner$$.style.width = $earthDiv_mapDiv$$.clientWidth + "px";
  $inner$$.style.height = $earthDiv_mapDiv$$.clientHeight + "px";
  $inner$$.style.position = "absolute";
  $control$$.appendChild($inner$$);
  $earthDiv_mapDiv$$ = this.earthDiv_ = document.createElement("DIV");
  $earthDiv_mapDiv$$.style.position = "absolute";
  $earthDiv_mapDiv$$.style.width = "100%";
  $earthDiv_mapDiv$$.style.height = "100%";
  $inner$$.appendChild($earthDiv_mapDiv$$);
  this.map_.controls[google.maps.ControlPosition.TOP_LEFT].push($control$$);
  var $that$$ = this;
  google.maps.event.addListener(this.map_, "resize", function() {
    $that$$.resizeEarth_()
  })
};
GoogleEarth.prototype.resizeEarth_ = function $GoogleEarth$$resizeEarth_$() {
  var $innerStyle$$ = this.innerDiv_.style, $mapDiv$$ = this.mapDiv_;
  $innerStyle$$.width = $mapDiv$$.clientWidth + "px";
  $innerStyle$$.height = $mapDiv$$.clientHeight + "px"
};
GoogleEarth.prototype.getOverlaysForType_ = function $GoogleEarth$$getOverlaysForType_$($overlays$$2_type$$) {
  var $tmp$$ = [], $overlays$$2_type$$ = GoogleEarth.overlays_[$overlays$$2_type$$], $i$$;
  for($i$$ in $overlays$$2_type$$) {
    if($overlays$$2_type$$.hasOwnProperty($i$$)) {
      var $overlay$$ = $overlays$$2_type$$[$i$$];
      $overlay$$.get("map") == this.map_ && $tmp$$.push($overlay$$)
    }
  }
  return $tmp$$
};
GoogleEarth.prototype.getOverlays_ = function $GoogleEarth$$getOverlays_$() {
  for(var $overlays$$ = {}, $overlayClasses$$ = GoogleEarth.OVERLAY_CLASSES, $i$$ = 0, $overlayClass$$;$overlayClass$$ = $overlayClasses$$[$i$$];$i$$++) {
    $overlays$$[$overlayClass$$] = this.getOverlaysForType_($overlayClass$$)
  }
  return $overlays$$
};
GoogleEarth.overlays_ = {};
GoogleEarth.modifyOpen_ = function $GoogleEarth$modifyOpen_$() {
  google.maps.InfoWindow.prototype.openOriginal_ = google.maps.InfoWindow.prototype.open;
  GoogleEarth.overlays_.InfoWindow = {};
  google.maps.InfoWindow.prototype.open = function $google$maps$InfoWindow$$open$($map$$, $anchor$$) {
    $map$$ ? this.__gme_id || (this.__gme_id = GoogleEarth.counter_++, GoogleEarth.overlays_.InfoWindow[this.__gme_id] = this) : (delete GoogleEarth.overlays_.InfoWindow[this.__gme_id], this.__gme_id = void 0);
    google.maps.event.trigger($map$$, GoogleEarth.INFO_WINDOW_OPENED_EVENT_, this);
    this.openOriginal_($map$$, $anchor$$)
  }
};
GoogleEarth.modifySetMap_ = function $GoogleEarth$modifySetMap_$($overlayClass$$) {
  var $proto$$ = google.maps[$overlayClass$$].prototype;
  $proto$$.__gme_setMapOriginal = $proto$$.setMap;
  GoogleEarth.overlays_[$overlayClass$$] = {};
  google.maps[$overlayClass$$].prototype.setMap = function $google$maps$$overlayClass$$$$setMap$($map$$) {
    $map$$ ? this.__gme_id || (this.__gme_id = GoogleEarth.counter_++, GoogleEarth.overlays_[$overlayClass$$][this.__gme_id] = this) : (delete GoogleEarth.overlays_[$overlayClass$$][this.__gme_id], this.__gme_id = void 0);
    this.__gme_setMapOriginal($map$$)
  }
};
GoogleEarth.OVERLAY_CLASSES = "Marker Polyline Polygon Rectangle Circle KmlLayer GroundOverlay InfoWindow".split(" ");
GoogleEarth.counter_ = 0;
GoogleEarth.trackOverlays_ = function $GoogleEarth$trackOverlays_$() {
  for(var $overlayClasses$$ = GoogleEarth.OVERLAY_CLASSES, $i$$ = 0, $overlayClass$$;$overlayClass$$ = $overlayClasses$$[$i$$];$i$$++) {
    GoogleEarth.modifySetMap_($overlayClass$$), "InfoWindow" == $overlayClass$$ && GoogleEarth.modifyOpen_()
  }
};
GoogleEarth.trackOverlays_();
vgps3.earth = {};
vgps3.earth.Earth = function $vgps3$earth$Earth$() {
  this.geLoaded_ = new goog.async.Deferred;
  var $earth$$ = this;
  google && google.load ? this.loadApi_() : goog.net.jsloader.load(vgps3.earth.LOADER_URL).addCallback(function() {
    $earth$$.loadApi_()
  })
};
vgps3.earth.Earth.prototype.init = function $vgps3$earth$Earth$$init$($vgps$$) {
  this.gMap_ = $vgps$$.getGoogleMap();
  this.vgps_ = $vgps$$;
  this.vgps_.addEventListener(vgps3.track.EventType.LOAD, goog.bind(this.mapLoadHandler_, this))
};
vgps3.earth.Earth.prototype.moveTo = function $vgps3$earth$Earth$$moveTo$($angle$$3_position$$) {
  var $trackIdx$$ = Math.round((this.track_.nbTrackPt - 1) * $angle$$3_position$$), $deltaLon_nextIdx$$ = Math.min(this.track_.nbTrackPt - 1, $trackIdx$$ + 1), $deltaLat$$ = this.track_.lat[$deltaLon_nextIdx$$] - this.track_.lat[$trackIdx$$], $deltaLon_nextIdx$$ = this.track_.lon[$deltaLon_nextIdx$$] - this.track_.lon[$trackIdx$$];
  this.location_.setLatLngAlt(this.track_.lat[$trackIdx$$], this.track_.lon[$trackIdx$$], this.track_.elev[Math.round((this.track.nbChartPt - 1) * $angle$$3_position$$)]);
  0 === $deltaLon_nextIdx$$ ? $angle$$3_position$$ = 0 < $deltaLat$$ ? Math.PI / 2 : 3 * Math.PI / 2 : ($angle$$3_position$$ = Math.atan($deltaLat$$ / $deltaLon_nextIdx$$), 0 > $deltaLon_nextIdx$$ && ($angle$$3_position$$ += Math.PI));
  $angle$$3_position$$ = 180 * $angle$$3_position$$ / Math.PI;
  $angle$$3_position$$ = 90 - $angle$$3_position$$ + 255;
  0 > $angle$$3_position$$ && ($angle$$3_position$$ += 360);
  360 < $angle$$3_position$$ && ($angle$$3_position$$ -= 360);
  this.orientation_.setHeading($angle$$3_position$$)
};
vgps3.earth.Earth.prototype.clickHandler_ = function $vgps3$earth$Earth$$clickHandler_$($event$$) {
  this.vgps_.click(new google.maps.LatLng($event$$.getLatitude(), $event$$.getLongitude))
};
vgps3.earth.Earth.prototype.mapLoadHandler_ = function $vgps3$earth$Earth$$mapLoadHandler_$($event$$) {
  var $track$$ = $event$$.track, $earth$$ = this;
  this.track_ = $track$$;
  this.geLoaded_.addCallback(function() {
    var $ge$$ = $earth$$.ge_ = (new GoogleEarth($earth$$.gMap_)).getInstance(), $lineString$$1_lineStyle$$1_placemark$$ = $ge$$.createLineString(""), $lineStringPlacemark_model3d$$ = $ge$$.createPlacemark("");
    $lineStringPlacemark_model3d$$.setGeometry($lineString$$1_lineStyle$$1_placemark$$);
    $lineString$$1_lineStyle$$1_placemark$$.setTessellate(!1);
    for(var $i$$ = 0;$i$$ < $track$$.nbTrackPt;$i$$++) {
      $lineString$$1_lineStyle$$1_placemark$$.getCoordinates().pushLatLngAlt($track$$.lat[$i$$], $track$$.lon[$i$$], $track$$.elev($i$$ * ($track$$.nbChartPt - 1) / ($track$$.nbTrackPt - 1)))
    }
    $ge$$.getFeatures().appendChild($lineStringPlacemark_model3d$$);
    $lineString$$1_lineStyle$$1_placemark$$.setAltitudeMode($ge$$.ALTITUDE_ABSOLUTE);
    google.earth.addEventListener($ge$$.getWindow(), "mousedown", goog.bind(this.clickHandler_, $earth$$));
    $lineStringPlacemark_model3d$$.getStyleSelector() || $lineStringPlacemark_model3d$$.setStyleSelector($ge$$.createStyle(""));
    $lineString$$1_lineStyle$$1_placemark$$ = $lineStringPlacemark_model3d$$.getStyleSelector().getLineStyle();
    $lineString$$1_lineStyle$$1_placemark$$.setWidth(2);
    $lineString$$1_lineStyle$$1_placemark$$.getColor().set("ff0000ff");
    $lineString$$1_lineStyle$$1_placemark$$ = $ge$$.createPlacemark("Pilot");
    $ge$$.getFeatures().appendChild($lineString$$1_lineStyle$$1_placemark$$);
    $lineStringPlacemark_model3d$$ = $ge$$.createModel("");
    $lineStringPlacemark_model3d$$.setLink($ge$$.createLink("").setHref(vgps3.earth.MODEL_URL));
    $lineString$$1_lineStyle$$1_placemark$$.setGeometry($lineStringPlacemark_model3d$$);
    $lineStringPlacemark_model3d$$.setLocation($earth$$.location_ = $ge$$.createLocation(""));
    $lineStringPlacemark_model3d$$.setOrientation($earth$$.orientation_ = $ge$$.createOrientation(""));
    $lineStringPlacemark_model3d$$.setScale($ge$$.createScale("").set(50, 50, 50));
    $lineStringPlacemark_model3d$$.setAltitudeMode($ge$$.ALTITUDE_ABSOLUTE);
    $earth$$.moveTo(0)
  })
};
vgps3.earth.Earth.prototype.loadApi_ = function $vgps3$earth$Earth$$loadApi_$() {
  var $earth$$ = this;
  google.load("earth", "1", {callback:function() {
    $earth$$.geLoaded_.callback()
  }})
};
vgps3.earth.LOADER_URL = "https://www.google.com/jsapi";
vgps3.earth.MODEL_URL = "http://victorb.fr/visugps/img/paraglider.dae";
vgps3.earth.EventType = {CLICK:"vgps3.earth.click"};
goog.Uri = function $goog$Uri$($opt_uri$$, $opt_ignoreCase$$) {
  var $m$$;
  $opt_uri$$ instanceof goog.Uri ? (this.ignoreCase_ = goog.isDef($opt_ignoreCase$$) ? $opt_ignoreCase$$ : $opt_uri$$.getIgnoreCase(), this.setScheme($opt_uri$$.getScheme()), this.setUserInfo($opt_uri$$.getUserInfo()), this.setDomain($opt_uri$$.getDomain()), this.setPort($opt_uri$$.getPort()), this.setPath($opt_uri$$.getPath()), this.setQueryData($opt_uri$$.getQueryData().clone()), this.setFragment($opt_uri$$.getFragment())) : $opt_uri$$ && ($m$$ = goog.uri.utils.split(String($opt_uri$$))) ? (this.ignoreCase_ = 
  !!$opt_ignoreCase$$, this.setScheme($m$$[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo($m$$[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain($m$$[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort($m$$[goog.uri.utils.ComponentIndex.PORT]), this.setPath($m$$[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData($m$$[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment($m$$[goog.uri.utils.ComponentIndex.FRAGMENT] || 
  "", !0)) : (this.ignoreCase_ = !!$opt_ignoreCase$$, this.queryData_ = new goog.Uri.QueryData(null, null, this.ignoreCase_))
};
goog.Uri.preserveParameterTypesCompatibilityFlag = !1;
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = !1;
goog.Uri.prototype.ignoreCase_ = !1;
goog.Uri.prototype.toString = function $goog$Uri$$toString$() {
  var $out$$ = [], $domain_fragment$$2_path$$14_port_query$$5_scheme$$ = this.getScheme();
  $domain_fragment$$2_path$$14_port_query$$5_scheme$$ && $out$$.push(goog.Uri.encodeSpecialChars_($domain_fragment$$2_path$$14_port_query$$5_scheme$$, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":");
  if($domain_fragment$$2_path$$14_port_query$$5_scheme$$ = this.getDomain()) {
    $out$$.push("//");
    var $userInfo$$ = this.getUserInfo();
    $userInfo$$ && $out$$.push(goog.Uri.encodeSpecialChars_($userInfo$$, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@");
    $out$$.push(goog.string.urlEncode($domain_fragment$$2_path$$14_port_query$$5_scheme$$));
    $domain_fragment$$2_path$$14_port_query$$5_scheme$$ = this.getPort();
    null != $domain_fragment$$2_path$$14_port_query$$5_scheme$$ && $out$$.push(":", String($domain_fragment$$2_path$$14_port_query$$5_scheme$$))
  }
  if($domain_fragment$$2_path$$14_port_query$$5_scheme$$ = this.getPath()) {
    this.hasDomain() && "/" != $domain_fragment$$2_path$$14_port_query$$5_scheme$$.charAt(0) && $out$$.push("/"), $out$$.push(goog.Uri.encodeSpecialChars_($domain_fragment$$2_path$$14_port_query$$5_scheme$$, "/" == $domain_fragment$$2_path$$14_port_query$$5_scheme$$.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_))
  }
  ($domain_fragment$$2_path$$14_port_query$$5_scheme$$ = this.getEncodedQuery()) && $out$$.push("?", $domain_fragment$$2_path$$14_port_query$$5_scheme$$);
  ($domain_fragment$$2_path$$14_port_query$$5_scheme$$ = this.getFragment()) && $out$$.push("#", goog.Uri.encodeSpecialChars_($domain_fragment$$2_path$$14_port_query$$5_scheme$$, goog.Uri.reDisallowedInFragment_));
  return $out$$.join("")
};
goog.Uri.prototype.resolve = function $goog$Uri$$resolve$($relativeUri$$) {
  var $absoluteUri$$ = this.clone(), $overridden$$ = $relativeUri$$.hasScheme();
  $overridden$$ ? $absoluteUri$$.setScheme($relativeUri$$.getScheme()) : $overridden$$ = $relativeUri$$.hasUserInfo();
  $overridden$$ ? $absoluteUri$$.setUserInfo($relativeUri$$.getUserInfo()) : $overridden$$ = $relativeUri$$.hasDomain();
  $overridden$$ ? $absoluteUri$$.setDomain($relativeUri$$.getDomain()) : $overridden$$ = $relativeUri$$.hasPort();
  var $path$$ = $relativeUri$$.getPath();
  if($overridden$$) {
    $absoluteUri$$.setPort($relativeUri$$.getPort())
  }else {
    if($overridden$$ = $relativeUri$$.hasPath()) {
      if("/" != $path$$.charAt(0)) {
        if(this.hasDomain() && !this.hasPath()) {
          $path$$ = "/" + $path$$
        }else {
          var $lastSlashIndex$$ = $absoluteUri$$.getPath().lastIndexOf("/");
          -1 != $lastSlashIndex$$ && ($path$$ = $absoluteUri$$.getPath().substr(0, $lastSlashIndex$$ + 1) + $path$$)
        }
      }
      $path$$ = goog.Uri.removeDotSegments($path$$)
    }
  }
  $overridden$$ ? $absoluteUri$$.setPath($path$$) : $overridden$$ = $relativeUri$$.hasQuery();
  $overridden$$ ? $absoluteUri$$.setQueryData($relativeUri$$.getDecodedQuery()) : $overridden$$ = $relativeUri$$.hasFragment();
  $overridden$$ && $absoluteUri$$.setFragment($relativeUri$$.getFragment());
  return $absoluteUri$$
};
goog.Uri.prototype.clone = function $goog$Uri$$clone$() {
  return new goog.Uri(this)
};
goog.Uri.prototype.getScheme = function $goog$Uri$$getScheme$() {
  return this.scheme_
};
goog.Uri.prototype.setScheme = function $goog$Uri$$setScheme$($newScheme$$, $opt_decode$$) {
  this.enforceReadOnly();
  if(this.scheme_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newScheme$$) : $newScheme$$) {
    this.scheme_ = this.scheme_.replace(/:$/, "")
  }
  return this
};
goog.Uri.prototype.hasScheme = function $goog$Uri$$hasScheme$() {
  return!!this.scheme_
};
goog.Uri.prototype.getUserInfo = function $goog$Uri$$getUserInfo$() {
  return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function $goog$Uri$$setUserInfo$($newUserInfo$$, $opt_decode$$) {
  this.enforceReadOnly();
  this.userInfo_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newUserInfo$$) : $newUserInfo$$;
  return this
};
goog.Uri.prototype.hasUserInfo = function $goog$Uri$$hasUserInfo$() {
  return!!this.userInfo_
};
goog.Uri.prototype.getDomain = function $goog$Uri$$getDomain$() {
  return this.domain_
};
goog.Uri.prototype.setDomain = function $goog$Uri$$setDomain$($newDomain$$, $opt_decode$$) {
  this.enforceReadOnly();
  this.domain_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newDomain$$) : $newDomain$$;
  return this
};
goog.Uri.prototype.hasDomain = function $goog$Uri$$hasDomain$() {
  return!!this.domain_
};
goog.Uri.prototype.getPort = function $goog$Uri$$getPort$() {
  return this.port_
};
goog.Uri.prototype.setPort = function $goog$Uri$$setPort$($newPort$$) {
  this.enforceReadOnly();
  if($newPort$$) {
    $newPort$$ = Number($newPort$$);
    if(isNaN($newPort$$) || 0 > $newPort$$) {
      throw Error("Bad port number " + $newPort$$);
    }
    this.port_ = $newPort$$
  }else {
    this.port_ = null
  }
  return this
};
goog.Uri.prototype.hasPort = function $goog$Uri$$hasPort$() {
  return null != this.port_
};
goog.Uri.prototype.getPath = function $goog$Uri$$getPath$() {
  return this.path_
};
goog.Uri.prototype.setPath = function $goog$Uri$$setPath$($newPath$$, $opt_decode$$) {
  this.enforceReadOnly();
  this.path_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newPath$$) : $newPath$$;
  return this
};
goog.Uri.prototype.hasPath = function $goog$Uri$$hasPath$() {
  return!!this.path_
};
goog.Uri.prototype.hasQuery = function $goog$Uri$$hasQuery$() {
  return"" !== this.queryData_.toString()
};
goog.Uri.prototype.setQueryData = function $goog$Uri$$setQueryData$($queryData$$, $opt_decode$$) {
  this.enforceReadOnly();
  $queryData$$ instanceof goog.Uri.QueryData ? (this.queryData_ = $queryData$$, this.queryData_.setIgnoreCase(this.ignoreCase_)) : ($opt_decode$$ || ($queryData$$ = goog.Uri.encodeSpecialChars_($queryData$$, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData($queryData$$, null, this.ignoreCase_));
  return this
};
goog.Uri.prototype.setQuery = function $goog$Uri$$setQuery$($newQuery$$, $opt_decode$$) {
  return this.setQueryData($newQuery$$, $opt_decode$$)
};
goog.Uri.prototype.getEncodedQuery = function $goog$Uri$$getEncodedQuery$() {
  return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function $goog$Uri$$getDecodedQuery$() {
  return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function $goog$Uri$$getQueryData$() {
  return this.queryData_
};
goog.Uri.prototype.getQuery = function $goog$Uri$$getQuery$() {
  return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function $goog$Uri$$setParameterValue$($key$$, $value$$) {
  this.enforceReadOnly();
  this.queryData_.set($key$$, $value$$);
  return this
};
goog.Uri.prototype.setParameterValues = function $goog$Uri$$setParameterValues$($key$$, $values$$) {
  this.enforceReadOnly();
  goog.isArray($values$$) || ($values$$ = [String($values$$)]);
  this.queryData_.setValues($key$$, $values$$);
  return this
};
goog.Uri.prototype.getParameterValues = function $goog$Uri$$getParameterValues$($name$$) {
  return this.queryData_.getValues($name$$)
};
goog.Uri.prototype.getParameterValue = function $goog$Uri$$getParameterValue$($paramName$$) {
  return this.queryData_.get($paramName$$)
};
goog.Uri.prototype.getFragment = function $goog$Uri$$getFragment$() {
  return this.fragment_
};
goog.Uri.prototype.setFragment = function $goog$Uri$$setFragment$($newFragment$$, $opt_decode$$) {
  this.enforceReadOnly();
  this.fragment_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newFragment$$) : $newFragment$$;
  return this
};
goog.Uri.prototype.hasFragment = function $goog$Uri$$hasFragment$() {
  return!!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function $goog$Uri$$hasSameDomainAs$($uri2$$) {
  return(!this.hasDomain() && !$uri2$$.hasDomain() || this.getDomain() == $uri2$$.getDomain()) && (!this.hasPort() && !$uri2$$.hasPort() || this.getPort() == $uri2$$.getPort())
};
goog.Uri.prototype.makeUnique = function $goog$Uri$$makeUnique$() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this
};
goog.Uri.prototype.removeParameter = function $goog$Uri$$removeParameter$($key$$) {
  this.enforceReadOnly();
  this.queryData_.remove($key$$);
  return this
};
goog.Uri.prototype.setReadOnly = function $goog$Uri$$setReadOnly$($isReadOnly$$) {
  this.isReadOnly_ = $isReadOnly$$;
  return this
};
goog.Uri.prototype.isReadOnly = function $goog$Uri$$isReadOnly$() {
  return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function $goog$Uri$$enforceReadOnly$() {
  if(this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function $goog$Uri$$setIgnoreCase$($ignoreCase$$) {
  this.ignoreCase_ = $ignoreCase$$;
  this.queryData_ && this.queryData_.setIgnoreCase($ignoreCase$$);
  return this
};
goog.Uri.prototype.getIgnoreCase = function $goog$Uri$$getIgnoreCase$() {
  return this.ignoreCase_
};
goog.Uri.parse = function $goog$Uri$parse$($uri$$, $opt_ignoreCase$$) {
  return $uri$$ instanceof goog.Uri ? $uri$$.clone() : new goog.Uri($uri$$, $opt_ignoreCase$$)
};
goog.Uri.create = function $goog$Uri$create$($opt_scheme$$, $opt_userInfo$$, $opt_domain$$, $opt_port$$, $opt_path$$, $opt_query$$, $opt_fragment$$, $opt_ignoreCase$$2_uri$$) {
  $opt_ignoreCase$$2_uri$$ = new goog.Uri(null, $opt_ignoreCase$$2_uri$$);
  $opt_scheme$$ && $opt_ignoreCase$$2_uri$$.setScheme($opt_scheme$$);
  $opt_userInfo$$ && $opt_ignoreCase$$2_uri$$.setUserInfo($opt_userInfo$$);
  $opt_domain$$ && $opt_ignoreCase$$2_uri$$.setDomain($opt_domain$$);
  $opt_port$$ && $opt_ignoreCase$$2_uri$$.setPort($opt_port$$);
  $opt_path$$ && $opt_ignoreCase$$2_uri$$.setPath($opt_path$$);
  $opt_query$$ && $opt_ignoreCase$$2_uri$$.setQueryData($opt_query$$);
  $opt_fragment$$ && $opt_ignoreCase$$2_uri$$.setFragment($opt_fragment$$);
  return $opt_ignoreCase$$2_uri$$
};
goog.Uri.resolve = function $goog$Uri$resolve$($base$$, $rel$$) {
  $base$$ instanceof goog.Uri || ($base$$ = goog.Uri.parse($base$$));
  $rel$$ instanceof goog.Uri || ($rel$$ = goog.Uri.parse($rel$$));
  return $base$$.resolve($rel$$)
};
goog.Uri.removeDotSegments = function $goog$Uri$removeDotSegments$($path$$) {
  if(".." == $path$$ || "." == $path$$) {
    return""
  }
  if(!goog.string.contains($path$$, "./") && !goog.string.contains($path$$, "/.")) {
    return $path$$
  }
  for(var $leadingSlash$$ = goog.string.startsWith($path$$, "/"), $path$$ = $path$$.split("/"), $out$$ = [], $pos$$ = 0;$pos$$ < $path$$.length;) {
    var $segment$$ = $path$$[$pos$$++];
    "." == $segment$$ ? $leadingSlash$$ && $pos$$ == $path$$.length && $out$$.push("") : ".." == $segment$$ ? ((1 < $out$$.length || 1 == $out$$.length && "" != $out$$[0]) && $out$$.pop(), $leadingSlash$$ && $pos$$ == $path$$.length && $out$$.push("")) : ($out$$.push($segment$$), $leadingSlash$$ = !0)
  }
  return $out$$.join("/")
};
goog.Uri.decodeOrEmpty_ = function $goog$Uri$decodeOrEmpty_$($val$$) {
  return $val$$ ? decodeURIComponent($val$$) : ""
};
goog.Uri.encodeSpecialChars_ = function $goog$Uri$encodeSpecialChars_$($unescapedPart$$, $extra$$) {
  return goog.isString($unescapedPart$$) ? encodeURI($unescapedPart$$).replace($extra$$, goog.Uri.encodeChar_) : null
};
goog.Uri.encodeChar_ = function $goog$Uri$encodeChar_$($ch$$10_n$$) {
  $ch$$10_n$$ = $ch$$10_n$$.charCodeAt(0);
  return"%" + ($ch$$10_n$$ >> 4 & 15).toString(16) + ($ch$$10_n$$ & 15).toString(16)
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function $goog$Uri$haveSameDomain$($uri1String$$, $uri2String$$) {
  var $pieces1$$ = goog.uri.utils.split($uri1String$$), $pieces2$$ = goog.uri.utils.split($uri2String$$);
  return $pieces1$$[goog.uri.utils.ComponentIndex.DOMAIN] == $pieces2$$[goog.uri.utils.ComponentIndex.DOMAIN] && $pieces1$$[goog.uri.utils.ComponentIndex.PORT] == $pieces2$$[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function $goog$Uri$QueryData$($opt_query$$, $opt_uri$$, $opt_ignoreCase$$) {
  this.encodedQuery_ = $opt_query$$ || null;
  this.ignoreCase_ = !!$opt_ignoreCase$$
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function $goog$Uri$QueryData$$ensureKeyMapInitialized_$() {
  if(!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
    for(var $pairs$$ = this.encodedQuery_.split("&"), $i$$ = 0;$i$$ < $pairs$$.length;$i$$++) {
      var $indexOfEquals$$ = $pairs$$[$i$$].indexOf("="), $name$$ = null, $value$$ = null;
      0 <= $indexOfEquals$$ ? ($name$$ = $pairs$$[$i$$].substring(0, $indexOfEquals$$), $value$$ = $pairs$$[$i$$].substring($indexOfEquals$$ + 1)) : $name$$ = $pairs$$[$i$$];
      $name$$ = goog.string.urlDecode($name$$);
      $name$$ = this.getKeyName_($name$$);
      this.add($name$$, $value$$ ? goog.string.urlDecode($value$$) : "")
    }
  }
};
goog.Uri.QueryData.createFromMap = function $goog$Uri$QueryData$createFromMap$($map$$37_values$$, $keys$$8_opt_uri$$, $opt_ignoreCase$$4_queryData$$) {
  $keys$$8_opt_uri$$ = goog.structs.getKeys($map$$37_values$$);
  if("undefined" == typeof $keys$$8_opt_uri$$) {
    throw Error("Keys are undefined");
  }
  for(var $opt_ignoreCase$$4_queryData$$ = new goog.Uri.QueryData(null, null, $opt_ignoreCase$$4_queryData$$), $map$$37_values$$ = goog.structs.getValues($map$$37_values$$), $i$$ = 0;$i$$ < $keys$$8_opt_uri$$.length;$i$$++) {
    var $key$$ = $keys$$8_opt_uri$$[$i$$], $value$$ = $map$$37_values$$[$i$$];
    goog.isArray($value$$) ? $opt_ignoreCase$$4_queryData$$.setValues($key$$, $value$$) : $opt_ignoreCase$$4_queryData$$.add($key$$, $value$$)
  }
  return $opt_ignoreCase$$4_queryData$$
};
goog.Uri.QueryData.createFromKeysValues = function $goog$Uri$QueryData$createFromKeysValues$($keys$$, $values$$, $opt_uri$$3_queryData$$, $i$$142_opt_ignoreCase$$) {
  if($keys$$.length != $values$$.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  $opt_uri$$3_queryData$$ = new goog.Uri.QueryData(null, null, $i$$142_opt_ignoreCase$$);
  for($i$$142_opt_ignoreCase$$ = 0;$i$$142_opt_ignoreCase$$ < $keys$$.length;$i$$142_opt_ignoreCase$$++) {
    $opt_uri$$3_queryData$$.add($keys$$[$i$$142_opt_ignoreCase$$], $values$$[$i$$142_opt_ignoreCase$$])
  }
  return $opt_uri$$3_queryData$$
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.prototype.getCount = function $goog$Uri$QueryData$$getCount$() {
  this.ensureKeyMapInitialized_();
  return this.count_
};
goog.Uri.QueryData.prototype.add = function $goog$Uri$QueryData$$add$($key$$, $value$$) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  var $key$$ = this.getKeyName_($key$$), $values$$ = this.keyMap_.get($key$$);
  $values$$ || this.keyMap_.set($key$$, $values$$ = []);
  $values$$.push($value$$);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.remove = function $goog$Uri$QueryData$$remove$($key$$) {
  this.ensureKeyMapInitialized_();
  $key$$ = this.getKeyName_($key$$);
  return this.keyMap_.containsKey($key$$) ? (this.invalidateCache_(), this.count_ -= this.keyMap_.get($key$$).length, this.keyMap_.remove($key$$)) : !1
};
goog.Uri.QueryData.prototype.clear = function $goog$Uri$QueryData$$clear$() {
  this.invalidateCache_();
  this.keyMap_ = null;
  this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function $goog$Uri$QueryData$$isEmpty$() {
  this.ensureKeyMapInitialized_();
  return 0 == this.count_
};
goog.Uri.QueryData.prototype.containsKey = function $goog$Uri$QueryData$$containsKey$($key$$) {
  this.ensureKeyMapInitialized_();
  $key$$ = this.getKeyName_($key$$);
  return this.keyMap_.containsKey($key$$)
};
goog.Uri.QueryData.prototype.containsValue = function $goog$Uri$QueryData$$containsValue$($value$$) {
  var $vals$$ = this.getValues();
  return goog.array.contains($vals$$, $value$$)
};
goog.Uri.QueryData.prototype.getKeys = function $goog$Uri$QueryData$$getKeys$() {
  this.ensureKeyMapInitialized_();
  for(var $vals$$ = this.keyMap_.getValues(), $keys$$ = this.keyMap_.getKeys(), $rv$$ = [], $i$$ = 0;$i$$ < $keys$$.length;$i$$++) {
    for(var $val$$ = $vals$$[$i$$], $j$$ = 0;$j$$ < $val$$.length;$j$$++) {
      $rv$$.push($keys$$[$i$$])
    }
  }
  return $rv$$
};
goog.Uri.QueryData.prototype.getValues = function $goog$Uri$QueryData$$getValues$($opt_key$$1_values$$) {
  this.ensureKeyMapInitialized_();
  var $rv$$ = [];
  if($opt_key$$1_values$$) {
    this.containsKey($opt_key$$1_values$$) && ($rv$$ = goog.array.concat($rv$$, this.keyMap_.get(this.getKeyName_($opt_key$$1_values$$))))
  }else {
    for(var $opt_key$$1_values$$ = this.keyMap_.getValues(), $i$$ = 0;$i$$ < $opt_key$$1_values$$.length;$i$$++) {
      $rv$$ = goog.array.concat($rv$$, $opt_key$$1_values$$[$i$$])
    }
  }
  return $rv$$
};
goog.Uri.QueryData.prototype.set = function $goog$Uri$QueryData$$set$($key$$, $value$$) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  $key$$ = this.getKeyName_($key$$);
  this.containsKey($key$$) && (this.count_ -= this.keyMap_.get($key$$).length);
  this.keyMap_.set($key$$, [$value$$]);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.get = function $goog$Uri$QueryData$$get$($key$$, $opt_default$$) {
  var $values$$ = $key$$ ? this.getValues($key$$) : [];
  return goog.Uri.preserveParameterTypesCompatibilityFlag ? 0 < $values$$.length ? $values$$[0] : $opt_default$$ : 0 < $values$$.length ? String($values$$[0]) : $opt_default$$
};
goog.Uri.QueryData.prototype.setValues = function $goog$Uri$QueryData$$setValues$($key$$, $values$$) {
  this.remove($key$$);
  0 < $values$$.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_($key$$), goog.array.clone($values$$)), this.count_ += $values$$.length)
};
goog.Uri.QueryData.prototype.toString = function $goog$Uri$QueryData$$toString$() {
  if(this.encodedQuery_) {
    return this.encodedQuery_
  }
  if(!this.keyMap_) {
    return""
  }
  for(var $sb$$ = [], $keys$$ = this.keyMap_.getKeys(), $i$$ = 0;$i$$ < $keys$$.length;$i$$++) {
    for(var $key$$106_val$$ = $keys$$[$i$$], $encodedKey$$ = goog.string.urlEncode($key$$106_val$$), $key$$106_val$$ = this.getValues($key$$106_val$$), $j$$ = 0;$j$$ < $key$$106_val$$.length;$j$$++) {
      var $param$$ = $encodedKey$$;
      "" !== $key$$106_val$$[$j$$] && ($param$$ += "=" + goog.string.urlEncode($key$$106_val$$[$j$$]));
      $sb$$.push($param$$)
    }
  }
  return this.encodedQuery_ = $sb$$.join("&")
};
goog.Uri.QueryData.prototype.toDecodedString = function $goog$Uri$QueryData$$toDecodedString$() {
  return goog.Uri.decodeOrEmpty_(this.toString())
};
goog.Uri.QueryData.prototype.invalidateCache_ = function $goog$Uri$QueryData$$invalidateCache_$() {
  this.encodedQuery_ = null
};
goog.Uri.QueryData.prototype.filterKeys = function $goog$Uri$QueryData$$filterKeys$($keys$$) {
  this.ensureKeyMapInitialized_();
  goog.structs.forEach(this.keyMap_, function($value$$, $key$$) {
    goog.array.contains($keys$$, $key$$) || this.remove($key$$)
  }, this);
  return this
};
goog.Uri.QueryData.prototype.clone = function $goog$Uri$QueryData$$clone$() {
  var $rv$$ = new goog.Uri.QueryData;
  $rv$$.encodedQuery_ = this.encodedQuery_;
  this.keyMap_ && ($rv$$.keyMap_ = this.keyMap_.clone());
  return $rv$$
};
goog.Uri.QueryData.prototype.getKeyName_ = function $goog$Uri$QueryData$$getKeyName_$($arg$$) {
  $arg$$ = String($arg$$);
  this.ignoreCase_ && ($arg$$ = $arg$$.toLowerCase());
  return $arg$$
};
goog.Uri.QueryData.prototype.setIgnoreCase = function $goog$Uri$QueryData$$setIgnoreCase$($ignoreCase$$) {
  $ignoreCase$$ && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), goog.structs.forEach(this.keyMap_, function($value$$, $key$$) {
    var $lowerCase$$ = $key$$.toLowerCase();
    $key$$ != $lowerCase$$ && (this.remove($key$$), this.setValues($lowerCase$$, $value$$))
  }, this));
  this.ignoreCase_ = $ignoreCase$$
};
goog.Uri.QueryData.prototype.extend = function $goog$Uri$QueryData$$extend$($var_args$$) {
  for(var $i$$ = 0;$i$$ < arguments.length;$i$$++) {
    goog.structs.forEach(arguments[$i$$], function($value$$, $key$$) {
      this.add($key$$, $value$$)
    }, this)
  }
};
goog.debug.RelativeTimeProvider = function $goog$debug$RelativeTimeProvider$() {
  this.relativeTimeStart_ = goog.now()
};
goog.debug.RelativeTimeProvider.defaultInstance_ = new goog.debug.RelativeTimeProvider;
goog.debug.RelativeTimeProvider.prototype.set = function $goog$debug$RelativeTimeProvider$$set$($timeStamp$$) {
  this.relativeTimeStart_ = $timeStamp$$
};
goog.debug.RelativeTimeProvider.prototype.reset = function $goog$debug$RelativeTimeProvider$$reset$() {
  this.set(goog.now())
};
goog.debug.RelativeTimeProvider.prototype.get = function $goog$debug$RelativeTimeProvider$$get$() {
  return this.relativeTimeStart_
};
goog.debug.RelativeTimeProvider.getDefaultInstance = function $goog$debug$RelativeTimeProvider$getDefaultInstance$() {
  return goog.debug.RelativeTimeProvider.defaultInstance_
};
goog.debug.Formatter = function $goog$debug$Formatter$($opt_prefix$$) {
  this.prefix_ = $opt_prefix$$ || "";
  this.startTimeProvider_ = goog.debug.RelativeTimeProvider.getDefaultInstance()
};
goog.debug.Formatter.prototype.showAbsoluteTime = !0;
goog.debug.Formatter.prototype.showRelativeTime = !0;
goog.debug.Formatter.prototype.showLoggerName = !0;
goog.debug.Formatter.prototype.showExceptionText = !1;
goog.debug.Formatter.prototype.showSeverityLevel = !1;
goog.debug.Formatter.prototype.setStartTimeProvider = function $goog$debug$Formatter$$setStartTimeProvider$($provider$$) {
  this.startTimeProvider_ = $provider$$
};
goog.debug.Formatter.prototype.getStartTimeProvider = function $goog$debug$Formatter$$getStartTimeProvider$() {
  return this.startTimeProvider_
};
goog.debug.Formatter.prototype.resetRelativeTimeStart = function $goog$debug$Formatter$$resetRelativeTimeStart$() {
  this.startTimeProvider_.reset()
};
goog.debug.Formatter.getDateTimeStamp_ = function $goog$debug$Formatter$getDateTimeStamp_$($logRecord$$4_time$$) {
  $logRecord$$4_time$$ = new Date($logRecord$$4_time$$.getMillis());
  return goog.debug.Formatter.getTwoDigitString_($logRecord$$4_time$$.getFullYear() - 2E3) + goog.debug.Formatter.getTwoDigitString_($logRecord$$4_time$$.getMonth() + 1) + goog.debug.Formatter.getTwoDigitString_($logRecord$$4_time$$.getDate()) + " " + goog.debug.Formatter.getTwoDigitString_($logRecord$$4_time$$.getHours()) + ":" + goog.debug.Formatter.getTwoDigitString_($logRecord$$4_time$$.getMinutes()) + ":" + goog.debug.Formatter.getTwoDigitString_($logRecord$$4_time$$.getSeconds()) + "." + goog.debug.Formatter.getTwoDigitString_(Math.floor($logRecord$$4_time$$.getMilliseconds() / 
  10))
};
goog.debug.Formatter.getTwoDigitString_ = function $goog$debug$Formatter$getTwoDigitString_$($n$$) {
  return 10 > $n$$ ? "0" + $n$$ : String($n$$)
};
goog.debug.Formatter.getRelativeTime_ = function $goog$debug$Formatter$getRelativeTime_$($logRecord$$, $relativeTimeStart$$) {
  var $sec$$ = ($logRecord$$.getMillis() - $relativeTimeStart$$) / 1E3, $str$$ = $sec$$.toFixed(3), $spacesToPrepend$$ = 0;
  if(1 > $sec$$) {
    $spacesToPrepend$$ = 2
  }else {
    for(;100 > $sec$$;) {
      $spacesToPrepend$$++, $sec$$ *= 10
    }
  }
  for(;0 < $spacesToPrepend$$--;) {
    $str$$ = " " + $str$$
  }
  return $str$$
};
goog.debug.HtmlFormatter = function $goog$debug$HtmlFormatter$($opt_prefix$$) {
  goog.debug.Formatter.call(this, $opt_prefix$$)
};
goog.inherits(goog.debug.HtmlFormatter, goog.debug.Formatter);
goog.debug.HtmlFormatter.prototype.showExceptionText = !0;
goog.debug.HtmlFormatter.prototype.formatRecord = function $goog$debug$HtmlFormatter$$formatRecord$($logRecord$$) {
  var $className$$;
  switch($logRecord$$.getLevel().value) {
    case goog.debug.Logger.Level.SHOUT.value:
      $className$$ = "dbg-sh";
      break;
    case goog.debug.Logger.Level.SEVERE.value:
      $className$$ = "dbg-sev";
      break;
    case goog.debug.Logger.Level.WARNING.value:
      $className$$ = "dbg-w";
      break;
    case goog.debug.Logger.Level.INFO.value:
      $className$$ = "dbg-i";
      break;
    default:
      $className$$ = "dbg-f"
  }
  var $sb$$ = [];
  $sb$$.push(this.prefix_, " ");
  this.showAbsoluteTime && $sb$$.push("[", goog.debug.Formatter.getDateTimeStamp_($logRecord$$), "] ");
  this.showRelativeTime && $sb$$.push("[", goog.string.whitespaceEscape(goog.debug.Formatter.getRelativeTime_($logRecord$$, this.startTimeProvider_.get())), "s] ");
  this.showLoggerName && $sb$$.push("[", goog.string.htmlEscape($logRecord$$.getLoggerName()), "] ");
  $sb$$.push('<span class="', $className$$, '">', goog.string.newLineToBr(goog.string.whitespaceEscape(goog.string.htmlEscape($logRecord$$.getMessage()))));
  this.showExceptionText && $logRecord$$.getException() && $sb$$.push("<br>", goog.string.newLineToBr(goog.string.whitespaceEscape($logRecord$$.getExceptionText() || "")));
  $sb$$.push("</span><br>");
  return $sb$$.join("")
};
goog.debug.TextFormatter = function $goog$debug$TextFormatter$($opt_prefix$$) {
  goog.debug.Formatter.call(this, $opt_prefix$$)
};
goog.inherits(goog.debug.TextFormatter, goog.debug.Formatter);
goog.debug.TextFormatter.prototype.formatRecord = function $goog$debug$TextFormatter$$formatRecord$($logRecord$$) {
  var $sb$$ = [];
  $sb$$.push(this.prefix_, " ");
  this.showAbsoluteTime && $sb$$.push("[", goog.debug.Formatter.getDateTimeStamp_($logRecord$$), "] ");
  this.showRelativeTime && $sb$$.push("[", goog.debug.Formatter.getRelativeTime_($logRecord$$, this.startTimeProvider_.get()), "s] ");
  this.showLoggerName && $sb$$.push("[", $logRecord$$.getLoggerName(), "] ");
  this.showSeverityLevel && $sb$$.push("[", $logRecord$$.getLevel().name, "] ");
  $sb$$.push($logRecord$$.getMessage(), "\n");
  this.showExceptionText && $logRecord$$.getException() && $sb$$.push($logRecord$$.getExceptionText(), "\n");
  return $sb$$.join("")
};
goog.debug.Console = function $goog$debug$Console$() {
  this.publishHandler_ = goog.bind(this.addLogRecord, this);
  this.formatter_ = new goog.debug.TextFormatter;
  this.formatter_.showAbsoluteTime = !1;
  this.isCapturing_ = this.formatter_.showExceptionText = !1;
  this.logBuffer_ = "";
  this.filteredLoggers_ = {}
};
goog.debug.Console.prototype.getFormatter = function $goog$debug$Console$$getFormatter$() {
  return this.formatter_
};
goog.debug.Console.prototype.setCapturing = function $goog$debug$Console$$setCapturing$($capturing$$) {
  if($capturing$$ != this.isCapturing_) {
    var $rootLogger$$ = goog.debug.LogManager.getRoot();
    $capturing$$ ? $rootLogger$$.addHandler(this.publishHandler_) : ($rootLogger$$.removeHandler(this.publishHandler_), this.logBuffer = "");
    this.isCapturing_ = $capturing$$
  }
};
goog.debug.Console.prototype.addLogRecord = function $goog$debug$Console$$addLogRecord$($logRecord$$) {
  if(!this.filteredLoggers_[$logRecord$$.getLoggerName()]) {
    var $record$$ = this.formatter_.formatRecord($logRecord$$), $console$$ = goog.debug.Console.console_;
    if($console$$) {
      switch($logRecord$$.getLevel()) {
        case goog.debug.Logger.Level.SHOUT:
          goog.debug.Console.logToConsole_($console$$, "info", $record$$);
          break;
        case goog.debug.Logger.Level.SEVERE:
          goog.debug.Console.logToConsole_($console$$, "error", $record$$);
          break;
        case goog.debug.Logger.Level.WARNING:
          goog.debug.Console.logToConsole_($console$$, "warn", $record$$);
          break;
        default:
          goog.debug.Console.logToConsole_($console$$, "debug", $record$$)
      }
    }else {
      window.opera ? window.opera.postError($record$$) : this.logBuffer_ += $record$$
    }
  }
};
goog.debug.Console.prototype.addFilter = function $goog$debug$Console$$addFilter$($loggerName$$) {
  this.filteredLoggers_[$loggerName$$] = !0
};
goog.debug.Console.prototype.removeFilter = function $goog$debug$Console$$removeFilter$($loggerName$$) {
  delete this.filteredLoggers_[$loggerName$$]
};
goog.debug.Console.instance = null;
goog.debug.Console.console_ = window.console;
goog.debug.Console.autoInstall = function $goog$debug$Console$autoInstall$() {
  goog.debug.Console.instance || (goog.debug.Console.instance = new goog.debug.Console);
  -1 != window.location.href.indexOf("Debug=true") && goog.debug.Console.instance.setCapturing(!0)
};
goog.debug.Console.show = function $goog$debug$Console$show$() {
  alert(goog.debug.Console.instance.logBuffer_)
};
goog.debug.Console.logToConsole_ = function $goog$debug$Console$logToConsole_$($console$$, $fnName$$, $record$$) {
  if($console$$[$fnName$$]) {
    $console$$[$fnName$$]($record$$)
  }else {
    $console$$.log($record$$)
  }
};
/*
 Copyright 2012 Victor Berchet

 VisuGps3

 For the full copyright and license information, please view the LICENSE
 file that was distributed with this source code.

*/
vgps3.Viewer = function $vgps3$Viewer$($mapContainer$$, $chartContainer$$) {
  this.plugins = {track:new vgps3.track.Track, chart:new vgps3.chart.Chart($chartContainer$$), ign:new vgps3.ign.Map, route:new vgps3.route.Route, earth:new vgps3.earth.Earth};
  this.logger_ = goog.debug.Logger.getLogger("vgps3.Viewer");
  this.map = new vgps3.Map($mapContainer$$, {mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN, "ign_terrain"]}}, goog.object.getValues(this.plugins));
  (new goog.debug.Console).setCapturing(!0);
  this.wireEvents_();
  this.parseUrl_(document.location.href)
};
vgps3.Viewer.prototype.wireEvents_ = function $vgps3$Viewer$$wireEvents_$() {
  var $map$$ = this.map, $track$$ = this.plugins.track, $chart$$ = this.plugins.chart, $eventMap$$ = new goog.structs.Map(vgps3.chart.EventType.MOVE, function($e$$) {
    $track$$.moveTo($e$$.position)
  }, vgps3.chart.EventType.CLICK, function($e$$) {
    $track$$.moveTo($e$$.position, !0)
  }, vgps3.chart.EventType.WHEEL, function($e$$) {
    var $gMap$$ = $map$$.getGoogleMap();
    $track$$.moveTo($e$$.position, !0);
    $gMap$$.setZoom($gMap$$.getZoom() - $e$$.direction)
  }, vgps3.chart.EventType.ABOUT, function() {
    $map$$.showAbout()
  }, vgps3.track.EventType.CLICK, function($e$$) {
    $chart$$.moveTo($e$$.position)
  });
  goog.object.forEach($eventMap$$.toObject(), function($handler$$, $event$$) {
    $map$$.addEventListener($event$$, $handler$$)
  })
};
vgps3.Viewer.prototype.parseUrl_ = function $vgps3$Viewer$$parseUrl_$($uri$$46_url$$) {
  var $uri$$46_url$$ = new goog.Uri($uri$$46_url$$), $routeType$$ = $uri$$46_url$$.getParameterValue("flightType"), $turnpoints$$ = $uri$$46_url$$.getParameterValues("turnpoints"), $start$$ = $uri$$46_url$$.getParameterValue("start"), $end$$ = $uri$$46_url$$.getParameterValue("end");
  goog.array.forEach($uri$$46_url$$.getParameterValues("track") || [], function($track$$) {
    this.logger_.info("Loading track: " + $track$$);
    this.plugins.track.load($track$$)
  }, this);
  $routeType$$ && $turnpoints$$ && ($turnpoints$$ = goog.array.map(goog.json.parse($turnpoints$$), this.array2LatLng_), this.plugins.route.draw($routeType$$, $turnpoints$$, $start$$ ? this.array2LatLng_(goog.json.parse($start$$)) : void 0, $end$$ ? this.array2LatLng_(goog.json.parse($end$$)) : void 0))
};
vgps3.Viewer.prototype.array2LatLng_ = function $vgps3$Viewer$$array2LatLng_$($latlng$$) {
  return $latlng$$ && goog.isArray($latlng$$) ? new google.maps.LatLng($latlng$$[0], $latlng$$[1]) : null
};
vgps3.VERSION = "3.0-DEV";
