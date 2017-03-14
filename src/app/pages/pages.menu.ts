export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'admin',
        data: {
          menu: {
            title: 'Administracija',
            icon: 'ion-gear-b',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'korisnici',
            data: {
              menu: {
                title: 'Korisnici',
              }
            }
          },
          {
            path: 'jedinice_mere',
            data: {
              menu: {
                title: 'Jedinice mere',
              }
            }
          },
          {
            path: 'nacin_finansiranja',
            data: {
              menu: {
                title: 'Nacin finansiranja',
              }
            }
          },
          {
            path: 'stepen_dani',
            data: {
              menu: {
                title: 'Stepen dani',
              }
            }
          },
          {
            path: 'godine',
            data: {
              menu: {
                title: 'Godine',
              }
            }
          },
          {
            path: 'opstina',
            data: {
              menu: {
                title: 'Opštine i mesta',
              }
            }
          },
          {
            path: 'grupe',
            data: {
              menu: {
                title: 'Grupe i podgrupe',
              }
            }
          },
          {
            path: 'uloga',
            data: {
              menu: {
                title: 'Uloga',
              }
            }
          },
          {
            path: 'tip_svetiljke',
            data: {
              menu: {
                title: 'Tip svetiljke',
              }
            }
          },
          {
            path: 'tip_stuba',
            data: {
              menu: {
                title: 'Tip stuba',
              }
            }
          },
          {
            path: 'energent_tip',
            data: {
              menu: {
                title: 'Tip energenta',
              }
            }
          },
          {
            path: 'energent',
            data: {
              menu: {
                title: 'Energent',
              }
            }
          },
          {
            path: 'brojilo_tip',
            data: {
              menu: {
                title: 'Tip brojila',
              }
            }
          },
          {
            path: 'brojilo_vrsta',
            data: {
              menu: {
                title: 'Vrsta brojila',
              }
            }
          },
          {
            path: 'rezim_merenja',
            data: {
              menu: {
                title: 'Rezim merenja',
              }
            }
          },
          {
            path: 'tip_racuna',
            data: {
              menu: {
                title: 'Tip racuna',
              }
            }
          },
          {
            path: 'kolona_tip',
            data: {
              menu: {
                title: 'Kolona tip',
              }
            }
          },
          {
            path: 'dobavljac',
            data: {
              menu: {
                title: 'Dobavljaci',
              }
            }
          }
        ]
      },
      {
        path: 'javniobjekti',
        data: {
          menu: {
            title: 'Javni Objekti',
            icon: 'ion-gear-b',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'objekti',
            data: {
              menu: {
                title: 'Objekti',
              }
            }
          },
          {
            path: 'racuni',
            data: {
              menu: {
                title: 'Racuni',
              }
            }
          },
          {
            path: 'racuni2',
            data: {
              menu: {
                title: 'Računi2',
              }
            }
          },
          {
            path: 'objekat',
            data: {
              menu: {
                title: 'Objekat',
              }
            }
          },
          {
            path: 'grafici',
            data: {
              menu: {
                title: 'Grafici',
              }
            }
          },
          {
            path: 'cusum',
            data: {
              menu: {
                title: 'Cusum',
              }
            }
          },
          {
            path: 'rasturanje',
            data: {
              menu: {
                title: 'Rasturanje kWh',
              }
            }
          },
          {
            path: 'energymix',
            data: {
              menu: {
                title: 'Energy Mix',
              }
            }
          },
          {
            path: 'objekat_tab',
            data: {
              menu: {
                title: 'Objekat_tab',
              }
            }
          }

        ]
      },
      {
        path: 'izvestaji',
        data: {
          menu: {
            title: 'Izvestaji',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 10,
          }
        },
        children: [
          {
            path: 'aps_mes_pot',
            data: {
              menu: {
                title: 'Apsolutna mesečna potrošnja',
              }
            }
          }
        ]
      },
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'editors',
        data: {
          menu: {
            title: 'Editors',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'ckeditor',
            data: {
              menu: {
                title: 'CKEditor',
              }
            }
          }
        ]
      },
      //{
      //  path: 'components',
      //  data: {
      //    menu: {
      //      title: 'Components',
      //      icon: 'ion-gear-a',
      //      selected: false,
      //      expanded: false,
      //      order: 250,
      //    }
      //  },
      //  children: [
      //    {
      //      path: 'treeview',
      //      data: {
      //        menu: {
      //          title: 'Tree View',
      //        }
      //      }
      //    }
      //  ]
      //},
      {
        path: 'charts',
        data: {
          menu: {
            title: 'Charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'Chartist.Js',
              }
            }
          }
        ]
      },
      {
        path: 'ui',
        data: {
          menu: {
            title: 'UI Features',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 300,
          }
        },
        children: [
          {
            path: 'typography',
            data: {
              menu: {
                title: 'Typography',
              }
            }
          },
          {
            path: 'buttons',
            data: {
              menu: {
                title: 'Buttons',
              }
            }
          },
          {
            path: 'icons',
            data: {
              menu: {
                title: 'Icons',
              }
            }
          },
          {
            path: 'modals',
            data: {
              menu: {
                title: 'Modals',
              }
            }
          },
          {
            path: 'grid',
            data: {
              menu: {
                title: 'Grid',
              }
            }
          },
        ]
      },
      {
        path: 'forms',
        data: {
          menu: {
            title: 'Form Elements',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        },
        children: [
          {
            path: 'inputs',
            data: {
              menu: {
                title: 'Form Inputs',
              }
            }
          },
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'Form Layouts',
              }
            }
          }
        ]
      },
      {
        path: 'tables',
        data: {
          menu: {
            title: 'Tables',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'basictables',
            data: {
              menu: {
                title: 'Basic Tables',
              }
            }
          },
          {
            path: 'smarttables',
            data: {
              menu: {
                title: 'Smart Tables',
              }
            }
          }
        ]
      },
      {
        path: 'maps',
        data: {
          menu: {
            title: 'Maps',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Google Maps',
              }
            }
          },
          {
            path: 'leafletmaps',
            data: {
              menu: {
                title: 'Leaflet Maps',
              }
            }
          },
          {
            path: 'bubblemaps',
            data: {
              menu: {
                title: 'Bubble Maps',
              }
            }
          },
          {
            path: 'linemaps',
            data: {
              menu: {
                title: 'Line Maps',
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'Login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'Register'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Menu Level 1',
            icon: 'ion-ios-more',
            selected: false,
            expanded: false,
            order: 700,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.1',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.2',
                url: '#'
              }
            },
            children: [
              {
                path: '',
                data: {
                  menu: {
                    title: 'Menu Level 1.2.1',
                    url: '#'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'External Link',
            url: 'http://akveo.com',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];
