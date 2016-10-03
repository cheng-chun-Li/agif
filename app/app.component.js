"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.chart = [];
        this.option1 = {
            title: { text: '' },
            xAxis: {
                categories: []
            },
            yAxis: {
                scrollbar: {
                    enabled: true
                }
            },
            series: [{
                    name: '',
                    data: [],
                }]
        };
        this.option2 = {
            title: { text: '' },
            xAxis: {
                categories: []
            },
            series: [{
                    data: [],
                }]
        };
        this.option3 = {
            title: { text: '' },
            xAxis: {
                categories: []
            },
            series: [{
                    data: [],
                }]
        };
        this.option4 = {
            title: { text: '' },
            xAxis: {
                categories: []
            },
            series: [{
                    data: [],
                }]
        };
        this.option5 = {
            title: { text: '' },
            xAxis: {
                categories: []
            },
            series: [{
                    data: [],
                }]
        };
    }
    AppComponent.prototype.createNewChart = function (name) {
    };
    AppComponent.prototype.saveChart = function (newChart) {
        this.chart.push(newChart);
    };
    AppComponent.prototype.loadData = function (ch) {
        ch.setSize(0, 0, false);
        //define data
        var STATE_NOT_START = "gray.png";
        var STATE_IN_RUNNING = "orange.png";
        var STATE_FINISH = "green.png";
        var listAct = ["act1", "act2", "act3", "act4", "act5"];
        var listTokenState = [[STATE_FINISH, STATE_FINISH, STATE_FINISH, STATE_FINISH, STATE_FINISH],
            [STATE_FINISH, STATE_FINISH, STATE_FINISH, STATE_FINISH, STATE_FINISH],
            [STATE_FINISH, STATE_FINISH, STATE_FINISH, STATE_FINISH, STATE_FINISH],
            [STATE_FINISH, STATE_FINISH, STATE_IN_RUNNING, STATE_NOT_START, STATE_NOT_START],
            [STATE_IN_RUNNING, STATE_NOT_START, STATE_NOT_START, STATE_NOT_START, STATE_NOT_START]];
        var listRunTime = [[10, 1, 90, 34, 11],
            [7, 3, 111, 29, 10],
            [8, 3, 88, 37, 12],
            [9, 2, 499, 0, 0],
            [2, 0, 0, 0, 0]];
        var listTokName = ['445567s', '33234rt', '111123dsd', '667845db', '000223pd'];
        //create table
        var indexCol = 0;
        while (indexCol < listRunTime[0].length) {
            var indexRow = 0;
            while (indexRow < listRunTime.length) {
                this.chart[indexCol].series[0].addPoint(listRunTime[indexRow][indexCol]);
                indexRow = indexRow + 1;
            }
            this.chart[indexCol].xAxis[0].setCategories(listTokName);
            indexCol = indexCol + 1;
        }
        var index = 0;
        while (index < this.chart.length) {
            this.chart[index].series[0].update({ name: listAct[index] }, false);
            this.chart[index].redraw();
            index = index + 1;
        }
        //create light
        var table = document.createElement("TABLE");
        table.setAttribute("id", "myTable");
        document.body.appendChild(table);
        var tRow = document.createElement("TR");
        tRow.setAttribute("id", "trTitle");
        document.getElementById("myTable").appendChild(tRow);
        var th = document.createElement("TH");
        th.innerHTML = " ";
        document.getElementById("trTitle").appendChild(th);
        var index = 0;
        while (index < listAct.length) {
            var th = document.createElement("TH");
            th.innerHTML = listAct[index];
            document.getElementById("trTitle").appendChild(th);
            index = index + 1;
        }
        var th = document.createElement("TH");
        th.innerHTML = "Total Run Time";
        document.getElementById("trTitle").appendChild(th);
        var indexRow = 0;
        while (indexRow < listTokenState.length) {
            tRow = document.createElement("TR");
            tRow.setAttribute("id", "tRow" + indexRow);
            document.getElementById("myTable").appendChild(tRow);
            var th = document.createElement("TH");
            th.innerHTML = listTokName[indexRow];
            document.getElementById("tRow" + indexRow).appendChild(th);
            indexCol = 0;
            while (indexCol < listTokenState[0].length) {
                var tCol = document.createElement("TD");
                tCol.setAttribute("id", "tCol" + indexRow + "" + indexCol);
                document.getElementById("tRow" + indexRow).appendChild(tCol);
                var img = document.createElement("IMG");
                img.setAttribute("src", listTokenState[indexRow][indexCol]);
                img.setAttribute("width", "50");
                img.setAttribute("width", "50");
                document.getElementById("tCol" + indexRow + "" + indexCol).appendChild(img);
                indexCol = indexCol + 1;
            }
            var tCol = document.createElement("TD");
            document.getElementById("tRow" + indexRow).appendChild(tCol);
            tCol.innerHTML = this.countTotalTime(listRunTime[indexRow]);
            indexRow = indexRow + 1;
        }
    };
    AppComponent.prototype.countTotalTime = function (list) {
        var index = 0;
        var total = 0;
        var isEnd = false;
        while (!isEnd && index < list.length) {
            if (list[index] == 0) {
                isEnd = true;
                total = 0;
            }
            else {
                total = total + list[index];
            }
            index = index + 1;
        }
        return total;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styles: ["\n      chart {\n        display: block;\n        width:550;\n        height: 200;\n      }\n    "],
            template: "\n    \t<table width=\"auto\">\n\t        <tr>\n\t\t        <td><chart [options]=\"option1\" (load)=\"saveChart($event.context)\"></chart> </td>\n\t\t        <td><chart [options]=\"option2\" (load)=\"saveChart($event.context)\"></chart> </td>\n\t\t        <td><chart [options]=\"option3\" (load)=\"saveChart($event.context)\"></chart> </td>\n\t\t        <td><chart [options]=\"option4\" (load)=\"saveChart($event.context)\"></chart> </td>\n\t\t        <td><chart [options]=\"option5\" (load)=\"saveChart($event.context)\"></chart> </td>\n                <td><chart [options]=\"option1\" (load)=\"loadData($event.context)\"></chart> </td>\n\t        </tr>\n        </table>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map