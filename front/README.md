# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

nuxt3 结构目录
nodejs
├── package.json
├── README.md
├── src
│   │   └── constants（全局常量定义）
│   │       ├──common.constants.ts
│   │   └── utils（常用工具类）
│   │       ├──http.util.ts
│   │       └──file.util.ts
│   ├── app.module.ts（模块配置文件）
│   ├── common （通用模块，包含自定义装饰器、过滤器、守卫、拦截器、中间件）
│   │   ├── decorators （项目通用装饰器）
│   │   │   └── roles.decorator.ts
│   │   ├── filters （过滤器）
│   │   │   └── http-exception.filter.ts
│   │   ├── guards （守卫）
│   │   │   └── roles.guard.ts
│   │   ├── interceptors （拦截器）
│   │   │   ├── exception.interceptor.ts
│   │   │   ├── logging.interceptor.ts
│   │   ├── middleware （中间件）
│   │   │   └── logger.middleware.ts
│   │   └── pipes （管道，主要用于数据验证和类型转换）
│   │       ├── parse-int.pipe.ts
│   │       └── validation.pipe.ts
│   ├── config （配置文件信息）
│   │   ├── database.ts
│   │   ├── redis.ts
│   ├── jobs （高并发场景下队列处理）
│   ├── main.ts （入口文件）
│   ├── modules （业务代码，按目录区分模块）
│   │   ├── hello
│   │   │   ├── hello.controller.ts
│   │   │   ├── hello.module.ts
│   │   │   └── hello.service.ts
│   │   └── users
│   │   │   ├── dto （数据传输对象定义）
│   │   │   │   └── users.create.dto.ts
│   │   │   │   └── users.update.dto.ts
│   │       ├── users.controller.ts （控制层）
│   │       ├── users.entity.ts （映射数据库模型对象）
│   │       ├── users.module.ts (模块定义）
│   │       └── users.service.ts （service层）
│   ├── tasks （定时任务）
│   │   ├── tasks.module.ts
│   │   └── tasks.service.ts
│   └── templates （页面模板）
├── test （单元测试）
│   ├── app.e2e-spec.ts
├── tsconfig.json