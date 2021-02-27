export class App {
    name: string;
    route: string;
    icon: string;
    permission?: string; //Si tiene permisos se motrara/oculatara dependiendo de los permisos que el usuario tenga asignado
    hideHome?: boolean; //Si es verdadero ocultara el elemento que dirige a raiz, en la lista que aparece en los modulos con hijos (la raiz es la ruta de la aplicación padre)
    isHub?: boolean; //Si es verdadero solo mostrara la aplicación en el HUB cuando tenga al menos un hijo activo, de lo contario se ocultara, si es falso siempre estara presente en el HUB (tomando encuenta los permisos asignados) sin importar si tiene hijos o no activos
    children?: App[]; //Lista de modulos y componentes hijos de la aplicación
  }
  
export const APPS:App [] = [
    { name: "Usuarios", route: "usuarios",  icon: "assets/icons/users.svg",              permission:"nTSk4Y4SFKMyQmRD4ku0UCiNWIDe8OEt" },
    { name: 'Permisos',  route: "permisos",   icon: "assets/icons/security-shield.svg",   permission:"RGMUpFAiRuv7UFoJroHP6CtvmpoFlQXl" },
    { name: 'Roles',     route: "roles",      icon: "assets/icons/users-roles.svg",           permission:"nrPqEhq2TX0mI7qT7glaOCJ7Iqx2QtPs" },

    { name: "Catalogos", route: "catalogos", icon: "assets/icons/catalogos.svg", isHub: true, hideHome: true,
        children: [
            { name: "Responsables", route: "catalogos/responsables", icon: "adjust", permission: "uc5EjMH6WSVn79Wx8BJfAwddC3eMgcRI", },
        ],
    },
    { name: 'Contacto',     route: "contacto",      icon: "assets/icons/users-roles.svg",           permission:"" },
    /*
    { name: "Seguridad", route: "seguridad", icon: "assets/icons/security-shield.svg", 
        children: [
            {name:'Permisos',route:'permisos',icon:'lock', permission:"RGMUpFAiRuv7UFoJroHP6CtvmpoFlQXl"},
            {name:'Roles',route:'roles',icon:'people_alt', permission:"nrPqEhq2TX0mI7qT7glaOCJ7Iqx2QtPs"}
        ] 
    },*/
    //{ name: "Viáticos", route: "configuracion", icon: "assets/icons/travel-expenses.png" },
    //{ name: "Herramientas", route: "herramientas", icon: "assets/icons/toolbox.svg" },    
    //{ name: "Configuración", route: "configuracion", icon: "assets/icons/settings.svg" },
]