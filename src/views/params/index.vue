<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数类表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
           <el-alert
                title="注意：只允许为第三级分类设置相关参数！"
                type="warning"
                show-icon>
            </el-alert>
            <el-form>
                <el-form-item label="活动名称">
                    <el-cascader
                    v-model="options.value"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"></el-cascader>
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
        <el-button>添加参数</el-button>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">静态属性</el-tab-pane>
  </el-tabs>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        }
      ],
      activeName: 'second'
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
