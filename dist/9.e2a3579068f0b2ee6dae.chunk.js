webpackJsonp([9],{1501:function(module,exports,__webpack_require__){"use strict";var core_1=__webpack_require__(0),Charts=function(){function Charts(){}return Charts.prototype.ngOnInit=function(){},Charts=__decorate([core_1.Component({selector:"maps",styles:[],template:"<router-outlet></router-outlet>"}),__metadata("design:paramtypes",[])],Charts)}();exports.Charts=Charts},1502:function(module,exports,__webpack_require__){"use strict";var core_1=__webpack_require__(0),chartistJs_service_1=__webpack_require__(1503),ChartistJs=function(){function ChartistJs(_chartistJsService){this._chartistJsService=_chartistJsService}return ChartistJs.prototype.ngOnInit=function(){this.data=this._chartistJsService.getAll()},ChartistJs.prototype.getResponsive=function(padding,offset){return this._chartistJsService.getResponsive(padding,offset)},ChartistJs=__decorate([core_1.Component({selector:"chartist-js",encapsulation:core_1.ViewEncapsulation.None,styles:[__webpack_require__(543),__webpack_require__(1677)],template:__webpack_require__(1723)}),__metadata("design:paramtypes",["function"==typeof(_a="undefined"!=typeof chartistJs_service_1.ChartistJsService&&chartistJs_service_1.ChartistJsService)&&_a||Object])],ChartistJs);var _a}();exports.ChartistJs=ChartistJs},1503:function(module,exports,__webpack_require__){"use strict";var core_1=__webpack_require__(0),theme_1=__webpack_require__(68),ChartistJsService=function(){function ChartistJsService(_baConfig){this._baConfig=_baConfig,this._data={simpleLineOptions:{color:this._baConfig.get().colors.defaultText,fullWidth:!0,height:"300px",chartPadding:{right:40}},simpleLineData:{labels:["Mon","Tue","Wed","Thu","Fri"],series:[[20,20,12,45,50],[10,45,30,14,12],[34,12,12,40,50],[10,43,25,22,16],[3,6,30,33,43]]},areaLineData:{labels:[1,2,3,4,5,6,7,8],series:[[5,9,7,8,5,3,5,4]]},areaLineOptions:{fullWidth:!0,height:"300px",low:0,showArea:!0},biLineData:{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],series:[[1,2,3,1,-2,0,1],[-2,-1,-2,-1,-2.5,-1,-2],[0,0,0,1,2,2.5,2],[2.5,2,1,.5,1,.5,-1]]},biLineOptions:{height:"300px",high:3,low:-3,showArea:!0,showLine:!1,showPoint:!1,fullWidth:!0,axisX:{showGrid:!1}},simpleBarData:{labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],series:[[15,24,43,27,5,10,23,44,68,50,26,8],[13,22,49,22,4,6,24,46,57,48,22,4]]},simpleBarOptions:{fullWidth:!0,height:"300px"},multiBarData:{labels:["Quarter 1","Quarter 2","Quarter 3","Quarter 4"],series:[[5,4,3,7],[3,2,9,5],[1,5,8,4],[2,3,4,6],[4,1,2,1]]},multiBarOptions:{fullWidth:!0,height:"300px",stackBars:!0,axisX:{labelInterpolationFnc:function(value){return value.split(/\s+/).map(function(word){return word[0]}).join("")}},axisY:{offset:20}},multiBarResponsive:[["screen and (min-width: 400px)",{reverseData:!0,horizontalBars:!0,axisX:{labelInterpolationFnc:function(n){return n}},axisY:{offset:60}}],["screen and (min-width: 700px)",{stackBars:!1,reverseData:!1,horizontalBars:!1,seriesBarDistance:15}]],stackedBarData:{labels:["Quarter 1","Quarter 2","Quarter 3","Quarter 4"],series:[[8e5,12e5,14e5,13e5],[2e5,4e5,5e5,3e5],[1e5,2e5,4e5,6e5]]},stackedBarOptions:{fullWidth:!0,height:"300px",stackBars:!0,axisY:{labelInterpolationFnc:function(value){return value/1e3+"k"}}},simplePieData:{series:[5,3,4]},simplePieOptions:{fullWidth:!0,height:"300px",weight:"300px",labelInterpolationFnc:function(value){return Math.round(value/12*100)+"%"}},labelsPieData:{labels:["Bananas","Apples","Grapes"],series:[20,15,40]},labelsPieOptions:{fullWidth:!0,height:"300px",weight:"300px",labelDirection:"explode",labelInterpolationFnc:function(value){return value[0]}},simpleDonutData:{labels:["Bananas","Apples","Grapes"],series:[20,15,40]},simpleDonutOptions:{fullWidth:!0,donut:!0,height:"300px",weight:"300px",labelDirection:"explode",labelInterpolationFnc:function(value){return value[0]}}}}return ChartistJsService.prototype.getAll=function(){return this._data},ChartistJsService.prototype.getResponsive=function(padding,offset){return[["screen and (min-width: 1550px)",{chartPadding:padding,labelOffset:offset,labelDirection:"explode",labelInterpolationFnc:function(value){return value}}],["screen and (max-width: 1200px)",{chartPadding:padding,labelOffset:offset,labelDirection:"explode",labelInterpolationFnc:function(value){return value}}],["screen and (max-width: 600px)",{chartPadding:0,labelOffset:0,labelInterpolationFnc:function(value){return value[0]}}]]},ChartistJsService=__decorate([core_1.Injectable(),__metadata("design:paramtypes",["function"==typeof(_a="undefined"!=typeof theme_1.BaThemeConfigProvider&&theme_1.BaThemeConfigProvider)&&_a||Object])],ChartistJsService);var _a}();exports.ChartistJsService=ChartistJsService},1574:function(module,exports,__webpack_require__){"use strict";var router_1=__webpack_require__(57),charts_component_1=__webpack_require__(1501),chartistJs_component_1=__webpack_require__(1502),routes=[{path:"",component:charts_component_1.Charts,children:[{path:"chartist-js",component:chartistJs_component_1.ChartistJs}]}];exports.routing=router_1.RouterModule.forChild(routes)},1677:function(module,exports){module.exports=".ct-area {\n  fill-opacity: .5; }\n\n.ct-label {\n  color: #ffffff;\n  opacity: 0.9;\n  fill: #ffffff; }\n\n.ct-chart .ct-label {\n  font-size: 1em; }\n\n.ct-chart svg {\n  width: 100%;\n  display: block; }\n\n.ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut, .ct-series-a .ct-slice-pie {\n  stroke: #00abff; }\n\n.ct-series-a .ct-slice-pie, .ct-series-a .ct-area {\n  fill: #00abff; }\n\n.ct-series-b .ct-bar, .ct-series-b .ct-line, .ct-series-b .ct-point, .ct-series-b .ct-slice-donut, .ct-series-b .ct-slice-pie {\n  stroke: #8bd22f; }\n\n.ct-series-b .ct-slice-pie, .ct-series-b .ct-area {\n  fill: #8bd22f; }\n\n.ct-series-c .ct-bar, .ct-series-c .ct-line, .ct-series-c .ct-point, .ct-series-c .ct-slice-donut, .ct-series-c .ct-slice-pie {\n  stroke: #f95372; }\n\n.ct-series-c .ct-slice-pie, .ct-series-c .ct-area {\n  fill: #f95372; }\n\n.ct-series-d .ct-bar, .ct-series-d .ct-line, .ct-series-d .ct-point, .ct-series-d .ct-slice-donut, .ct-series-d .ct-slice-pie {\n  stroke: #e7ba08; }\n\n.ct-series-d .ct-slice-pie, .ct-series-d .ct-area {\n  fill: #e7ba08; }\n\n.ct-series-e .ct-bar, .ct-series-e .ct-line, .ct-series-e .ct-point, .ct-series-e .ct-slice-donut, .ct-series-e .ct-slice-pie {\n  stroke: #40daf1; }\n\n.ct-series-e .ct-slice-pie, .ct-series-e .ct-area {\n  fill: #40daf1; }\n\n.stacked-bar .ct-bar {\n  stroke-width: 30px; }\n"},1723:function(module,exports){module.exports='<section class="chartist">\r\n  <div class="row">\r\n    <div class="col-md-6 ">\r\n      <ba-card title="Lines" baCardClass="with-scroll">\r\n        <h5>Simple line chart</h5>\r\n        <ba-chartist-chart baChartistChartClass="ct-chart"\r\n                           baChartistChartType="Line"\r\n                           [baChartistChartData]="data[\'simpleLineData\']"\r\n                           [baChartistChartOptions]="data[\'simpleLineOptions\']">\r\n        </ba-chartist-chart>\r\n\r\n        <h5>Line chart with area</h5>\r\n        <ba-chartist-chart baChartistChartClass="ct-chart"\r\n                           baChartistChartType="Line"\r\n                           [baChartistChartData]="data[\'areaLineData\']"\r\n                           [baChartistChartOptions]="data[\'areaLineOptions\']">\r\n        </ba-chartist-chart>\r\n\r\n        <h5>Bi-polar line chart with area only</h5>\r\n        <ba-chartist-chart baChartistChartClass="ct-chart"\r\n                           baChartistChartType="Line"\r\n                           [baChartistChartData]="data[\'biLineData\']"\r\n                           [baChartistChartOptions]="data[\'biLineOptions\']">\r\n        </ba-chartist-chart>\r\n      </ba-card>\r\n    </div>\r\n\r\n    <div class="col-md-6 ">\r\n      <ba-card title="Bars" baCardClass="with-scroll">\r\n        <h5>Simple bar chart</h5>\r\n        <ba-chartist-chart baChartistChartClass="ct-chart"\r\n                           baChartistChartType="Bar"\r\n                           [baChartistChartData]="data[\'simpleBarData\']"\r\n                           [baChartistChartOptions]="data[\'simpleBarOptions\']">\r\n        </ba-chartist-chart>\r\n\r\n        <h5>Multi-line labels bar chart</h5>\r\n        <ba-chartist-chart baChartistChartClass="ct-chart"\r\n                           baChartistChartType="Bar"\r\n                           [baChartistChartData]="data[\'multiBarData\']"\r\n                           [baChartistChartOptions]="data[\'multiBarOptions\']"\r\n                           [baChartistChartResponsive]="data[\'multiBarResponsive\']">\r\n        </ba-chartist-chart>\r\n\r\n        <h5>Stacked bar chart</h5>\r\n        <ba-chartist-chart baChartistChartClass="ct-chart stacked-bar"\r\n                           baChartistChartType="Bar"\r\n                           [baChartistChartData]="data[\'stackedBarData\']"\r\n                           [baChartistChartOptions]="data[\'stackedBarOptions\']">\r\n        </ba-chartist-chart>\r\n      </ba-card>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="row">\r\n    <div class="col-md-12">\r\n      <ba-card title="Pies & Donuts" baCardClass="with-scroll">\r\n        <div class="row">\r\n          <div class="col-md-12 col-lg-4"><h5>Simple Pie</h5>\r\n            <ba-chartist-chart baChartistChartClass="ct-chart stacked-bar"\r\n                               baChartistChartType="Pie"\r\n                               [baChartistChartData]="data[\'simplePieData\']"\r\n                               [baChartistChartOptions]="data[\'simplePieOptions\']"\r\n                               [baChartistChartResponsive]="getResponsive(20, 80)">\r\n            </ba-chartist-chart>\r\n          </div>\r\n          <div class="col-md-12 col-lg-4"><h5>Pie with labels</h5>\r\n            <ba-chartist-chart baChartistChartClass="ct-chart stacked-bar"\r\n                               baChartistChartType="Pie"\r\n                               [baChartistChartData]="data[\'labelsPieData\']"\r\n                               [baChartistChartOptions]="data[\'labelsPieOptions\']">\r\n            </ba-chartist-chart>\r\n          </div>\r\n          <div class="col-md-12 col-lg-4"><h5>Donut</h5>\r\n            <ba-chartist-chart baChartistChartClass="ct-chart stacked-bar"\r\n                               baChartistChartType="Pie"\r\n                               [baChartistChartData]="data[\'simpleDonutData\']"\r\n                               [baChartistChartOptions]="data[\'simpleDonutOptions\']"\r\n                               [baChartistChartResponsive]="getResponsive(5, 40)">\r\n            </ba-chartist-chart>\r\n          </div>\r\n        </div>\r\n      </ba-card>\r\n    </div>\r\n  </div>\r\n</section>\r\n'},932:function(module,exports,__webpack_require__){"use strict";var core_1=__webpack_require__(0),common_1=__webpack_require__(55),forms_1=__webpack_require__(78),nga_module_1=__webpack_require__(259),charts_routing_1=__webpack_require__(1574),charts_component_1=__webpack_require__(1501),chartistJs_component_1=__webpack_require__(1502),chartistJs_service_1=__webpack_require__(1503),ChartsModule=function(){function ChartsModule(){}return ChartsModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule,forms_1.FormsModule,nga_module_1.NgaModule,charts_routing_1.routing],declarations:[charts_component_1.Charts,chartistJs_component_1.ChartistJs],providers:[chartistJs_service_1.ChartistJsService]}),__metadata("design:paramtypes",[])],ChartsModule)}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=ChartsModule}});