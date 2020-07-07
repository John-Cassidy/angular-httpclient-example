import { Component, OnInit } from '@angular/core';

const DATA = [
  {
    name: 'wood',
    price: '$1.50',
  },
  {
    content: {
      reference: {
        storageTypes: ['magnets', 'wood'],
        id: 12345,
      },
    },
  },
  {
    type: 'house',
    cost: 150000.0,
    materials: [
      {
        id: 'concrete-50',
      },
      {
        id: 'wood',
      },
    ],
  },
];

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  smartsheetDictionary = {};

  createDictionaryOfValues(objectInArray, originalObjectInArray) {
    Object.keys(objectInArray).map((key) => {
      if (typeof objectInArray[key] === 'object') {
        this.createDictionaryOfValues(
          objectInArray[key],
          originalObjectInArray
        );
      } else {
        if (this.smartsheetDictionary[objectInArray[key]] === undefined) {
          this.smartsheetDictionary[objectInArray[key]] = new Array();
        }
        this.smartsheetDictionary[objectInArray[key]].push(
          originalObjectInArray
        );

        // console.log(objectInArray[key], JSON.stringify(originalObjectInArray));
      }
    });
  }

  constructor() {}

  ngOnInit(): void {
    // DATA is the array of objects
    DATA.forEach((objectInArray) => {
      // for each object get all keys
      this.createDictionaryOfValues(objectInArray, objectInArray);
    });

    let results = [];
    let search = 'wood';
    results = this.searchDictionaryForValue(search);

    results.forEach((result) => {
      console.log(search, JSON.stringify(result));
    });
  }
  private searchDictionaryForValue(search: string): any[] {
    return this.smartsheetDictionary[search];
  }
}
