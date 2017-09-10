"use strict";define(["../chart/line_chart","../util/utils","ng!$q"],function(e,a,r){return{createCube:function(e,r){var t=r.layout,s=a.validateDimension(t.props.dimensions[0]),o=[{qDef:{qFieldDefs:[s]}}],i=t.props.measures.length;r.rowsLabel=["(Intercept)",""!=t.props.measures[1].label?t.props.measures[1].label:a.validateMeasure(t.props.measures[0])];for(var p=a.validateMeasure(t.props.measures[0])+" as mea0, "+a.validateMeasure(t.props.measures[1])+" as mea1",l="mea0 ~ mea1",n="NN",u=2;u<i;u++){var m=a.validateMeasure(t.props.measures[u]);if(m.length>0){var d=","+m+" as mea"+u;p+=d,l+=" + mea"+u,n+="N",r.rowsLabel.push(a.validateMeasure(t.props.measures[u]))}}var y=a.splitData(t.props.splitDataset,t.props.splitPercentage,i),g=[{qDef:{qDef:"R.ScriptEvalExStr('"+n+"','library(jsonlite); "+y+" lm_result <- glm("+l+', data=training_data, family=binomial(link="logit"));\n             res<-toJSON(coef(summary(lm_result)));res;\','+p+")"}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}}];return r.backendApi.applyPatches([{qPath:"/qHyperCubeDef/qDimensions",qOp:"replace",qValue:JSON.stringify(o)},{qPath:"/qHyperCubeDef/qMeasures",qOp:"replace",qValue:JSON.stringify(g)}],!1),r.patchApplied=!0,null},drawChart:function(t){var s=r.defer(),o=t.layout,i=(a.validateDimension(o.props.dimensions[0]),[{qTop:0,qLeft:0,qWidth:6,qHeight:1}]);return t.backendApi.getData(i).then(function(r){t.layout.qHyperCube.qMeasureInfo;if(0===r[0].qMatrix[0][1].qText.length||"-"==r[0].qMatrix[0][1].qText)a.displayConnectionError(t.extId);else{var i=a.getDefaultPaletteColor(),p=JSON.parse(r[0].qMatrix[0][1].qText),l=[],n=[],u=[];$.each(p,function(e,a){l.push(a[0]),n.push(a[1]),u.push(Math.abs(a[0]+a[1])),u.push(Math.abs(a[0]-a[1]))});var m=Math.max.apply(null,u),d=[{x:l,y:t.rowsLabel,name:"Coefficients plot",error_x:{type:"data",symmetric:!1,array:n,arrayminus:n,thickness:o.props.borderWidth,color:o.props.colors?"rgba("+i[3]+",1)":"rgba("+i[o.props.colorForMain]+",1)"},type:"scatter",mode:"markers",marker:{color:o.props.colors?"rgba("+i[3]+",1)":"rgba("+i[o.props.colorForMain]+",1)",size:o.props.pointRadius}}],y={showlegend:t.layout.props.showLegend,xaxis:{showgrid:t.layout.props.xScale,side:t.layout.props.xAxisPosition,range:[1.1*m*-1,1.1*m]},yaxis:{showgrid:t.layout.props.yScale,side:t.layout.props.yAxisPosition,autorange:"reversed",range:[-1,t.rowsLabel.length]},separators:a.getSeparators(t,0),dragmode:"select",margin:{r:"right"==t.layout.props.yAxisPosition?t.layout.props.marginRight+70:t.layout.props.marginRight,l:"left"==t.layout.props.yAxisPosition?t.layout.props.marginLeft+70:t.layout.props.marginLeft,t:"top"==t.layout.props.xAxisPosition?t.layout.props.marginTop+70:t.layout.props.marginTop,b:"bottom"==t.layout.props.xAxisPosition?t.layout.props.marginBottom+70:t.layout.props.marginBottom}};$(".advanced-analytics-toolsets-"+t.extId).html('<div id="aat-chart-'+t.extId+'" style="width:100%;height:100%;"></div>'),e.draw(t,d,"aat-chart-"+t.extId,y)}return s.resolve()}),s.promise}}});
//# sourceMappingURL=../../maps/analysis/logistic_regression_coefplot.js.map