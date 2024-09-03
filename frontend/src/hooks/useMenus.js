/**
 * @Category React Hook function
 * Provide single source to manage application static menus items
 * 
**/


export default function useMenus() {
    
    
    return {
	navbarTopRight: [],
	navbarTopLeft: [],
	navbarSideLeft: [
  {
    "to": "/home",
    "label": "Home",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/vehicule",
    "label": "Vehicule",
    "icon": "pi pi-car",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/carburant",
    "label": "carburant",
    "icon": "pi pi-database",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/panne",
    "label": "Panne",
    "icon": "pi pi-exclamation-triangle",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/reparation",
    "label": "reparation",
    "icon": "pi pi-cog",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/kilometrage",
    "label": "kilometrage",
    "icon": "pi pi-directions",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/services",
    "label": "Services",
    "icon": "pi pi-history",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "",
    "label": "RH",
    "icon": "pi pi-users",
    "iconcolor": "",
    "target": "",
    "items": [
      {
        "to": "/users",
        "label": "Users",
        "icon": "pi pi-user",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/fournisseurs",
        "label": "fournisseurs",
        "icon": "pi pi-truck",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/societe",
        "label": "societe",
        "icon": "pi pi-building",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/departement",
        "label": "departement",
        "icon": "pi pi-briefcase",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/roles",
        "label": "roles",
        "icon": "pi pi-th-large",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/permissions",
        "label": "permissions",
        "icon": "pi pi-th-large",
        "iconcolor": "",
        "target": "",
      }
    ]
  }
],
	type: [    
{value: "Essence ", label: "Essence"},
	{value: "Gasoil", label: "Gasoil"}
    ],
	statut: [    
{value: "Encours", label: "Encours"},
	{value: "Ouvert", label: "Ouvert"},
	{value: "Résolu", label: "Résolu"}
    ],
	priorite: [    
{value: "elevé", label: "Elevé"},
	{value: "moyenne", label: "Moyenne"},
	{value: "basse", label: "Basse"}
    ],
        exportFormats: {
            print: {
                label: 'Print',
                icon: 'pi pi-print',
                type: 'print',
                ext: '',
            },
            pdf: {
                label: 'Pdf',
                icon: 'pi pi-file-pdf',
                type: 'pdf',
                ext: 'pdf',
            },
            excel: {
                label: 'Excel',
                icon: 'pi pi-file-excel',
                type: 'excel',
                ext: 'xlsx',
            },
            csv: {
                label: 'Csv',
                icon: 'pi pi-table',
                type: 'csv',
                ext: 'csv',
            },
        },
    }
}