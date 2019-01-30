<template>
  <div>
    <div class="order-address cell-container" v-if="!addressInfo || !addressInfo.phone_number">
      <!--<img src="~/assets/create-order/add.png" class="icon-add" @click="chooseAddress" />-->
      <!--<div class="no-address__text" @click="chooseAddress">-->
        <!--<div>-->
          <!--<span class="no-address__text-hi">嘿，我还不知道你的地址！</span>-->
        <!--</div>-->
        <!--<div class="no-address__text-go-wrap">-->
          <!--<span class="no-address__text-go" v-if="shippingAddressList !== 0">请选择配送地址</span>-->
          <!--<span class="no-address__text-go" v-if="shippingAddressList === 0">请增加配送地址</span>-->
        <!--</div>-->
      <!--</div>-->
      <cell v-if="shippingAddressList !== 0">
        <div class="order-address-content choose-address" @click="chooseAddress">
          <img src="~assets/common/loc_icon.png" class="icon-loc" />
          <div class="address__detail">
            <span class="address__loc" style="font-weight: bold;">请选择配送地址</span>
          </div>
        </div>
      </cell>
      <div v-if="shippingAddressList === 0" class="noAddress" @click="chooseAddress">
        <img src="~assets/address/icon_address_add.png" class="icon-loc" />
        <span class="text">新增收货地址</span>
      </div>
    </div>
    <div v-else class="order-address cell-container">
      <cell>
        <div class="order-address-content has-address" @click="chooseAddress">
          <img src="~assets/common/loc_icon.png" class="icon-loc" />
          <div class="address__detail">
            <span class="address__user">{{addressInfo.name}}</span>
            <span class="address__phone">{{hidePhone(addressInfo.phone_number)}}</span><br/>
            <span class="address__loc">{{addressInfo.full_address}}</span>
          </div>
        </div>
      </cell>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cell from './cell.component.vue'
import { requestAna } from "sdk/common/analytics"

export default {
  props: ['addressInfo', 'orderForm', 'shippingAddressList'],
  components: {
    cell
  },
  methods: {
    chooseAddress() {
      this.$store.commit('setForm', this.orderForm)
      requestAna("click_distribute_address", "canteen_order_index")
      let addressInfo = this.addressInfo
      this.$router.push({
        name: 'addressList',
        query: {
          type: 'pick',
          id: (addressInfo && addressInfo.id) ? addressInfo.id : ''
        }
      })
    },
    hidePhone (phone) {
      return phone.slice(0, 3) + '****' + phone.slice(7, 11)
    }
  }
}
</script>

<style scoped>
.order-address-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
 
}
.choose-address{
  height: 50px;
}
.has-address{
 height: 78px;
}

.cell-container {
  padding: 0 15px 0 20px;
  background-color: #fff;
  /* min-height: 78px; */
}

.no-address {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 26px 0 24px 26px;
  background-color: #fff;
}

.icon-add {
  width: 46px;
  height: 46px;
}

.no-address__text {
  margin-left: 24px;
}

.no-address__text-hi {
  font-size: 16px;
  font-weight: 600;
  color: #474245;
}

.no-address__text-go-wrap {
  display: inline-block;
  border-bottom: 1px solid #ff4891; /*no*/
}

.no-address__text-go {
  font-size: 14px;
  color: #ff4891;
}

.address__detail {
  margin-left: 8px;
}

.address__user {
  margin-left: 0px;
  font-weight: bold;
}

.address__phone {
  margin-left: 11px;
}

.icon-loc {
  width: 14px;
}
  /*add*/
  .noAddress{
    height: 44px;
    line-height: 44px;
    background: #FF4891;
    border-radius: 2px;
    padding: 0 15px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.noAddress img{
  /*margin-top: 7px;*/
}
  .noAddress .text{
    font-size: 14px;
    color: #FFFFFF;
    margin-left: 10px;
  }
</style>
