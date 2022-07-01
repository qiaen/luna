/** https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars */
/** 这里限制性很高，只有路径为/views/文件夹name/*.vue，的文件才能被识别，如果不在这个结构，自己增加吧，然后再合并 */
const modules = import.meta.glob('../views/*/*.vue')
/**  递归方法，写入路由信息 */
export function depthRoute(menus: any, routers: any) {
	menus.forEach((menu: any) => {
		if (menu.child && menu.child.length) {
			depthRoute(menu.child, routers)
		} else {
			routers.push({
				path: menu.path.substring(1),
				name: menu.name,
				// component: () => import(`../views${menu.file}`),
				component: modules[`../views${menu.file}`],
				meta: {
					role: menu.role,
					alive: menu.alive || false,
					title: menu.name,
					icon: menu.icon
				}
			})
		}
	})
	return routers
}