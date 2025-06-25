import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef, } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { environment } from 'environments/environment';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports : [
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    CardTitleComponent,
    MatInputModule,
    MatSelectModule,
    MatOptionModule

  ]
})
export class OrgChartComponent implements OnInit {

    @ViewChild('chartContainer') chartContainer: ElementRef;
    chart: any
    data: any = []
    search: any = ""
    previousModuleId: string = "";
    loaded: boolean = false;
    category: number = 1
    compact: boolean = true;
    inputChange: UntypedFormControl = new UntypedFormControl();
    protected _onDestroy = new Subject<void>();

    constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
      this.inputChange.valueChanges
      .pipe(debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this._onDestroy))
      .subscribe((res) => {

        // Clear previous higlighting
        this.chart.clearHighlighting();

        // Get chart nodes
        const data = this.chart.data();

        // Mark all previously expanded nodes for collapse
        data.forEach((d) => (d._expanded = false));

        data.forEach((d) => {
          if (!GF.IsEmpty(res) && d?.name?.toLowerCase().includes(res.toLowerCase())) {
            // If matches, mark node as highlighted
            d._highlighted = true;
            d._expanded = true;
          }
        });

        // Update data and rerender graph
        this.chart.data(data).render().fit();
      });
    }

    ngAfterViewInit() {
      if (!this.chart) {
        this.chart = new OrgChart();
      }
      // this.updateChart([]);
      this.getEmployeeOrgChart();
    }

    ngDoCheck() {
      if (sessionStorage.getItem("moduleId") !== this.previousModuleId) {
        this.previousModuleId = sessionStorage.getItem("moduleId");
        this.inputChange.setValue("");
        this.loaded = false;
        this.getEmployeeOrgChart();
      }
    }

    filterByCategory() {
      this.loaded = false;
      this.inputChange.setValue("");
      this.getEmployeeOrgChart();
    }

    handleCompact() {
      this.chart.compact(this.compact).render().fit()
    }

    get isHRIS() {
      // this.cdr.detectChanges()
      return sessionStorage.getItem("moduleId") == "78";
    }

    getEmployeeOrgChart() {
      if (this.loaded) { return; }
      this.loaded = true;

      let id = this.category == 0 ? "" : sessionStorage.getItem("u");
      this.userService.getEmployeeOrgChart(id,this.category).subscribe({
        next: (value: any) => {
          if (value.statusCode == 200) {
            this.updateChart(value.payload)
          }
          else {
            console.log(value.stackTrace)
            console.log(value.message)
          }
        },
        error: (e) => {
          console.error(e)
        }
      });
    }

    async updateChart(datas){


      var newData = GF.sort(datas,"id")
      // newData = newData.map(item=>({...item, image: this.imgDisplay(item, img)}))
      newData = await Promise.all(newData.map(async (item) => {
        let ranNo = Math.floor(Math.random() * 5) + 1;
        let gender = item.gender == "M" ? `-male-${ranNo}` : item.gender == "F" ? `-female-${ranNo}` : "";
        var defaultImg = `/images/profile/profile${gender}.png`

        let imgLink = `${environment.huawei}${sessionStorage.getItem("se")}/shared/17/${item.id}/imagePath1-${item.image}`;
        const image = await GF.IsEmpty(item?.image) ? defaultImg : (await GF.isBrokenImage(imgLink)) ? defaultImg : imgLink;;
        return { ...item, image };
      }));

      // console.log(data)
      // console.log(newData)
      this.chart
      .nodeHeight((d) => 95 + 25)
      .nodeWidth((d) => 250 + 2)
      .childrenMargin((d) => 50)
      .compactMarginBetween((d) => 35)
      .compactMarginPair((d) => 30)
      .neighbourMargin((a, b) => 20)
      .nodeContent(function (d, i, arr, state) {
        const com           = GF.IsEqual(d.data.position, ["Company", "Branch", "Department"]);
        const color         = com ? '#3F704D ': '#FFFFFF';
        const textColor     = com ? '#FFFFFF' : '#08011E';
        const posColor      = com ? '#F0F0F0' : '#716E7B';
        const hide          = com ? 'hidden'  : '';
        const show          = com ? ''        : 'hidden';
        const imageDiffVert = 25 + 2;

        var nameLength = d.data.name?.length;
        var maxLength = 10;
        var fontSize = 12;
        var minFontSize = 12;
        var hasError = d.data.errMsg.length > 0 ? "red" : "#E4E2E9";
        if (nameLength > maxLength) {
          fontSize -= (nameLength - maxLength) * 1;
          fontSize = Math.max(fontSize, minFontSize);
        }
        return `
                <div style='width:${d.width}px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
                        <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid ${hasError}">
                            <div ${hide} style="color:${textColor};display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${d.data.code}</div>
                            <div ${hide} style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                            <div ${hide} style="margin-top:${-imageDiffVert - 18}px;">   <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
                            <div ${hide} style="font-size:${fontSize}px;color:${textColor};margin-left:15px;margin-top:10px">  ${d.data.name || 'N/A'} </div>
                            <div ${show} style="font-size:${fontSize}px;color:${textColor};text-align: center;">  ${d.data.name || 'N/A'} </div>
                            <div ${hide} style="color:${posColor};margin-left:15px;margin-top:3px;font-size:8px;"> ${d.data.position || 'N/A'} </div>

                            <div style="color:${textColor};font-size:10px;display:flex;justify-content:space-between;position: absolute;bottom: 0;width: 100%;padding: 5px 10px;">
                              <div > Manages:  ${d.data._directSubordinates} 👤</div>
                              <div > Oversees: ${d.data._totalSubordinates} 👤</div>
                            </div>

                        </div>
                 </div>
                            `;
      })
      .container(this.chartContainer.nativeElement)
      .data(newData)
      .render().fit();
    }

  }
