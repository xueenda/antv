<!--
index: 0
title: 资源下载
-->

<style>
    .resource-card {
        max-width: 350px;
        width: 40%;
        min-width: 300px;
        height: 130px;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        font-size: 12px;
        color: #777;
        display: inline-block;
        margin: 20px 40px 10px 0;
        vertical-align: middle;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        position: relative;
        overflow: hidden;
    }
    .resource-card:hover {
        box-shadow: 0 3px 8px #d3ddeb;
        border-color: transparent;
    }
    .resource-card img, .resource-card .resource-content {
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .resource-card img {
        width: 50px;
        margin: 0 20px 0 24px;
    }
    .resource-card .resource-content {
        margin-left: 92px;
    }
    .resource-content .title {
        display: block;
        font-size: 16px;
        color: rgba(0,0,0,.65);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 1.2;
        margin-bottom: 6px;
    }
    .resource-content .description {
        display: block;
        color: #999;
        padding-right: 8px;
    }
    @media only screen and (max-width: 480px) {
        .resource-card {
            width: 100%;
        }
    }
</style>

# 资源下载

这里提供 AntV 相关设计资源和设计工具的下载，更多设计资源正在整理和完善中。

<div class="resource-cards">
{% for card in resourceCards %}
    <a href="{{ card.href }}" class="resource-card">
        <img src="{{ card.icon }}" alt="">
        <span class="resource-content">
            <span class="title">{{ card.title }}</span>
            <span class="description">{{ card.description }}</span>
        </span>
    </a>
{% endfor %}
</div>
