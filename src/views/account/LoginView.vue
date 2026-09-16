<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { ArrowRightOutlined, CheckOutlined, GithubOutlined, LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import BrandMark from '@/components/BrandMark.vue'
import { useSessionStore } from '@/stores/session'
const form=reactive({username:'admin',password:'admin123',remember:true}); const loading=ref(false); const session=useSessionStore(); const route=useRoute(); const router=useRouter()
async function submit(){loading.value=true;try{await session.login(form.username,form.password);message.success('登录成功');router.replace(String(route.query.redirect||'/dashboard'))}catch(error){message.error(error instanceof Error?error.message:'登录失败')}finally{loading.value=false}}
</script>
<template>
  <main class="login">
    <section class="login-story">
      <div>
        <BrandMark inverse /><p class="story-label">
          OPEN SOURCE ADMIN FOUNDATION
        </p><h1>从清晰的基础开始，<br>构建更好的管理产品。</h1><p class="story-copy">
          一套重视边界、类型和开发体验的 Vue 3 后台模板。保留扩展能力，也保持代码容易理解。
        </p><ul><li><CheckOutlined /> 类型安全的路由与权限</li><li><CheckOutlined /> 可替换的 Mock API 层</li><li><CheckOutlined /> 明暗主题与响应式布局</li></ul>
      </div><footer><GithubOutlined /> vue-base-admin <span>·</span> MIT License</footer>
    </section><section class="login-form">
      <div class="form-wrap">
        <div class="mobile-brand">
          <BrandMark />
        </div><span class="eyebrow">Welcome back</span><h2>登录到工作空间</h2><p>选择演示账号，体验不同角色的权限范围。</p><a-form
          layout="vertical"
          :model="form"
          @finish="submit"
        >
          <a-form-item
            label="用户名"
            name="username"
            :rules="[{required:true,message:'请输入用户名'}]"
          >
            <a-input
              v-model:value="form.username"
              size="large"
              autocomplete="username"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item><a-form-item
            label="密码"
            name="password"
            :rules="[{required:true,message:'请输入密码'}]"
          >
            <a-input-password
              v-model:value="form.password"
              size="large"
              autocomplete="current-password"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item><div class="form-meta">
            <a-checkbox v-model:checked="form.remember">
              保持登录
            </a-checkbox><a>忘记密码？</a>
          </div><a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loading"
          >
            登录 <ArrowRightOutlined />
          </a-button>
        </a-form><div class="demo">
          <span>演示账号</span><button
            v-for="role in ['admin','operator','viewer']"
            :key="role"
            @click="form.username=role"
          >
            {{ role }}
          </button><small>统一密码：admin123</small>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.login{min-height:100vh;display:grid;grid-template-columns:minmax(420px,1.1fr) minmax(440px,.9fr);background:var(--app-surface)}.login-story{position:relative;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;padding:48px 7vw 38px;color:#fff;background:#111827}.login-story::before{position:absolute;right:-18%;top:12%;width:520px;height:520px;border:1px solid rgba(129,140,248,.24);border-radius:50%;box-shadow:0 0 0 90px rgba(129,140,248,.035),0 0 0 180px rgba(129,140,248,.02);content:''}.login-story>div,.login-story footer{position:relative}.story-label{margin:18vh 0 18px;color:#818cf8;font-family:var(--app-mono);font-size:11px;letter-spacing:.16em}.login-story h1{margin:0;font-size:clamp(35px,4vw,58px);line-height:1.08;letter-spacing:-.045em}.story-copy{max-width:590px;margin:24px 0;color:#aeb7c8;font-size:16px;line-height:1.8}.login-story ul{display:grid;gap:10px;margin:28px 0;padding:0;list-style:none;color:#d8deea}.login-story li{display:flex;align-items:center;gap:9px}.login-story li :deep(svg){color:#818cf8}.login-story footer{display:flex;gap:9px;align-items:center;color:#8490a5;font-family:var(--app-mono);font-size:11px}.login-form{display:grid;place-items:center;padding:38px}.form-wrap{width:min(100%,410px)}.mobile-brand{display:none}.form-wrap h2{margin:8px 0 6px;font-size:30px;letter-spacing:-.035em}.form-wrap>p{margin:0 0 28px;color:var(--app-muted)}.form-meta{display:flex;justify-content:space-between;margin:-4px 0 20px}.demo{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:26px;padding:14px;border:1px solid var(--app-border);border-radius:10px;background:var(--app-surface-2)}.demo span{width:100%;color:var(--app-muted);font-size:11px;font-weight:650;text-transform:uppercase}.demo button{padding:4px 9px;border:1px solid var(--app-border);border-radius:6px;color:var(--app-text);background:var(--app-surface);cursor:pointer}.demo small{margin-left:auto;color:var(--app-muted)}@media(max-width:860px){.login{display:block}.login-story{display:none}.login-form{min-height:100vh;padding:24px}.mobile-brand{display:block;margin-bottom:72px}}
</style>
